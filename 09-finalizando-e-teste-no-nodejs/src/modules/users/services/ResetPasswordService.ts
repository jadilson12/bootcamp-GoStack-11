import { injectable, inject } from 'tsyringe';

import IMailProvicer from '@shared/container/providers/MailProviders/models/IMailProvicer';
import IUserRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
}

@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
  ) {}

  public async exercute({ email }: IRequest): Promise<void> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (!checkUserExists) {
      throw new AppError('User does not exists.');
    }
    // this.mailProvider.sendMail(
    //   email,
    //   'Pedido de recuperação de senha solicitado',
    // );
  }
}
