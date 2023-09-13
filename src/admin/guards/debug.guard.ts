import { CanActivate, Injectable } from '@nestjs/common';
import { isDevelopment } from 'src/utils/node-env';

@Injectable()
export class DebugGuard implements CanActivate {
  canActivate() {
    return isDevelopment();
  }
}
