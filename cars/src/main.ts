import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const envConfig = app.get(ConfigService);
  const port = envConfig.get('PORT');
  console.log('port:', port);
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  await app.listen(port);
}

bootstrap();
