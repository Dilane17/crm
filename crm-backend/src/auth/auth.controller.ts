import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: RegisterDto) {
    // Le "return" ici est ce qui permet d'avoir autre chose que "1" dans Thunder Client
    return await this.authService.register(userData);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginData: LoginDto) {
    return await this.authService.login(loginData);
  }
}
