import { container } from 'tsyringe';
import EtherealMailProvider from './MailProviders/implementations/EtherealMailProvider';
import IMailProvider from './MailProviders/models/IMailProvider';

import DiskStorageProvider from './StorageProviders/implementations/DiskStorageProvider';
import IStoragesProvider from './StorageProviders/models/IStorageProvider';

container.registerSingleton<IStoragesProvider>(
  'StoragesProvider',
  DiskStorageProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
