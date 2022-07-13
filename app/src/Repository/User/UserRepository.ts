import { Repository } from 'typeorm';
import { User } from '@Entity/User/User';
import { CustomRepository } from '../../typeorm-ex.decorator';

@CustomRepository(User)
export class UserRepository extends Repository<User> {}
