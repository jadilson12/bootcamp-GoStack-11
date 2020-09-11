import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import { uuid } from 'uuidv4';

import UserToken from '../../infra/typeorm/entities/UserToken';

export default class FakeUsersRepository implements IUserTokensRepository {
  private useTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: userToken,
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.useTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.useTokens.find(
      findToken => findToken.token === token,
    );

    return userToken;
  }
}
