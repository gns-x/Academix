import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StudentsModule } from './students/students.module';
import { PrismaService } from './prisma/prisma.service';
import { ServicesModule } from './services/services.module';
import { ParentsModule } from './parents/parents.module';
import { ServiceEnrollmentsModule } from './service-enrollments/service-enrollments.module';
import { AuthModule } from './auth/auth.module';
import { PaymentsModule } from './payments/payments.module';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    StudentsModule,
    ServicesModule,
    ParentsModule,
    ServiceEnrollmentsModule,
    AuthModule,
    PaymentsModule,
    ReportsModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
