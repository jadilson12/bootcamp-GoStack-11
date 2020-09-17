import IHashProvider from '../modules/IHashProvider';

export default class FakeHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(payload: string, hashed: string): Promise<Boolean> {
    return payload == hashed;
  }
}
