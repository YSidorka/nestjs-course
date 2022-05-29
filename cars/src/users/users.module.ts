import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserEntity } from './user.entity';
import { AuthService } from '../auth/auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, AuthService, CurrentUserInterceptor]
})
export class UsersModule {}
