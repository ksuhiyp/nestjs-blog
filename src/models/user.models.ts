import {
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class AuthCredentialsDTO {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}

export class UpdateUserDTO {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  bio: string;
}

export interface UserAuthResponse {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string | null;
}

export interface UserProfileResponse {
  username: string;
  bio: string;
  image: string | null;
  following: boolean;
}