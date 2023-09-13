import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleGuard } from './guards/google.guard';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { REFRESH_TOKEN_KEY, REFRESH_TOKEN_OPTION } from 'src/utils/cookie';
import { RefreshGuard } from './guards/refresh.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessGuard } from './guards/access.guard';
import { AuthResponseDto } from './dto/auth-response.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('/google')
  @UseGuards(GoogleGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async googleAuth() {}

  @Get('/google/callback')
  @UseGuards(GoogleGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    if (!req.user)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    const refreshToken = await this.authService.generateRefreshToken(req.user);
    const frontendUrl = this.configService.get<string>('FRONTEND_URL');

    if (!frontendUrl)
      throw new Error('FRONTEND_URL environment variable is not defined');

    res.cookie(REFRESH_TOKEN_KEY, refreshToken, REFRESH_TOKEN_OPTION());
    res.redirect(`${frontendUrl}`);
  }

  @Get('/refresh')
  @UseGuards(RefreshGuard)
  async refresh(@Req() req: Request): Promise<AuthResponseDto> {
    if (!req.user)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    return {
      accessToken: await this.authService.generateAccessToken(req.user),
    };
  }

  @Get('/logout')
  @ApiBearerAuth()
  @UseGuards(AccessGuard)
  async logout(@Req() req: Request, @Res() res: Response) {
    if (!req.user) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    const refreshToken = req.cookies[REFRESH_TOKEN_KEY];
    if (!refreshToken)
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);

    await this.authService.removeRefreshToken(req.user);
    res.clearCookie(REFRESH_TOKEN_KEY);
    res.json('ok');
  }
}
