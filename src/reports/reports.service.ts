import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { EmailService } from '../email/email.service';
import { generateReportTemplate } from './templates/report.template';
import { envs } from '../config/envs';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    private readonly emailService: EmailService,
  ) {}

  async create(dto: CreateReportDto): Promise<Report> {
    const report = this.reportRepository.create({
      address: dto.address,
      description: dto.description,
      severity: dto.severity,
      reporterPhone: dto.reporterPhone,
      status: 'PENDING',
    });

    const savedReport = await this.reportRepository.save(report);

    const htmlContent = generateReportTemplate(dto);
    await this.emailService.sendEmail(
      envs.MAILER_USER,
      `Nuevo Reporte de Fuga #${savedReport.id} - Severidad: ${savedReport.severity.toUpperCase()}`,
      htmlContent,
    );

    return savedReport;
  }

  async findAll(): Promise<Report[]> {
    return await this.reportRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }
}