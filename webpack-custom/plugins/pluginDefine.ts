/**
 * @docs: https://webpack.js.org/plugins/define-plugin
 *
 */

import webpack from 'webpack';

import { getDefineParams } from '../utils/getDefineParams';

export const pluginDefine = new webpack.DefinePlugin(getDefineParams({ isClient: true }));
