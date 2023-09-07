import { ConfigService } from '@nestjs/config';

export function isDevelopment() {
  const config = new ConfigService();
  return config.get<string>('NODE_ENV', 'development') === 'development';
}

export function isProduction() {
  const config = new ConfigService();
  return config.get<string>('NODE_ENV', 'development') === 'production';
}
