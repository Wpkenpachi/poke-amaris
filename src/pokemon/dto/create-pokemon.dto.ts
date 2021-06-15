import {
  IsString,
  IsArray
} from 'class-validator';
export class CreatePokemonDto {
  @IsString()
  name: string;

  @IsArray()
  type: string[];
}
