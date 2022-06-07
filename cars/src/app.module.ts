import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity';
import { ReportEntity } from './reports/report.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
const cookieSession = require('cookie-session'); // eslint-disable-line

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : `.env.prod`
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get('DBNAME'),
          entities: [UserEntity, ReportEntity],
          synchronize: true
        };
      }
    }),
    UsersModule,
    ReportsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ConfigService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true })
    }
  ]
})
export class AppModule {
  constructor(private envConfig: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    // console.log('ENV:', process.env.NODE_ENV);
    // console.log('ACCOUNT:', process.env.ACCOUNT);

    const account = this.envConfig.get('ACCOUNT');
    consumer.apply(cookieSession({ keys: [account] })).forRoutes('*');
  }
}
