import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  login(@Body() createAuthDto: LoginAuthDto) {
    try {
      return this.authService.login(createAuthDto);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
