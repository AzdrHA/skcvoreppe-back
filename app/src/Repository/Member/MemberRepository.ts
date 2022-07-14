import { CustomRepository } from '../../typeorm-ex.decorator';
import { Member } from '@Entity/Member/Member';
import { DefaultRepository } from '../DefaultRepository';

@CustomRepository(Member)
export class MemberRepository extends DefaultRepository<Member> {}
