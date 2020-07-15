import { ApiRoute } from '../models/ApiRoute';
import { TypeGalleryItems } from '../models/TypeGalleryItems';

type TypeRequestParams = undefined;

type TypeResponseParams = {
  images: TypeGalleryItems;
};

type TypeApiRoute = ApiRoute & { params?: TypeRequestParams; response?: TypeResponseParams };

export const getImages: TypeApiRoute = {
  name: `getImages`,
  url: `/get_images`,
  method: 'POST',
  isMocked: false,
};
