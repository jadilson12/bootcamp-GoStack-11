import { container } from 'tsyringe';

import IHashProvider from './HashProvider/modules/IHashProvider';
import BCryptHastProvider from './HashProvider/implementations/BCryptHastProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHastProvider);
