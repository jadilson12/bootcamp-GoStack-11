import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

const sessionRouter = Router();
const sessionControllers = new SessionsController();

sessionRouter.post('/', sessionControllers.create);

export default sessionRouter;
