import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';
import { Pokemon } from '../../src/models/index';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PokemonDocument, PokemonTypes } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(@InjectModel(Pokemon.name) private pokemonModel: Model<PokemonDocument>) { }

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    try {
      const pokemonData = plainToClass(Pokemon, createPokemonDto);
      pokemonData.type = pokemonData.type.filter(type => Object.values(PokemonTypes).some((v) => v === type.toUpperCase()));
      const createdPokemon = new this.pokemonModel(pokemonData);
      return createdPokemon.save();
    } catch (error) {
      throw error;
    }

  }

  async findAll(): Promise<Pokemon[]> {
    try {
      const pokemons: PokemonDocument[] = await this.pokemonModel.find().select({ name: 1 }).exec();
      return pokemons;
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

  async update(id: string, updatePokemonDto: UpdatePokemonDto): Promise<PokemonDocument> {
    try {
      const pokemonExists: PokemonDocument = await this.pokemonModel.findOne({ _id: id }).exec();
      if (!pokemonExists) throw new NotFoundException(`Pokemon with id ${id} was not Found!`);
      return await this.pokemonModel.findOneAndUpdate({ _id: id }, updatePokemonDto, { useFindAndModify: false, new: true });
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string): Promise<any> {
    try {
      const pokemonExists: PokemonDocument = await this.pokemonModel.findOne({ _id: id }).exec();
      if (!pokemonExists) throw new NotFoundException(`Pokemon with id ${id} was not Found!`);
      return await this.pokemonModel.deleteOne({ _id: id });
    } catch (error) { }
  }
}
