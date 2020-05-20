import webpack from 'webpack';

import { paths } from '../../paths';
import { loaderSassTheme } from '../loaders/loaderSassTheme';

export const ruleSassThemes: webpack.Rule = {
  test: /\.s?css$/,
  include: [paths.themesPath],
  use: [loaderSassTheme],
};
