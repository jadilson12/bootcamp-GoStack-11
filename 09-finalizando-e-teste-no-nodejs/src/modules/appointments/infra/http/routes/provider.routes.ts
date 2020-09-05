import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderController from '../Controllers/ProviderController';

const providerRouter = Router();
const appointmentsController = new ProviderController();

providerRouter.use(ensureAuthenticated);

providerRouter.get('/', appointmentsController.index);

export default providerRouter;
