import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import FakeStarageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStarageProvider';
import UpdateUserAvatarService from '././UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to avatar a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStarageProvider = new FakeStarageProvider();

    const updateUSerAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStarageProvider,
    );
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUSerAvatar.exercute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not able to update avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStarageProvider = new FakeStarageProvider();

    const updateUSerAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStarageProvider,
    );
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUSerAvatar.exercute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(
      updateUSerAvatar.exercute({
        user_id: 'non-existing-user',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar then updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStarageProvider = new FakeStarageProvider();

    const deleteFile = jest.spyOn(fakeStarageProvider, 'deleteFile');

    const updateUSerAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStarageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUSerAvatar.exercute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateUSerAvatar.exercute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
