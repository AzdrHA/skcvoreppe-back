import { User } from '@Entity/User/User';
import { CustomRepository } from '../../typeorm-ex.decorator';
import { DefaultRepository } from '@Repository/DefaultRepository';

@CustomRepository(User)
export class UserRepository extends DefaultRepository<User> {}
