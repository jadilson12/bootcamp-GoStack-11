import AppError from '@shared/errors/AppError';
import FakeAppointementRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointementService';

let fakeAppointementRepository = new FakeAppointementRepository();
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointementRepository = new FakeAppointementRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointementRepository,
    );
  });

  it('should create a new appointment', async () => {
    const appointment = await createAppointment.exercute({
      date: new Date(),
      user_id: 'user-id',
      provider_id: '1221144544',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1221144544');
  });

  it('should not be able to create a two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 7, 10, 11);

    await createAppointment.exercute({
      date: appointmentDate,
      user_id: 'user-id',
      provider_id: '1221144544',
    });

    await expect(
      createAppointment.exercute({
        date: appointmentDate,
        user_id: 'user-id',
        provider_id: '1221144544',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
