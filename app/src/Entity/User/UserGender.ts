import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@Entity/User/User';

@Entity('user_gender')
export class UserGender extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ type: 'varchar' })
  public code: string;

  @Column({ type: 'varchar' })
  public description: string;

  @OneToMany(() => User, (user) => user.gender)
  public user: User[];
}
