import _ from 'lodash';

export function wrapMessages<T extends Record<string, string>>(dirname: string, obj: T): T {
  // @ts-ignore
  return _.mapValues(obj, (value, key) => ({
    name: `${dirname.toLowerCase().replace(/\\/g, '/')}__${key}`,
    defaultValue: obj[key],
  }));
}
