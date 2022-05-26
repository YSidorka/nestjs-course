import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

const cookieSession = require('cookie-session'); // eslint-disable-line
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.getHttpAdapter().getInstance().disable('x-powered-by');

  const envConfig = app.get(ConfigService);
  const port = envConfig.get('PORT');
  const account = envConfig.get('ACCOUNT');

  console.log('port:', port);
  console.log('account:', account);

  app.use(cookieSession({ keys: [account] }));
  await app.listen(port);
}

bootstrap();
