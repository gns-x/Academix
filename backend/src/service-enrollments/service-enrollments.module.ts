import { Module } from '@nestjs/common';
import { ServiceEnrollmentsController } from './service-enrollments.controller';
import { ServiceEnrollmentsService } from './service-enrollments.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ServiceEnrollmentsController],
  providers: [ServiceEnrollmentsService],
  exports: [ServiceEnrollmentsService],
})
export class ServiceEnrollmentsModule {}
