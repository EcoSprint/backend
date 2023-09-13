import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessGuard } from 'src/auth/guards/access.guard';
import { Request } from 'express';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  findMe(@Req() req: Request) {
    return this.userService.findMe(req.user);
  }

  @Patch()
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  async update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(req.user.id, updateUserDto);
  }

  @Delete()
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  async remove(@Req() req: Request) {
    return this.userService.remove(req.user.id);
  }
}
