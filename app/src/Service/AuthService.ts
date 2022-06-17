import { User } from '@Entity/User/User';
import * as bcrypt from 'bcrypt';
import { ApiException } from '../Exception/ApiException';
import { UtilObject } from '../Util/UtilObject';

export class AuthService {
  public async validateUserCredentials(email: string, password: string) {
    const user = await User.findOneBy({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      user.lastLoginAt = new Date();
      await User.save(user);

      return UtilObject.getNested<User>(user, [
        'id',
        'firstname',
        'lastname',
        'email',
        'lastLoginAt',
        'createdAt',
        'updateAt',
      ]);
    }

    throw new ApiException('Coucou');
  }
}
