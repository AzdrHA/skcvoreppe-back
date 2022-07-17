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
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Order } from '@Entity/Order/Order';

export enum UserRoles {
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_SYSADMIN = 'ROLE_SYSADMIN',
}

@Entity('user')
export class User implements NotifiableEntityInterface {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar' })
  @IsString({ groups: ['register'] })
  @IsNotEmpty({ groups: ['register'] })
  public firstName: string;

  @Column({ type: 'varchar' })
  @IsString({ groups: ['register'] })
  @IsNotEmpty({ groups: ['register'] })
  public lastName: string;

  @IsString({ groups: ['login'] })
  @IsNotEmpty({ groups: ['login'] })
  @Column({ type: 'varchar' })
  public password: string;

  @Column({ type: 'varchar' })
  public salt: string;

  @IsString({ groups: ['forgotPassword', 'login', 'register'] })
  @IsNotEmpty({ groups: ['forgotPassword', 'login', 'register'] })
  @IsEmail({ groups: ['forgotPassword', 'login', 'register'] })
  @Column({ type: 'varchar', unique: true })
  public email: string;

  @Column({ type: 'varchar', nullable: true })
  @IsString({ groups: ['register'] })
  @IsNotEmpty({ groups: ['register'] })
  public phone: string | null;

  @IsString({ groups: ['register'] })
  @IsNotEmpty({ groups: ['register'] })
  @Column({ type: 'varchar', nullable: true })
  public extern_id?: string | undefined;

  @Column({ type: 'boolean', default: false })
  public enabled = false;

  @Column({ type: 'date' })
  @IsString({ groups: ['register'] })
  @IsNotEmpty({ groups: ['register'] })
  public dateOfBirth: Date;

  @Column({ type: 'varchar', nullable: true })
  public lastLoginAt: Date | null;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.ROLE_USER })
  public role?: UserRoles | null;

  @CreateDateColumn({ type: 'datetime' })
  public createdAt: Date;

  @UpdateDateColumn({ type: 'datetime' })
  public updateAt: Date;

  @OneToMany(() => Token, (token) => token.user, { nullable: true })
  public tokens: Token[];

  @OneToMany(() => Member, (member) => member.user)
  public members: Member[];

  @ManyToOne(() => UserGender, (gender) => gender.user, { nullable: true })
  public gender?: UserGender;

  @OneToMany(() => Order, (order) => order.owner)
  public orders: Order[];

  transformObjectToEventData(): { [p: string]: string } {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      fullName: this.email,
      email: this.email,
    };
  }

  public displayName = () => {
    return this.lastName + ' ' + this.firstName;
  };
}
