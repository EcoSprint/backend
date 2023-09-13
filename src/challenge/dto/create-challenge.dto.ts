import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { Difficulty, Tag } from '../entities/challenge.entity';

export class CreateChallengeDto {
  @ApiProperty({
    example: '비용 절감 산책',
    description: '챌린지 제목',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: '집 근처 공원이나 동네를 걸으면서 쓰레기를 주우세요.',
    description: '챌린지 짧은 설명',
  })
  @IsString()
  shortDescription: string;

  @ApiProperty({
    example:
      '집 근처 공원이나 동네를 걸으면서 쓰레기를 주우세요. 비용 절감과 환경 보호가 가능합니다.',
    description: '챌린지 설명',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'Image URL',
    description: '챌린지 썸네일 이미지 URL',
  })
  @IsString()
  thumbnail: string;

  @ApiProperty({
    example: [Tag.Recycle, Tag.EnergySaving],
    description: '챌린지 태그',
    type: 'enum',
    isArray: true,
    enum: Tag,
  })
  @IsEnum(Tag, {
    message: `tag must be one of the following values: ${Object.values(Tag)}`,
  })
  tag: Tag[];

  @ApiProperty({
    example: Difficulty.HARD,
    description: '챌린지 난이도',
    default: Difficulty.EASY,
    type: 'enum',
    enum: Difficulty,
  })
  @IsEnum(Difficulty, {
    message: `difficulty must be one of the following values: ${Object.values(
      Difficulty,
    )}`,
  })
  difficulty: Difficulty;
}
