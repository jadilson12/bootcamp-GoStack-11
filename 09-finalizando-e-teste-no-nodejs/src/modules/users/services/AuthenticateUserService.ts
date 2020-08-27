import { compare } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import User from '../infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/modules/IHashProvider';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private readonly _userRepository: IUserRepository,

    @inject('HashProvider')
    private readonly _hashProvider: IHashProvider,
  ) {}

  public async exercute({ email, password }: Request): Promise<Response> {
    const user = await this._userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordMatch = await this._hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new AppError('Incorrect email/password combination');
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
