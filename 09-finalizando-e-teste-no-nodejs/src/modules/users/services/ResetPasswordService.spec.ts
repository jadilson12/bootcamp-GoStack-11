import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakenUSerTokensRepository from '../repositories/fakes/FakeUserTokenRepository';

import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUSerTokensRepository: FakenUSerTokensRepository;

let resetPasswordService: ResetPasswordService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUSerTokensRepository = new FakenUSerTokensRepository();

    resetPasswordService = new ResetPasswordService(
      fakeUsersRepository,
      fakeUSerTokensRepository,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { token } = await fakeUSerTokensRepository.generate(user.id);

    await resetPasswordService.exercute({
      password: '123123',
      token,
    });

    const updtateUser = await fakeUsersRepository.findById(user.id);

    expect(updtateUser?.password).toBe('123123');
  });
});
