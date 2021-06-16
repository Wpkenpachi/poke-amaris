import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../models/index';
import { MONGO_HOST, MONGO_PORT, MONGO_DATABASE } from '../config';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [__dirname + '/../**/*.entity.ts', User],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule { }
