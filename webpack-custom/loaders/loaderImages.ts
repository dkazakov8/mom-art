/**
 * @docs: https://github.com/webpack-contrib/file-loader
 *
 */

import webpack from 'webpack';

export const loaderImages: webpack.RuleSetLoader = {
  loader: 'file-loader',
  options: {
    name: '[contenthash].[ext]',
    outputPath: 'images',
    emitFile: true,
  },
};
