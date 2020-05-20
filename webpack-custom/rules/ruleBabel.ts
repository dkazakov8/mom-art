import webpack from 'webpack';

import { paths } from '../../paths';
import { loaderBabel } from '../loaders/loaderBabel';
import { loaderTypescript } from '../loaders/loaderTypescript';
import { env } from '../../env';

export const ruleBabel: webpack.Rule = {
  test: /\.(js|tsx?)$/,
  use: [loaderBabel, env.USE_TS_LOADER && loaderTypescript].filter(Boolean),
  exclude: [paths.nodeModulesPath],
};
