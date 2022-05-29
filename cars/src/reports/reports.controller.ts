import { Controller, Get, Param } from '@nestjs/common';

@Controller('reports')
export class ReportsController {
  @Get('/:id')
  getReport(@Param() params: Object) {
    console.log(params);
    return params;
  }
}
