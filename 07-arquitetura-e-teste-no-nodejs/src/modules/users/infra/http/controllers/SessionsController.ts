import { Request, Response } from 'express';

import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUSer = container.resolve(AuthenticateUserService);

    const { user, token }: any = await authenticateUSer.exercute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  }
}
