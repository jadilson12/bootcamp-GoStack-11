import { container } from 'tsyringe';

import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointementRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepositories';
import IUsersRepository from '@modules/users/infra/http/repositories/IUsersRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentRepository',
  AppointmentRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
