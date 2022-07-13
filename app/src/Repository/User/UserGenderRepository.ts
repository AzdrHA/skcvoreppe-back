import { Repository } from 'typeorm';
import { CustomRepository } from '../../typeorm-ex.decorator';
import { UserGender } from '@Entity/User/UserGender';

@CustomRepository(UserGender)
export class UserGenderRepository extends Repository<UserGender> {}
