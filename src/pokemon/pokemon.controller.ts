import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException, UseGuards } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
@Controller('pokemon')
@UseGuards(JwtAuthGuard)
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) { }

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    try {
      return this.pokemonService.create(createPokemonDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Get()
  async findAll() {
    try {
      return this.pokemonService.findAll();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return this.pokemonService.findOne(id);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    try {
      return this.pokemonService.update(id, updatePokemonDto);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.pokemonService.remove(id);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
