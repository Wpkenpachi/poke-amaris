import { Controller, Post, Body, Patch, Param, UseGuards, BadRequestException, Headers, Inject, forwardRef, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { JwtService } from '@nestjs/jwt';
import { classToPlain } from 'class-transformer';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService
  ) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      throw new BadRequestException(error?.message || 'User Could Not Be Created!');
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Headers('Authorization') authorization: string) {
    try {
      // Move it to middleware later !!
      const [bearer, token] = authorization.split(' ');
      const authUser = classToPlain(this.jwtService.decode(token));
      if (!authUser || authUser?.id !== id) throw new UnauthorizedException();
      return this.userService.update(id, updateUserDto);
    } catch (error) {
      throw new BadRequestException(error?.message || 'User Could Not Be Updated!');
    }
  }
}
