import { User as ExtendUser } from 'src/user/entities/user.entity';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface User extends ExtendUser {}
  }
}
