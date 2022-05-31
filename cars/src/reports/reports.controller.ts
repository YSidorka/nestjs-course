import { Controller, Get, Param } from '@nestjs/common';

@Controller('reports')
export class ReportsController {
  @Get('/:id')
  getReport(@Param() params: Record<string, any>) {
    console.log(params);
    return params;
  }
}
