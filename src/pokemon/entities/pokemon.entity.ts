
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum PokemonTypes {
  Normal = 'NORMAL',
  Water = 'WATER',
  Eletric = 'ELETRIC',
  Grass = 'GRASS',
  Ice = 'ICE',
  Fighting = 'FIGHTING',
  Poison = 'POISON',
  Ground = 'GROUND',
  Fire = 'FIRE',
  Psychic = 'PSYCHIC',
  Rock = 'ROCK',
  Bug = 'BUG',
  Ghost = 'GHOST',
  Flying = 'FLYING'
}

export type PokemonDocument = Pokemon & Document;

@Schema()
export class Pokemon {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: true,
  })
  type: PokemonTypes[];

  @Prop({
    required: true,
    default: new Date(),
    type: Date
  })
  created_at: Date;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);