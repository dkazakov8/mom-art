/**
 * @docs: https://github.com/webpack-contrib/file-loader
 *
 */

import webpack from 'webpack';

export const loaderFontsServer: webpack.RuleSetLoader = {
  loader: 'file-loader',
  options: {
    name: '[contenthash].[ext]',
    outputPath: 'fonts',
    emitFile: false,
  },
};
