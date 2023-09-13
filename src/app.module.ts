import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { ChallengeModule } from './challenge/challenge.module';
import { AdminModule } from './admin/admin.module';
import { CommunityModule } from './community/community.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    ChallengeModule,
    AdminModule,
    CommunityModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
