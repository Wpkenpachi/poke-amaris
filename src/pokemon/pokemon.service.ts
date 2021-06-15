import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { Pokemon } from 'src/models';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonDocument, PokemonTypes } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(@InjectModel(Pokemon.name) private pokemonModel: Model<PokemonDocument>) { }

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    try {
      const pokemonData = plainToClass(Pokemon, createPokemonDto);
      pokemonData.type = pokemonData.type.filter(type => Object.values(PokemonTypes).some((v) => v === type));
      const createdPokemon = new this.pokemonModel(pokemonData);
      return createdPokemon.save();
    } catch (error) {
      throw error;
    }

  }

  async findAll(): Promise<Pokemon[]> {
    try {
      return this.pokemonModel.find().exec();
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string): Promise<Pokemon> {
    try {
      return this.pokemonModel.findOne({ _id: id }).exec();
    } catch (error) {
      throw error;
    }
  }

  update(id: string, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: string) {
    return `This action removes a #${id} pokemon`;
  }
}
