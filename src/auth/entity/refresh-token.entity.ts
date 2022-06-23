import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './../../users/entity/users.entity';

@Entity()
export class RefreshToken extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  isRevoked: boolean;

  @Column()
  expiredAt: Date;

  @ManyToOne(() => User, (user) => user.refreshTokens)
  user: User;
}
