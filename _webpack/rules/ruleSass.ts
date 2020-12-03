import webpack from 'webpack';

import { paths } from '../../paths';
import { loaderCss } from '../loaders/loaderCss';
import { loaderPostcss } from '../loaders/loaderPostcss';
import { loaderExtractCss } from '../loaders/loaderExtractCss';

export const ruleSass: webpack.RuleSetRule = {
  test: /\.s?css$/,
  include: [paths.sourcePath],
  exclude: [paths.themesPath],
  use: [loaderExtractCss, loaderCss, loaderPostcss],
};
