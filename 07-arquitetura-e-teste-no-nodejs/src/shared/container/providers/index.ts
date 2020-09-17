import { container } from 'tsyringe';

import DiskStorageProvider from './StorageProviders/implementations/DiskStorageProvider';
import IStoragesProvider from './StorageProviders/models/IStorageProvider';

container.registerSingleton<IStoragesProvider>(
  'IStoragesProvider',
  DiskStorageProvider,
);
