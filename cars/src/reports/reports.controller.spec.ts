import { Test, TestingModule } from '@nestjs/testing';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';

describe('ReportsController', () => {
  let controller: ReportsController;
  let fakeReportsService: Partial<ReportsService>;

  beforeEach(async () => {
    fakeReportsService = {
      async create(reportDto: CreateReportDto) {
        return null;
      }
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportsController],
      providers: [{ provide: ReportsService, useValue: fakeReportsService }]
    }).compile();

    controller = module.get<ReportsController>(ReportsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
