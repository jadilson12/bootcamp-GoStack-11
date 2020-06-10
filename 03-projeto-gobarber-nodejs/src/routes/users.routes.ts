import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUsersService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.use(ensureAuthenticated);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const userService = new CreateUsersService();
    const user = (await userService.exercute({ email, password, name })) as any;

    delete user.password;

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ erroror: error.message });
  }
});

usersRouter.patch('/avatar', ensureAuthenticated, async (request, response) => {
  return response.json({ ok: true });
});

export default usersRouter;
