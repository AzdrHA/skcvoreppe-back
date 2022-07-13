import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Token } from '@Entity/Token';
import { NotifiableEntityInterface } from '../../Type/NotifiableEntityInterface';
import { Member } from '@Entity/Member/Member';
import { UserGender } from '@Entity/User/UserGender';

export enum UserRoles {
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_SYSADMIN = 'ROLE_SYSADMIN',
}

@Entity('user')
export class User implements NotifiableEntityInterface {
  public ADMIN_ROLES: string[] = [
    UserRoles.ROLE_SYSADMIN,
    UserRoles.ROLE_ADMIN,
  ];

  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar' })
  public firstname: string;

  @Column({ type: 'varchar' })
  public lastname: string;

  @Column({ type: 'varchar' })
  public password: string;

  @Column({ type: 'varchar' })
  public salt: string;

  @Column({ type: 'varchar', unique: true })
  public email: string;

  @Column({ type: 'varchar', nullable: true })
  public phone: string | null;

  @Column({ type: 'date' })
  public dateOfBirth: Date;

  @Column({ type: 'varchar', nullable: true })
  public lastLoginAt: Date | null = null;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.ROLE_USER })
  public role?: UserRoles | null = UserRoles.ROLE_USER;

  @CreateDateColumn({ type: 'datetime' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  public updateAt: Date;

  @OneToMany(() => Token, (token) => token.user)
  public tokens: Token[];

  @OneToMany(() => Member, (member) => member.user)
  public members: Member[];

  @ManyToOne(() => UserGender, (gender) => gender.user)
  public gender: UserGender;

  transformObjectToEventData(): { [p: string]: string } {
    return {
      password: this.password,
    };
  }
}
