import {
  IsString,
  IsArray
} from 'class-validator';

import { PokemonTypes } from '../entities/pokemon.entity';

export class CreatePokemonDto {
  @IsString()
  name: string;

  @IsArray()
  type: PokemonTypes[];
}
