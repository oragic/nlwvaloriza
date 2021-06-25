import { getCustomRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcryptjs';

import UserRepository from '../repositories/UsersRepositories';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

export default class Authentication {
  async execute({ email, password }: IAuthenticateRequest) {
    const userRepositories = getCustomRepository(UserRepository);

    const user = await userRepositories.findOne({ email });

    if (!user) {
      throw new Error('Email/Password incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Email/Password incorrect');
    }
    // refresh token
    const token = sign(
      {
        email: user.email,
      },
      'b17b6b6b62e97fce0eb6117dc5fa67b8',
      {
        subject: user.id,
        expiresIn: '1d',
      },
    );
    return token;
  }
}
