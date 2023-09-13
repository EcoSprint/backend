import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto, CreateAdminResponseDto } from './dto/create-admin.dto';
import { DebugGuard } from './guards/debug.guard';
import { ApiTags } from '@nestjs/swagger';
import { Challenge } from 'src/challenge/entities/challenge.entity';
import { User } from 'src/user/entities/user.entity';
import { DeleteAdminResponseDto } from './dto/delete-admin.dto';

@Controller('admin')
@ApiTags('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @UseGuards(DebugGuard)
  async create(
    @Body() createAdminDto: CreateAdminDto,
  ): Promise<CreateAdminResponseDto> {
    return await this.adminService.create(createAdminDto);
  }

  @Delete(':id')
  @UseGuards(DebugGuard)
  async raemove(@Param('id') id: string): Promise<DeleteAdminResponseDto> {
    return await this.adminService.remove(id);
  }
}
