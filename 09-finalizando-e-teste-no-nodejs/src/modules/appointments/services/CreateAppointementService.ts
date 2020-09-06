import { injectable, inject } from 'tsyringe';
import { startOfHour } from 'date-fns';

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

  public async exercute({
    date,
    user_id,
    provider_id,
  }: IRequest): Promise<Appointment> {
    const appointmenDate = startOfHour(date);

    const findAppointmentInSameDate = await this._appointmentRepository.findByDate(
      appointmenDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('this appointement is already booked');
    }

    const appointment = await this._appointmentRepository.create({
      provider_id,
      user_id,
      date: appointmenDate,
    });

    return appointment;
  }
}
