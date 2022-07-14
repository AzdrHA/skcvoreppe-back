import { Token } from '@Entity/Token';
import { CustomRepository } from '../typeorm-ex.decorator';
import { DefaultRepository } from '@Repository/DefaultRepository';

@CustomRepository(Token)
export class TokenRepository extends DefaultRepository<Token> {}
