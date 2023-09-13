import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import {
  UpdateChallengeDto,
  UpdateChallengeResponseDto,
} from './dto/update-challenge.dto';
import { Repository } from 'typeorm';
import { Challenge } from './entities/challenge.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteChallengeResponseDto } from './dto/delete-challenge.dto';
import { ChallengeStatus } from './entities/challenge-status.entity';
import { UpdateChallengeStatusDto } from './dto/update-challenge-status.dto';
import { Cron } from '@nestjs/schedule';
import { User } from 'src/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChallengeService {
  constructor(
    @InjectRepository(Challenge)
    private readonly challengeRepository: Repository<Challenge>,
    @InjectRepository(ChallengeStatus)
    private readonly challengeStatusRepository: Repository<ChallengeStatus>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  @Cron('0 0 5 * * *')
  async giveChallenges() {
    const users = await this.userRepository.findBy({
      admin: false,
    });

    const count = this.configService.get<number>('CHALLENGE_COUNT');

    const challenges = await this.challengeRepository.find();

    for (const user of users) {
      const challengeToGive = challenges.filter(
        (challenge) =>
          challenge.difficulty === user.difficulty &&
          challenge.tag.every((tag) => user.tag.includes(tag)),
      );

      for (let i = 0; i < count; i++) {
        if (challengeToGive.length === 0) break;

        const random = Math.floor(Math.random() * challengeToGive.length);

        await this.challengeStatusRepository.save({
          user,
          challenge: challengeToGive[random],
        });

        challengeToGive.splice(random, 1);
      }
    }
  }

  public async create(createChallengeDto: CreateChallengeDto) {
    const challenge = this.challengeRepository.create(createChallengeDto);

    return challenge;
  }

  public async findAll(): Promise<Challenge[]> {
    const challenges = await this.challengeRepository.find();

    return challenges;
  }

  public async findOne(id: string): Promise<Challenge> {
    const challenge = await this.challengeRepository.findOneBy({ id });

    if (!challenge)
      throw new HttpException("Challenge doesn't exist", HttpStatus.NOT_FOUND);

    return challenge;
  }

  public async update(
    id: string,
    updateChallengeDto: UpdateChallengeDto,
  ): Promise<UpdateChallengeResponseDto> {
    const challenge = await this.challengeRepository.findOneBy({ id });

    if (!challenge)
      throw new HttpException("Challenge doesn't exist", HttpStatus.NOT_FOUND);

    await this.challengeRepository.update(id, updateChallengeDto);

    return {
      message: 'Challenge updated successfully',
    };
  }

  async remove(id: string): Promise<DeleteChallengeResponseDto> {
    const challenge = await this.challengeRepository.findOneBy({ id });

    if (!challenge)
      throw new HttpException("Challenge doesn't exist", HttpStatus.NOT_FOUND);

    await this.challengeRepository.remove(challenge);

    return {
      message: 'Challenge deleted successfully',
    };
  }

  async updateStatus(
    id: string,
    user: Express.User,
    updateChallengeStatusDto: UpdateChallengeStatusDto,
  ): Promise<UpdateChallengeResponseDto> {
    const challenge = await this.challengeRepository.findOneBy({ id });

    if (!challenge)
      throw new HttpException("Challenge doesn't exist", HttpStatus.NOT_FOUND);

    const challengeStatus = await this.challengeStatusRepository.findOneBy({
      id: updateChallengeStatusDto.id,
      challenge: {
        id: challenge.id,
      },
      user: {
        id: user.id,
      },
    });

    if (!challengeStatus)
      throw new HttpException(
        "Challenge status doesn't exist",
        HttpStatus.NOT_FOUND,
      );

    await this.challengeStatusRepository.update(challengeStatus.id, {
      completed: updateChallengeStatusDto.completed,
    });

    return {
      message: 'Challenge status updated successfully',
    };
  }
}
