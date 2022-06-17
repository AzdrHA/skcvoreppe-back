import { HttpStatus, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): any {
    // console.log('test');
    /*const bearerToken = (req.header('authorization') ?? '').split(' ')[1];

    if (!bearerToken || bearerToken !== process.env.TOKEN_APP)
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json(new HttpErrorByCode[HttpStatus.UNAUTHORIZED]());*/

    next();
  }
}
