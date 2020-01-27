import {
  Controller,
  Body,
  ValidationPipe,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './auth.models';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body(ValidationPipe) credentials: AuthCredentialsDTO) {
    return this.authService.register(credentials);
  }

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body(ValidationPipe) credentials: AuthCredentialsDTO) {
    return this.authService.login(credentials);
  }
}
