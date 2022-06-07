import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const envConfig = app.get(ConfigService);
  const port = envConfig.get('PORT') || 3000;
  console.log('port:', port);

  console.log('ENV:', process.env.NODE_ENV);
  console.log('ACCOUNT:', process.env.ACCOUNT);
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  await app.listen(port);
}

bootstrap();
