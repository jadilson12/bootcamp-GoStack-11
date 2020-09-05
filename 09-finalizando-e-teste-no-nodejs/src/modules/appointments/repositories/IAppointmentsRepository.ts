import ICreateAppointmentDto from '../dtos/ICreateAppointmentDto';
import IFindAllMonthFromProviderDTO from '../dtos/IFindAllMonthFromProviderDTO';
import Appointment from '../infra/typeorm/entities/Appointement';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDto): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: IFindAllMonthFromProviderDTO,
  ): Promise<Appointment[]>;
}
