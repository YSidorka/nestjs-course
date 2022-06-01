import { ConfigService } from '@nestjs/config';
const cookieSession = require('cookie-session'); // eslint-disable-line
import { ValidationPipe } from '@nestjs/common';

export const setupApp = (app: any) => {
  const envConfig = app.get(ConfigService);

  const account = envConfig.get('ACCOUNT');
  // console.log('account:', account);

  app.use(cookieSession({ keys: [account] }));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.getHttpAdapter().getInstance().disable('x-powered-by');
};
