import { Token } from '@Entity/Token';
import { CustomRepository } from '../typeorm-ex.decorator';
import { DefaultRepository } from '@Repository/DefaultRepository';

@CustomRepository(Token)
export class TokenRepository extends DefaultRepository<Token> {
  public validToken = (token: string, type: string) => {
    return this.createQueryBuilder('t')
      .leftJoinAndSelect('t.user', 'user')
      .where('t.token = :token')
      .andWhere('t.type = :type')
      .andWhere('t.expiredAt > :expiredAt')
      .setParameters({ token, type, expiredAt: new Date() })
      .getOne();
  };
}
