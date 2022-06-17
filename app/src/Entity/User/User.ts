import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public firstname: string;

  @Column()
  public lastname: string;

  @Column()
  public password: string;

  @Column()
  public salt: string;

  @Column()
  public email: string;

  @Column()
  public lastLoginAt: Date;

  @Column()
  public createdAt: Date;

  @Column()
  public updateAt: Date;
}
