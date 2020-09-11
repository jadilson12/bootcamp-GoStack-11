import ICreateUserDto from '@modules/users/dtos/ICreateUserDTO';
import IFindProviderDto from '@modules/users/dtos/IFindProviderDTO';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import { getRepository, Not, Repository } from 'typeorm';
import User from '../entities/User';

export default class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findAllProviders({
    execept_user_id,
  }: IFindProviderDto): Promise<User[]> {
    let users: User[];

    if (execept_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(execept_user_id),
        },
      });
    } else {
      users = await this.ormRepository.find();
    }

    return users;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async create(userData: ICreateUserDto): Promise<User> {
    const appointment = this.ormRepository.create(userData);

    await this.ormRepository.save(appointment);

    return appointment;
  }
  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
