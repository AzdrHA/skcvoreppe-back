import { User } from '@Entity/User/User';

export abstract class UtilObject {
  /**
   * @param object
   * @param keys
   */
  public static getNested = <T>(object: T, keys: Array<keyof User>) => {
    const res = {};
    keys.map((key) => {
      return object[key] !== 'undefined'
        ? Object.assign(res, { [key]: object[key] })
        : { [key]: undefined };
    });
    return res;
  };
}
