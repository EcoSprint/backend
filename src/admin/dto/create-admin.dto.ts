import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    example: 'example@gmail.com',
    description: 'Email of admin',
  })
  @IsString({
    message: 'email must be string',
  })
  email: string;
}

export class CreateAdminResponseDto {
  @ApiProperty()
  message: string;
}
