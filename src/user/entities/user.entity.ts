import { ChallengeStatus } from 'src/challenge/entities/challenge-status.entity';
import { Challenge, Tag } from 'src/challenge/entities/challenge.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum Difficulty {
  EASY,
  MEDIUM,
  HARD,
}

export enum Status {
  NOT_STARTED,
  IN_PROGRESS,
  COMPLETED,
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @PrimaryColumn()
  email: string;

  @Column()
  username: string;

  @Column({ type: 'enum', nullable: true, enum: Tag, array: true })
  tag?: Tag[];

  @Column({ type: 'enum', nullable: true, enum: Difficulty })
  difficulty?: Difficulty;

  @Column()
  profileImage: string;

  @Column({ default: false, select: false })
  admin: boolean;

  @Column({ nullable: true, select: false, length: 200 })
  refreshToken?: string;

  @Column({ type: 'enum', default: Status.NOT_STARTED, enum: Status })
  status: Status;

  @OneToMany(() => ChallengeStatus, (challengeStatus) => challengeStatus.user, {
    eager: true,
  })
  challengeStatuses: ChallengeStatus[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
