import { Repository } from 'typeorm';
import { Token } from '@Entity/Token';
import { CustomRepository } from '../typeorm-ex.decorator';

@CustomRepository(Token)
export class TokenRepository extends Repository<Token> {}
