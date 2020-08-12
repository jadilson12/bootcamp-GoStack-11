import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import { uuid } from 'uuidv4';

import UserToken from '../../infra/typeorm/entities/UserToken';

export default class FakeUsersRepository implements IUserTokensRepository {
  private useTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const useToken = new UserToken();

    Object.assign(useToken, {
      id: uuid(),
      token: useToken,
      user_id,
    });

    this.useTokens.push(useToken);

    return useToken;
  }
}
