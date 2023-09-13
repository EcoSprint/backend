import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsString } from 'class-validator';
import { Difficulty, Status } from '../entities/user.entity';
import { Tag } from 'src/challenge/entities/challenge.entity';

export class CreateUserDto {
  @ApiProperty({
    example: 'Profile Image URL',
    description: 'Profile Image URL',
  })
  @IsString({
    message: 'profileImage must be string',
  })
  profileImage: string;

  @ApiProperty({
    description: 'Tag of challenge',
  })
  @IsEnum({
    enum: Tag,
    each: true,
  })
  tag?: Tag[];

  @ApiProperty({
    description: 'Difficulty of challenge',
  })
  @IsEnum({
    enum: Difficulty,
  })
  difficulty?: Difficulty;

  @ApiProperty({
    example: Status.NOT_STARTED,
    description: 'Register status',
  })
  @IsEnum({
    enum: Status,
  })
  status?: Status;
}
