import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsUUID } from 'class-validator';

export class UpdateChallengeStatusDto {
  @ApiProperty({
    example: '5f9d7a3b-9f8c-4a9a-8b0a-5b9b8b0b9b8b',
    description: '챌린지 상태 ID',
  })
  @IsUUID(4, {
    message: 'id must be an UUID',
  })
  id: string;

  @ApiProperty({
    example: true,
    description: '챌린지 상태',
  })
  @IsBoolean({
    message: 'status must be a boolean',
  })
  completed: boolean;
}
