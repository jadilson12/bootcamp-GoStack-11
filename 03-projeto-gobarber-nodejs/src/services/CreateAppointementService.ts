import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointement';

interface Request {
  date: Date;
  provider_id: string;
}
import AppointementRepository from '../repositories/AppointementRepository';
import AppError from '../errors/AppError';

export default class CreateAppointmentService {
  public async exercute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointementRepository);

    const appointmenDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentRepository.findByDate(
      appointmenDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('this appointement is already booked');
    }

    const appointment = appointmentRepository.create({
      provider_id,
      date: appointmenDate,
    });

    await appointmentRepository.save(appointment);

    return appointment;
  }
}
