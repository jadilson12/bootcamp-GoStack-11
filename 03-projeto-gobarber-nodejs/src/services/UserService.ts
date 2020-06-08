import { getRepository } from 'typeorm';

import { hash } from 'bcryptjs';

import User from '../model/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class UsersService {
  public async create({ email, password, name }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new Error(' Email address already in use.');
    }
    const hasedPassword = await hash(password, 8);

    const user = usersRepository.create({
      email,
      password: hasedPassword,
      name,
    });

    await usersRepository.save(user);

    return user;
  }
}
