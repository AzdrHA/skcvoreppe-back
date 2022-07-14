import { Injectable } from '@nestjs/common';
import { Token, TokenFormat } from '@Entity/Token';
import { User } from '@Entity/User/User';
import * as randtoken from 'rand-token';

@Injectable()
export class TokenService {
  public generateToken = (user: User, type: TokenFormat): Token => {
    const token = new Token();
    token.token = randtoken.suid(60);
    token.requestAt = new Date();
    token.expiredAt = new Date(Date.now() + Token.REQUEST_VALIDATION);
    token.user = user;
    token.type = type;
    return token;
  };
}
