import { env } from '../../env';

import { hotReloadUrl } from './hotReloadUrl';

export function injectCSPProtection(str, res) {
  /**
   * @docs: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy
   *
   */

  const ContentSecurityPolicyRules = {
    'default-src': `'self'`,
    'style-src': `'self' 'unsafe-inline' ${env.CDN_ENDPOINT}`,
    'script-src': `'self' 'unsafe-inline' ${env.CDN_ENDPOINT} https://mc.yandex.ru ${
      env.HOT_RELOAD ? hotReloadUrl : ''
    }`,
    'font-src': `'self' ${env.CDN_ENDPOINT}`,
    'connect-src': `'self' ws: https://sentry.io https://mc.yandex.ru`,
    'img-src': `'self' ${env.CDN_ENDPOINT} https://mc.yandex.ru`,
    'frame-src': `'self'`,
  };

  const CSPJoined = Object.keys(ContentSecurityPolicyRules)
    .reduce((acc, key) => `${acc}${key} ${ContentSecurityPolicyRules[key]}; `, '')
    .trim();

  res.setHeader('Content-Security-Policy', CSPJoined);

  return str;
}
