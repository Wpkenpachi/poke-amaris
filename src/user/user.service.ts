import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User } from 'src/models';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { passwordHashing } from '../utils/password_hashing';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

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

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await this.userRepository.findOneOrFail(id);
      const updatedUserData: User = plainToClass(User, updateUserDto);
      await this.userRepository.update(id, updatedUserData);
    } catch (error) {
      throw error;
    }
  }
}
