import ICreateAppointmentDto from '../dtos/ICreateAppointmentDto';
import Appointment from '../infra/typeorm/entities/Appointement';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDto): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
