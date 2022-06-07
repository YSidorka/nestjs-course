import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { UserEntity } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dto/report.dto';

@Controller('reports')
@Serialize(ReportDto)
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post('')
  @UseGuards(AuthGuard)
  async createReport(
    @Body() body: CreateReportDto,
    @CurrentUser() user: UserEntity
  ) {
    const report = await this.reportsService.create(body, user);
    return report;
  }

  @Get('/:id')
  async getReport(@Param() params: Record<string, any>) {
    const report = await this.reportsService.findOne(params);
    return report;
  }
}
