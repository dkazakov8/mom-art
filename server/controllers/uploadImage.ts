import fs from 'fs';
import path from 'path';

import sharp from 'sharp';
import multer from 'multer';
import { isLoggedIn, uploadToCDNBucket } from 'Server/utils';

import { db } from 'Server/db';
import { TypeGalleryItem } from 'models';
import { gallery } from 'const';
import { paths } from 'paths';
import { env } from 'env';

const uploadsFolderName = 'uploads';
const uploadsPath = path.resolve(paths.root, uploadsFolderName);
const uploader = multer({
  dest: uploadsPath,
  limits: {
    // in bytes
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, callback) => {
    if (file.mimetype !== 'image/jpeg') {
      return callback(new Error('Only JPEG files allowed'));
    }

    return callback(null, true);
  },
}).single('file');

function uploadFile({ req, res }) {
  return new Promise((resolve, reject) => {
    uploader(req, res, err => (err ? reject(err) : resolve(null)));
  });
}

const filesConfig = [
  {
    targetWidth: gallery.WIDTH_SMALL,
    targetHeight: null,
    fileSuffix: 'small',
    jpegParams: {
      quality: 80,
      progressive: true,
    },
  },
  {
    targetWidth: null,
    targetHeight: gallery.HEIGHT_BIG,
    fileSuffix: 'big',
    jpegParams: {
      quality: 90,
    },
  },
];

export function uploadImage({ req, res }) {
  return Promise.resolve()
    .then(() => isLoggedIn({ req }))
    .then(() => uploadFile({ req, res }))
    .then(() => {
      const { path: tempFilePath, filename: tempFileName, mimetype } = req.file;

      const uploadedFileData: TypeGalleryItem = {
        id: tempFileName,
        title: {
          ru: req.body.title_ru,
          en: req.body.title_en,
        },
        sources: {
          big: {
            src: '',
            width: 0,
            height: 0,
          },
          small: {
            src: '',
            width: 0,
            height: 0,
          },
        },
      };

      return Promise.all(
        filesConfig.map(({ targetWidth, targetHeight, fileSuffix, jpegParams }) => {
          const fileName = `${tempFileName}-${fileSuffix}.jpeg`;
          const filePath = `${tempFilePath}-${fileSuffix}.jpeg`;

          return sharp(tempFilePath)
            .resize(targetWidth, targetHeight)
            .jpeg(jpegParams)
            .toFile(filePath)
            .then(info => {
              uploadedFileData.sources[fileSuffix] = {
                src: `${env.CDN_ENDPOINT}/${env.CDN_BUCKET_PREFIX}${env.CDN_BUCKET}/${uploadsFolderName}/${fileName}`,
                width: info.width,
                height: info.height,
              };
            })
            .then(() => fs.promises.readFile(filePath))
            .then(fileContent =>
              uploadToCDNBucket({
                Bucket: `${env.CDN_BUCKET_PREFIX}${env.CDN_BUCKET}`,
                fileName: `${uploadsFolderName}/${fileName}`,
                fileContent,
                ContentType: mimetype,
              })
            )
            .then(() => fs.promises.unlink(filePath));
        })
      )
        .then(() => fs.promises.unlink(tempFilePath))
        .then(db.getImages)
        .then(imagesArray => {
          imagesArray.push(uploadedFileData);

          return db.setImages(imagesArray).then(() => ({ images: imagesArray }));
        });
    });
}
