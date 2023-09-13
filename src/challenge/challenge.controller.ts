import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ChallengeService } from './challenge.service';
import { CreateChallengeDto } from './dto/create-challenge.dto';
import {
  UpdateChallengeDto,
  UpdateChallengeResponseDto,
} from './dto/update-challenge.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from 'src/admin/guards/admin.guard';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { Challenge } from './entities/challenge.entity';
import { DeleteChallengeResponseDto } from './dto/delete-challenge.dto';
import { UpdateChallengeStatusDto } from './dto/update-challenge-status.dto';
import { Request } from 'express';

@Controller('challenge')
@ApiTags('Challenge')
export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  async create(
    @Body() createChallengeDto: CreateChallengeDto,
  ): Promise<Challenge> {
    return await this.challengeService.create(createChallengeDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  async findAll(): Promise<Challenge[]> {
    return await this.challengeService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  async findOne(@Param('id') id: string): Promise<Challenge> {
    return await this.challengeService.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  async update(
    @Param('id') id: string,
    @Body() updateChallengeDto: UpdateChallengeDto,
  ): Promise<UpdateChallengeResponseDto> {
    return await this.challengeService.update(id, updateChallengeDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AdminGuard)
  async remove(@Param('id') id: string): Promise<DeleteChallengeResponseDto> {
    return await this.challengeService.remove(id);
  }

  @Patch(':id/status')
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  @ApiParam({
    name: 'id',
    description: '챌린지 ID',
    type: 'string',
  })
  async updateStatus(
    @Param('id') id: string,
    @Req() req: Request,
    @Body() updateChallengeStatusDto: UpdateChallengeStatusDto,
  ): Promise<UpdateChallengeResponseDto> {
    return await this.challengeService.updateStatus(
      id,
      req.user,
      updateChallengeStatusDto,
    );
  }
}
