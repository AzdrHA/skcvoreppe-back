import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('refresh_token')
export class RefreshToken extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar' })
  public refresh_token: string;

  @Column({ type: 'varchar' })
  public email: string;

  @Column({ type: 'datetime' })
  public valid: Date;
}
