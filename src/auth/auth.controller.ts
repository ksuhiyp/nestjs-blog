import { Controller, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './auth.models';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  async register(@Body(ValidationPipe) credentials: AuthCredentialsDTO) {
    return this.authService.register(credentials);
  }

  async login(@Body(ValidationPipe) credentials: AuthCredentialsDTO) {
    return this.authService.login(credentials);
  }
}
