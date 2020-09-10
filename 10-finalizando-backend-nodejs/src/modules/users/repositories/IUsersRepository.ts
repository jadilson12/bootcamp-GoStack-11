import ICreateUserDto from '../dtos/ICreateUserDTO';
import IFindProviderDto from '../dtos/IFindProviderDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUserRepository {
  findAllProviders(execept_user_id?: IFindProviderDto): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(data: ICreateUserDto): Promise<User>;
  save(user: User): Promise<User>;
}
