import { container } from 'tsyringe';

import ICacheProvider from './models/ICacheProvider';

import RadisCacheProvider from './implementations/RadisCacheProvider';

const providers = {
  redis: RadisCacheProvider,
};

container.registerSingleton<ICacheProvider>('CacheProvider', providers.redis);
