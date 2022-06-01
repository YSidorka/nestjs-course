import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupApp } from './setup-app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const envConfig = app.get(ConfigService);
  const port = envConfig.get('PORT');
  console.log('port:', port);

  await setupApp(app);
  await app.listen(port);
}

bootstrap();
