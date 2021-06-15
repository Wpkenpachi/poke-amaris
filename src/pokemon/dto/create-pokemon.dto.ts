import {
  IsString,
  IsArray
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PokemonTypes } from '../entities/pokemon.entity';
export class CreatePokemonDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsArray()
  type: PokemonTypes[];
}
