import {
  Controller,
  Body,
  ValidationPipe,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthCredentialsDTO } from './user.models';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async register(@Body(ValidationPipe) credentials: AuthCredentialsDTO) {
    return this.userService.register(credentials);
  }

  @Post('login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body(ValidationPipe) credentials: AuthCredentialsDTO) {
    return this.userService.login(credentials);
  }
}
