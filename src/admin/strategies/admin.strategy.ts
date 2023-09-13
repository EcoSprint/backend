import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable } from '@nestjs/common';
import { config as envConfig } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../../auth/auth.service';
import { User } from 'src/user/entities/user.entity';

envConfig();

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, 'admin') {
  constructor(
    public readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('ACCESS_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, data: User) {
    const user = await this.authService.findUserById(data.id);

    if (user.admin) throw new HttpException('Unauthorized', 401);

    return user;
  }
}
