import { Repository } from 'typeorm';
import { CustomRepository } from '../../typeorm-ex.decorator';
import { Member } from '@Entity/Member/Member';

@CustomRepository(Member)
export class MemberRepository extends Repository<Member> {}
