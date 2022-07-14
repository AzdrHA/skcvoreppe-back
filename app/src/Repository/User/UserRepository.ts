import { User } from '@Entity/User/User';
import { CustomRepository } from '../../typeorm-ex.decorator';
import { DefaultRepository } from '@Repository/DefaultRepository';

@CustomRepository(User)
export class UserRepository extends DefaultRepository<User> {
  public getUserFromToken = (token: string, type: string) => {
    return this.createQueryBuilder('u')
      .addSelect('tokens')
      .leftJoin('u.tokens', 'tokens')
      .where('tokens.token = :token')
      .where('tokens.type = :type')
      .setParameters({ token, type })
      .getOne();
  };
}
