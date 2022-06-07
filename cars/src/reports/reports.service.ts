import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReportEntity } from './report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UserEntity } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ReportDto } from './dto/report.dto';

@Injectable()
@Serialize(ReportDto)
export class ReportsService {
  constructor(
    @InjectRepository(ReportEntity) private repo: Repository<ReportEntity>
  ) {}

  async create(reportDto: CreateReportDto, user: UserEntity) {
    const reportEntity = this.repo.create(reportDto);
    reportEntity.user = user; // association
    return this.repo.save(reportEntity);
  }

  async findOne(options) {
    try {
      const reportEntity = await this.repo.findOne({ where: options });
      return reportEntity;
    } catch (err) {
      return null;
    }
  }
}
