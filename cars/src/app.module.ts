import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './users/user.entity';
import { ReportEntity } from './reports/report.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [UserEntity, ReportEntity],
      synchronize: true
    }),
    UsersModule,
    ReportsModule
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService]
})
export class AppModule {
  constructor(private envConfig: ConfigService) {
    console.log('envConfig:', this.envConfig.get('ACCOUNT'));
  }
}
