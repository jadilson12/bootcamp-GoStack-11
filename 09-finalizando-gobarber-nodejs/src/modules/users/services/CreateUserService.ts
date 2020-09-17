import { injectable, inject } from 'tsyringe';

import IHashProvider from '../providers/HashProvider/modules/IHashProvider';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

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

    @inject('HashProvider')
    private readonly _hashProvider: IHashProvider,

    @inject('CacheProvider')
    private readonly cacheProvider: ICacheProvider,
  ) {}

  public async exercute({ email, password, name }: Request): Promise<User> {
    const checkUserExists = await this._userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already in use.');
    }

    const hasedPassword = await this._hashProvider.generateHash(password);

    const user = await this._userRepository.create({
      email,
      password: hasedPassword,
      name,
    });

    await this.cacheProvider.invalidatePrefix('provider-list');

    return user;
  }
}
