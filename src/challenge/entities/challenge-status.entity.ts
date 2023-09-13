import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Challenge } from './challenge.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class ChallengeStatus {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ nullable: true })
  image?: string;

  @Column({ nullable: true })
  description?: string;

  @ManyToOne(() => Challenge, (challenge) => challenge.challengeStatuses, {
    eager: true,
    onDelete: 'CASCADE',
  })
  challenge: Challenge;

  @ManyToOne(() => User, (user) => user.challengeStatuses)
  user: User;

  @CreateDateColumn()
  CreateAt: Date;

  @UpdateDateColumn()
  UpdateAt: Date;
}
