import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUsersService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.use(ensureAuthenticated);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const userService = new CreateUsersService();
  const user = (await userService.exercute({ email, password, name })) as any;

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updatedUserAvatar = new UpdateUserAvatarService();

    const user: any = await updatedUserAvatar.exercute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
