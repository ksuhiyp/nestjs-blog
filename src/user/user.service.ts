import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@app/entities/user.entity';
import { AuthCredentialsDTO, AuthRO } from './user.models';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  findByUsername(username: string): Promise<UserEntity> {
    return this.userRepo.findOne({ where: { username } });
  }

  async register(credentials: AuthCredentialsDTO): Promise<AuthRO> {
    try {
      const user = this.userRepo.create(credentials);
      await user.save();
      const payload = { userId: user.id, username: user.username };
      const token = this.jwtService.sign(payload);
      return {
        user: user.toJSON(),
        token,
      };
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Username has already been taken');
      }
      throw new InternalServerErrorException();
    }
  }

  async login(credentials: AuthCredentialsDTO): Promise<AuthRO> {
    const user = await this.userRepo.findOne({
      where: { username: credentials.username },
    });
    if (user && user.comparePassword(credentials.password)) {
      const payload = { userId: user.id, username: user.username };
      const token = this.jwtService.sign(payload);
      return {
        user: user.toJSON(),
        token,
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
