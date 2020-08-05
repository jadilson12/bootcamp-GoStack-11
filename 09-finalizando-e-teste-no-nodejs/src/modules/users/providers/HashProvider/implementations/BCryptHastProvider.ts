import { hash, compare } from 'bcryptjs';
import IHashProvider from '../modules/IHashProvider';

export default class BCryptProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<Boolean> {
    return compare(payload, hashed);
  }
}
