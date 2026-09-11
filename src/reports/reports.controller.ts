import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';
import { Report } from './entities/report.entity';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post()
  async create(@Body() dto: CreateReportDto): Promise<Report> {
    return await this.reportsService.create(dto);
  }

  @Get()
  async findAll(): Promise<Report[]> {
    return await this.reportsService.findAll();
  }
}