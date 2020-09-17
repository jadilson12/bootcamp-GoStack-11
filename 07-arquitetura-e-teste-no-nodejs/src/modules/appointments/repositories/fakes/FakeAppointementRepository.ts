import * as uuid from 'uuidv4';
import { isEqual } from 'date-fns';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDto from '@modules/appointments/dtos/ICreateAppointmentDto';

import Appointment from '../../infra/typeorm/entities/Appointement';

export default class AppointmentRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  constructor() {}
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDto): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid.uuid(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }
}
