import { Router } from 'express';
import User from '../model/User';
import UsersService from '../services/UserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const userService = new UsersService();
    const user = await userService.create({ email, password, name });

    delete user.password;

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ erroror: error.message });
  }
});

export default usersRouter;
