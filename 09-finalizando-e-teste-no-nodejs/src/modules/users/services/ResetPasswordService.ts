import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IUserRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async exercute({ token, password }: IRequest): Promise<void> {
    const useToken = await this.userTokensRepository.findByToken(token);

    if (!useToken) {
      throw new AppError('USer token does not exists');
    }

    const user = await this.userRepository.findById(useToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    user.password = password;

    await this.userRepository.save(user);
  }
}
