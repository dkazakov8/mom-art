/**
 * @docs: https://webpack.js.org/loaders/style-loader
 *
 */

import webpack from 'webpack';

export const loaderSvgInline: webpack.RuleSetRule = {
  loader: 'svg-inline-loader',
};
