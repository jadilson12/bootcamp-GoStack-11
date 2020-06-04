import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';
import Appointment from '../model/Appointement';

interface Request {
  date: Date;
  provider: string;
}
import AppointementRepository from '../repositories/AppointementRepository';
export default class AppointmentService {
  public async create({ date, provider }: Request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointementRepository);

    const appointmenDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentRepository.findByDate(
      appointmenDate,
    );

    if (findAppointmentInSameDate) {
      throw new Error('this appointement is already booked');
    }

    const appointment = appointmentRepository.create({
      provider,
      date: appointmenDate,
    });

    await appointmentRepository.save(appointment);

    return appointment;
  }
}
