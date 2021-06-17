import { Module } from '@nestjs/common';
import { AppController } from '../src/app.controller';

import { AppService } from '../src/app.service';
import { PokemonModule } from '../src/pokemon/pokemon.module';
import { UserModule } from '../src/user/user.module';

import { DatabaseModule } from '../src/modules/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../src/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), PokemonModule, UserModule, DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
