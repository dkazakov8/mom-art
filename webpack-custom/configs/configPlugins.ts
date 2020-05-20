/**
 * @docs: https://webpack.js.org/concepts/plugins
 *
 */

import webpack from 'webpack';

import { env } from '../../env';
import { pluginCopy } from '../plugins/pluginCopy';
import { pluginHtml } from '../plugins/pluginHtml';
import { pluginBanner } from '../plugins/pluginBanner';
import { pluginDefine } from '../plugins/pluginDefine';
import { pluginExtract } from '../plugins/pluginExtract';
import { pluginAnalyzer } from '../plugins/pluginAnalyzer';
import { pluginCDNUploader } from '../plugins/pluginCDNUploader';
import { pluginChangedFiles } from '../plugins/pluginChangedFiles';
import { pluginLodashModule } from '../plugins/pluginLodashModule';
import { pluginCompressionGzip } from '../plugins/pluginCompressionGzip';
import { pluginCompressionBrotli } from '../plugins/pluginCompressionBrotli';
import { pluginCircularDependency } from '../plugins/pluginCircularDependency';

export const configPlugins: webpack.Configuration['plugins'] = [
  pluginCopy,
  pluginHtml,
  pluginBanner,
  pluginDefine,
  pluginExtract,
  pluginLodashModule,
  env.CIRCULAR_CHECK && pluginCircularDependency,
  env.BUNDLE_ANALYZER && pluginAnalyzer,
  env.LOGS_WATCHED_FILES && pluginChangedFiles('[WEBPACK client]'),
  env.GENERATE_COMPRESSED && pluginCompressionGzip,
  env.GENERATE_COMPRESSED && pluginCompressionBrotli,
  env.YANDEX_STORAGE_ENABLED && pluginCDNUploader,
].filter(Boolean);
