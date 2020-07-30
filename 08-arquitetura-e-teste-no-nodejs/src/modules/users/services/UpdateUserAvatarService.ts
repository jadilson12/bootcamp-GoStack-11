import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepository';
import IStoragesProvider from '@shared/container/providers/StorageProviders/models/IStorageProvider';

interface Request {
  user_id: string;
  avatarFilename: string;
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private readonly _userRepository: IUserRepository,

    @inject('IStoragesProvider')
    private readonly _storagesProvider: IStoragesProvider,
  ) {}

  public async exercute({ user_id, avatarFilename }: Request): Promise<User> {
    const user = await this._userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar. ', 401);
    }

    if (user.avatar) {
      await this._storagesProvider.deleteFile(user.avatar);
    }

    const filename = await this._storagesProvider.saveFile(avatarFilename);
    user.avatar = filename;

    await this._userRepository.save(user);

    return user;
  }
}
