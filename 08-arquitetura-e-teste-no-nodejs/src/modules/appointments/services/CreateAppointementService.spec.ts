import AppError from '@shared/errors/AppError';
import FakeAppointementRepository from '../repositories/fakes/FakeAppointementRepository';
import CreateAppointmentService from './CreateAppointementService';

describe('CreateAppointment', () => {
  it('should create a new appointment', async () => {
    const fakeAppointementRepository = new FakeAppointementRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointementRepository,
    );

    const appointment = await createAppointment.exercute({
      date: new Date(),
      provider_id: '1221144544',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('1221144544');
  });

  it('should not be able to create a two appointment on the same time', async () => {
    const fakeAppointementRepository = new FakeAppointementRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointementRepository,
    );
    const appointmentDate = new Date(2020, 7, 10, 11);

    await createAppointment.exercute({
      date: appointmentDate,
      provider_id: '1221144544',
    });
    expect(
      createAppointment.exercute({
        date: appointmentDate,
        provider_id: '1221144544',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
