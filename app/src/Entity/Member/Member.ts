import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { NotifiableEntityInterface } from '../../Type/NotifiableEntityInterface';
import { User } from '@Entity/User/User';
import { UtilDate } from '../../Util/UtilDate';

@Entity('member')
export class Member implements NotifiableEntityInterface {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', default: UtilDate.getCurrentSeason() })
  public season: string = UtilDate.getCurrentSeason();

  @ManyToOne(() => User, (user) => user.members, { nullable: false })
  public user: User;

  public transformObjectToEventData(): { [p: string]: any } {
    return {};
  }
}
