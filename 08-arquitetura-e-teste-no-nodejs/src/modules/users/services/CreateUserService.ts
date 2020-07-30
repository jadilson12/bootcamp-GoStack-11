import { getRepository } from 'typeorm';
import { injectable, inject } from 'tsyringe';

import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUserRepository from '../infra/http/repositories/IUsersRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
export default class CreateUsersService {
  constructor(
    @inject('UsersRepository')
    private readonly _userRepository: IUserRepository,
  ) {}

  public async exercute({ email, password, name }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await this._userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError(' Email address already in use.');
    }
    const hasedPassword = await hash(password, 8);

    const user = await this._userRepository.create({
      email,
      password: hasedPassword,
      name,
    });

    await usersRepository.save(user);

    return user;
  }
}
