import { CustomRepository } from '../../typeorm-ex.decorator';
import { UserGender } from '@Entity/User/UserGender';
import { DefaultRepository } from '@Repository/DefaultRepository';

@CustomRepository(UserGender)
export class UserGenderRepository extends DefaultRepository<UserGender> {}
