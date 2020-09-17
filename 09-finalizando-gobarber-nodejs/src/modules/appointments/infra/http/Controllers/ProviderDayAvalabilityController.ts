import { Request, Response } from 'express';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilyService';

import { container } from 'tsyringe';

export default class ProviderDayAvalabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year, day } = request.query;

    const listProvider = container.resolve(ListProviderDayAvailabilityService);

    const providers = await listProvider.exercute({
      provider_id,
      month: Number(month),
      year: Number(year),
      day: Number(day),
    });

    return response.json(providers);
  }
}
