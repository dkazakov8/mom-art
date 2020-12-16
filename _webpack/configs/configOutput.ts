/**
 * @docs: https://webpack.js.org/configuration/output
 *
 */

import webpack from 'webpack';

import { env } from '../../env';
import { paths } from '../../paths';

const publicPath = !env.CDN_ENABLED
  ? '/'
  : `${env.CDN_ENDPOINT}/${env.CDN_BUCKET_PREFIX}${env.CDN_BUCKET}/`;

export const configOutput: webpack.Configuration['output'] = {
  path: paths.build,
  filename: env.FILENAME_HASH ? '[name].[contenthash].js' : '[name].js',
  chunkFilename: env.FILENAME_HASH ? '[name].[contenthash].js' : '[name].js',
  publicPath,
};
