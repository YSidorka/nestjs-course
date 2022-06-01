import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
const cookieSession = require('cookie-session'); // eslint-disable-line

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const envConfig = app.get(ConfigService);
  const port = envConfig.get('PORT');
  console.log('port:', port);
  const account = envConfig.get('ACCOUNT');
  // console.log('account:', account);

  app.use(cookieSession({ keys: [account] }));
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  await app.listen(port);
}

bootstrap();
