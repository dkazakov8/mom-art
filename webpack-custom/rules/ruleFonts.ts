/**
 * @docs: https://webpack.js.org/loaders/file-loader
 *
 */

import webpack from 'webpack';

import { loaderFonts } from '../loaders/loaderFonts';

export const ruleFonts: webpack.Rule = {
  test: /\.(woff2?|eot|ttf)$/,
  use: [loaderFonts],
};
