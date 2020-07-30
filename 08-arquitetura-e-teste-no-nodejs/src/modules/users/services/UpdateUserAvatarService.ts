import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';

import User from '../infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import IUserRepository from '../infra/http/repositories/IUsersRepository';

interface Request {
  user_id: string;
  avatarFilename: string;
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private readonly _userRepository: IUserRepository,
  ) {}

  public async exercute({ user_id, avatarFilename }: Request): Promise<User> {
    const user = await this._userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar. ', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this._userRepository.save(user);

    return user;
  }
}
