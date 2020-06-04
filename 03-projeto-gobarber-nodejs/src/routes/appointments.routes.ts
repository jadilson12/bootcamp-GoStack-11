import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import appointmentRepository from '../repositories/AppointementRepository';
import AppointmentService from '../services/AppointementService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (req, res) => {
  const appointmentsRepository = getCustomRepository(appointmentRepository);

  const appointments = await appointmentsRepository.find();

  return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
  try {
    const { provider, date } = req.body;

    const parseDate = parseISO(date);

    const createAppointment = new AppointmentService();
    const appointment = await createAppointment.create({
      date: parseDate,
      provider,
    });

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
