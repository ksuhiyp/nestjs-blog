import { createParamDecorator } from '@nestjs/common';
import { UserEntity } from '@app/entities/user.entity';

export const User = createParamDecorator(
  (_, req): UserEntity => {
    return req.user;
  },
);
