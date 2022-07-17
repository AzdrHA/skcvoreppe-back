export abstract class UtilObject {
  /**
   * @param object
   * @param keys
   */
  public static getNested = <T>(object: T, keys: Array<keyof T>) => {
    const res = {};
    keys.map((key) => {
      return object[key]
        ? Object.assign(res, { [key]: object[key] })
        : { [key]: null };
    });
    return res;
  };
}
