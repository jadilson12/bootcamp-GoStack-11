import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeRadisCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeRadisCacheProvider';

import ListProviderService from './ListProviderService';

let fakeUsersRepository: FakeUsersRepository;
let listProvider: ListProviderService;
let fakeRadisCacheProvider: FakeRadisCacheProvider;

describe('ListProvider', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeRadisCacheProvider = new FakeRadisCacheProvider();

    listProvider = new ListProviderService(
      fakeUsersRepository,
      fakeRadisCacheProvider,
    );
  });

  it('should be able to list the provider', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'johntre@example.com',
      password: '123456',
    });

    const loggeruser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johnqua@example.com',
      password: '123456',
    });

    const providers = await listProvider.exercute({
      user_id: loggeruser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
