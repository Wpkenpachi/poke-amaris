import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  pokemonId: number;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: PokemonTypes
  })
  type: PokemonTypes;

  @Column({
    type: 'date'
  })
  created_at: Date;
}
