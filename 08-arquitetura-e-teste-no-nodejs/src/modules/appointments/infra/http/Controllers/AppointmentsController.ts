import { Request, Response } from 'express';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointementService';

import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { provider_id, date } = request.body;

      const parseDate = parseISO(date);

      const createAppointment = container.resolve(CreateAppointmentService);

      const appointment = await createAppointment.exercute({
        date: parseDate,
        provider_id,
      });

      return response.json(appointment);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
