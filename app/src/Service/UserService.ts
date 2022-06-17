import { Injectable } from '@nestjs/common';
import { UtilObject } from '../Util/UtilObject';
import { User } from '@Entity/User/User';

@Injectable()
export class UserService {
  public serializeUser = (user: User): { [key: string]: string } => {
    return UtilObject.getNested<User>(user, [
      'id',
      'firstname',
      'lastname',
      'email',
      'lastLoginAt',
      'createdAt',
      'updateAt',
    ]);
  };
}
