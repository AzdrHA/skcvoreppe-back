import { Injectable } from '@nestjs/common';
import { Token, TokenFormat } from '@Entity/Token';
import { User } from '@Entity/User/User';
import crypto from 'crypto';

@Injectable()
export class TokenService {
  public generateToken = (user: User): Token => {
    const token = new Token();
    token.token = crypto.randomBytes(32).toString('hex');
    token.requestAt = new Date();
    token.expiresAt = new Date(Date.now() + token.REQUEST_VALIDATION);
    token.user = user;
    token.type = TokenFormat.FORGOT_PASSWORD;
    return token;
  };
}
