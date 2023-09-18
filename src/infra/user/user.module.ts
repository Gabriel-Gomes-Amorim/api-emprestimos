import { Module } from '@nestjs/common';
import { UserService } from '../../domain/user/user.service';
import { UserRepository } from './repository';
import { UserController } from './http/user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
