import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@app/entities/user.entity';
import { AuthCredentialsDTO } from './auth.models';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  findByUsername(username: string): Promise<UserEntity> {
    return this.userRepo.findOne({ where: { username } });
  }

  async register(credentials: AuthCredentialsDTO) {
    try {
      await this.userRepo.create(credentials);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Username has already been taken');
      }
      throw new InternalServerErrorException();
    }
  }

  async login(credentials: AuthCredentialsDTO) {
    const user = await this.userRepo.findOne({
      where: { username: credentials.username },
    });
    if (user && user.comparePassword(credentials.password)) {
      const payload = { userId: user.id, username: user.username };
      const token = await this.jwtService.sign(payload);
      return { token };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
