import { Controller, Post, Body, UseGuards, Res, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ReportsService } from './reports.service';
import { Response } from 'express';

@Controller('reports')
@UseGuards(JwtAuthGuard)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('financial')
  async generateFinancialReport(
    @Body(ValidationPipe) data: { students: Array<{ studentId: string; enrollmentIds: string[] }> },
    @Res() res: Response,
  ) {
    const report = await this.reportsService.generateFinancialReport(data.students);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=financial-report-${new Date().toISOString().split('T')[0]}.pdf`,
    });

    return res.send(report);
  }
}
