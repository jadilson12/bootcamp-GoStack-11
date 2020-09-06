import { injectable, inject } from 'tsyringe';
import { startOfHour, isBefore, getHours } from 'date-fns';

import AppError from '@shared/errors/AppError';

import Appointment from '../infra/typeorm/entities/Appointement';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  date: Date;
  user_id: string;
  provider_id: string;
}

@injectable()
export default class CreateAppointmentService {
  constructor(
    @inject('AppointmentRepository')
    private readonly _appointmentRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    date,
    user_id,
    provider_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.");
    }

    if (user_id === provider_id) {
      throw new AppError(
        "You can't create an appointment with the same user and provider.",
      );
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        "You can't create an appointment out of working hours.",
      );
    }

    const findAppointmentInSameDate = await this._appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('this appointement is already booked');
    }

    const appointment = await this._appointmentRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }
}
