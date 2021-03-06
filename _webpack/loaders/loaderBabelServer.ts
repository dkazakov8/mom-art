/**
 * @docs: https://github.com/babel/babel-loader
 *
 */

import webpack from 'webpack';

import babelConfigServer from '../../babel.config';

export const loaderBabelServer: webpack.RuleSetRule = {
  loader: 'babel-loader',
  options: babelConfigServer,
};
