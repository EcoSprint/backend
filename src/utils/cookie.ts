import { CookieOptions } from 'express';
import { isProduction } from './node-env';

export const REFRESH_TOKEN_KEY = 'Refresh';

export const REFRESH_TOKEN_OPTION = (): CookieOptions => ({
  httpOnly: isProduction(),
  secure: isProduction(),
  maxAge: 2592000000,
  ...(isProduction() ? { sameSite: 'none' } : {}),
});
