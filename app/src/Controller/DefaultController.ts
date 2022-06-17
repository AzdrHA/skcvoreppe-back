import { Request } from 'express';
import { ApiException } from '../Exception/ApiException';

export type DefaultControllerContextType = {
  function: string;
  service: any;
  args?: any[];
};

export class DefaultController {
  private res: any;

  public handleRequest(
    request: Request,
    context: DefaultControllerContextType,
  ) {
    try {
      const service = context['service'] ?? null;
      const fn = context['function'] ?? null;
      const fn_args = context['args'] ?? [];

      this.res = service[fn](request, ...fn_args);
    } catch (e) {
      if (e instanceof ApiException) {
        console.log(e);
        this.res = 'rererere';
      } else {
        console.log('e');
      }
    }
    return this.res;
  }
}
