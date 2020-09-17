import { Request, Response } from 'express';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

import { container } from 'tsyringe';

export default class ProviderMonthAvalabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    const listProvider = container.resolve(
      ListProviderMonthAvailabilityService,
    );

    const providers = await listProvider.exercute({
      provider_id,
      month,
      year,
    });

    return response.json(providers);
  }
}
