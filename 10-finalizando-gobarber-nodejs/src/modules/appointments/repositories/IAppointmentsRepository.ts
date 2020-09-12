import ICreateAppointmentDto from '../dtos/ICreateAppointmentDto';
import IFindAllDayFromProviderDTO from '../dtos/IFindAllDayFromProviderDTO';
import IFindAllMonthFromProviderDTO from '../dtos/IFindAllMonthFromProviderDTO';
import Appointment from '../infra/typeorm/entities/Appointement';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDto): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: IFindAllMonthFromProviderDTO,
  ): Promise<Appointment[]>;
  findAllInDayFromProvider(
    data: IFindAllDayFromProviderDTO,
  ): Promise<Appointment[]>;
}
