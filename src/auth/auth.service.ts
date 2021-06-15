import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain } from 'class-transformer';
import { User } from 'src/models';
import { passwordCompare } from 'src/utils/password_hashing';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) { }

  async login(loginAuthDto: LoginAuthDto) {
    try {
      const { email, password } = loginAuthDto;
      const user: User = await this.userRepository.findOne({ email });
      if (!user) throw new NotFoundException('User Not Found, invalid crecentials');
      const passwordMatches = await passwordCompare(password, user.password);
      if (!passwordMatches) {
        console.log(passwordMatches, password)
        throw new UnauthorizedException();
      }
      return {
        access_token: this.jwtService.sign(classToPlain(user))
      }
    } catch (error) {
      throw error;
    }
  }
}
