import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { UserEntity } from '@app/entities/user.entity';

export class AuthCredentialsDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  // @Matches(
  //   // https://gist.github.com/ravibharathii/3975295
  //   /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  //   {
  //     message: 'password too weak',
  //   },
  // )
  password: string;
}

export class UpdateUserDTO {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  bio: string;
}

export interface AuthRO {
  user: Partial<UserEntity>;
  token: string;
}
