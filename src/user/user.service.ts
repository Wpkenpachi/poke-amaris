import { Injectable, NotFoundException, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User } from 'src/models';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { passwordHashing } from '../utils/password_hashing';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const newUser: User = plainToClass(User, createUserDto);
    try {
      newUser.password = await passwordHashing(newUser.password);
      const createdUser = await this.userRepository.save(newUser);
      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const userExists: User = await this.userRepository.findOneOrFail(id);
      if (!userExists) throw new NotFoundException(`User with id ${id} was not found.`);
      // delete updateUserDto.id;
      updateUserDto.password = await passwordHashing(updateUserDto.password);
      const updatedUserData: User = plainToClass(User, updateUserDto);
      await this.userRepository.update(id, updatedUserData);
    } catch (error) {
      throw error;
    }
  }
}
