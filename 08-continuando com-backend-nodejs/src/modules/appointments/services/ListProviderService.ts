import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequestDTO {
  user_id: string;
}

@injectable()
export default class ListProviderService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async exercute({ user_id }: IRequestDTO): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      execept_user_id: user_id,
    });

    return users;
  }
}
