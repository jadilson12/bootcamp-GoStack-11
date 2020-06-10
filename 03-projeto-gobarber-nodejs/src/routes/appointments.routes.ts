import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import appointmentRepository from '../repositories/AppointementRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateAppointmentService from '../services/CreateAppointementService';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(appointmentRepository);

  const appointments = await appointmentsRepository.find();

  return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
  try {
    const { provider_id, date } = req.body;

    const parseDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();
    const appointment = await createAppointment.exercute({
      date: parseDate,
      provider_id,
    });

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
