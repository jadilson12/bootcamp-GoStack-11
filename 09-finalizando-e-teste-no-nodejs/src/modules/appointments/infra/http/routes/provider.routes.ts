import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProviderController from '../Controllers/ProviderController';
import ProviderDayAvalabilityController from '../Controllers/ProviderDayAvalabilityController';
import ProviderMonthAvalabilityController from '../Controllers/ProviderMonthAvalabilityController';

const providerRouter = Router();
const appointmentsController = new ProviderController();
const providerDayAvalabilityController = new ProviderDayAvalabilityController();
const providerMonthAvalabilityController = new ProviderMonthAvalabilityController();

providerRouter.use(ensureAuthenticated);

providerRouter.get('/', appointmentsController.index);

providerRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvalabilityController.index,
);
providerRouter.get(
  '/:provider_id/day-availability',
  providerDayAvalabilityController.index,
);

export default providerRouter;
