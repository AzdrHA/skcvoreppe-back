import { CustomRepository } from '../typeorm-ex.decorator';
import { DefaultRepository } from '@Repository/DefaultRepository';
import { RefreshToken } from '@Entity/RefreshToken';

@CustomRepository(RefreshToken)
export class RefreshTokenRepository extends DefaultRepository<RefreshToken> {}
