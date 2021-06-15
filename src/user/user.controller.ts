import { Controller, Post, Body, Patch, Param, UseGuards, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      throw new BadRequestException(error?.message || 'User Could Not Be Created!');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const idNum = id as unknown as number;
      return this.userService.update(idNum, updateUserDto);
    } catch (error) {
      throw new BadRequestException(error?.message || 'User Could Not Be Updated!');
    }
  }
}
