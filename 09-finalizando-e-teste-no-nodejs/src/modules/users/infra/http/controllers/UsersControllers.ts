import { Request, Response } from 'express';

import CreateUsersService from '@modules/users/services/CreateUserService';

import { container } from 'tsyringe';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const userService = container.resolve(CreateUsersService);

    const user = (await userService.exercute({ email, password, name })) as any;

    delete user.password;

    return response.json(user);
  }
}
