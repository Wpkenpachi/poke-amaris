import * as request from 'supertest';
import { AuthService } from '../src/auth/auth.service';
import { Test } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { User } from '../src/user/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';

import mockedJwtService from './mocks/jwt.service';
import mockedConfigService from './mocks/config.service';
import { INestApplication } from '@nestjs/common';

describe('The AuthenticationService', () => {
  let app: INestApplication;
  let authService: AuthService;
  let userService: UserService;
  let mockedUser: User;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get('SECRET'),
            signOptions: {
              expiresIn: `${configService.get('EXPIRES_IN')}`,
            },
          }),
        }),
      ],
      providers: [
        AuthService,
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {},
        }
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();


    authService = await module.get<AuthService>(AuthService);
    userService = await module.get<UserService>(UserService);
    mockedUser = await userService.create({
      email: 'wpkenpachi@gmail.com',
      nickname: 'wpkenpachi',
      password: 'Wpkenpachi123*'
    });
  })

  describe('Auth Endpoints', () => {
    it(`/POST auth`, () => {
      return request(app.getHttpServer())
        .post('/auth')
        .set({
          email: 'wpkenpachi@gmail.com',
          password: 'Wpkenpachi123*'
        })
        .expect(200);
    });
  })

  afterAll(async () => {
    await app.close();
  });
});