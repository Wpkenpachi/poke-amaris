import {
  IsString,
  IsNumber,
  IsEnum
} from 'class-validator';

import { PokemonTypes } from '../entities/pokemon.entity';

export class CreatePokemonDto {
  @IsNumber()
  pokemonId: number;

  @IsString()
  name: string;

  @IsEnum(PokemonTypes)
  type: string;
}
