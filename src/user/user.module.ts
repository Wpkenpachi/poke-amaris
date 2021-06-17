import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../src/models/index';
import { JwtModule } from '@nestjs/jwt';
import { SECRET, EXPIRES_IN } from '../config';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User]), JwtModule.register({
    secret: SECRET,
    signOptions: { expiresIn: EXPIRES_IN },
  })],
  exports: [TypeOrmModule.forFeature([User])]
})
export class UserModule { }
