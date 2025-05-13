import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as PDFDocument from 'pdfkit';
import { PDFDocument as PDFKit } from 'pdfkit';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  private async generateHeader(doc: PDFKit.PDFDocument) {
    // Add logo and school name with a modern twist
    doc
      .fillColor('#2E4053')
      .fontSize(36)
      .font('Helvetica-Bold')
      .text('Scammers Academy', 50, 70)
      .fontSize(20)
      .font('Helvetica')
      .fillColor('#5D6D7E')
      .text('Financial Report', 50, 105);

    // Add report generation date with a sleek format
    const generatedDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    doc
      .fontSize(14)
      .fillColor('#95A5A6')
      .text(`Generated on ${generatedDate}`, 50, 130);

    // Add decorative line with a gradient effect
    const gradient = doc.linearGradient(50, 160, 550, 160);
    gradient.stop(0, '#34495E').stop(1, '#2E4053');
    doc
      .lineWidth(3)
      .strokeColor(gradient)
      .moveTo(50, 160)
      .lineTo(550, 160)
      .stroke();
  }

  private async generateStudentInfo(doc: PDFKit.PDFDocument, student: any) {
    // Student section header with modern design
    doc
      .fillColor('#2E4053')
      .fontSize(20)
      .font('Helvetica-Bold')
      .text('Student Information', 50, doc.y + 30);

    // Create info box with background and shadow
    const infoBoxY = doc.y + 20;
    doc
      .rect(50, infoBoxY, 500, 100)
      .fillColor('#ECF0F1')
      .fill();

    // Add student details with a clean layout
    doc
      .fillColor('#2E4053')
      .fontSize(16)
      .font('Helvetica-Bold')
      .text(student.name, 70, infoBoxY + 20)
      .font('Helvetica')
      .fontSize(14)
      .fillColor('#7F8C8D')
      .text(`ID: ${student.cardId}`, 70, infoBoxY + 45)
      .text(`Email: ${student.email}`, 70, infoBoxY + 65)
      .text(`Grade: ${student.grade}`, 350, infoBoxY + 45);

    doc.moveDown(2);
  }

  private async generateServicesTable(doc: PDFKit.PDFDocument, enrollments: any[]) {
    // Services section header
    doc
      .fillColor('#2E4053')
      .fontSize(20)
      .font('Helvetica-Bold')
      .text('Enrolled Services', 50, doc.y + 20);

    // Table headers with modern styling
    const tableTop = doc.y + 35;
    const tableHeaders = ['Service', 'Period', 'Base Cost', 'Custom Price', 'Status'];
    const columnWidths = [170, 120, 120, 120, 100];

    // Draw header background with gradient
    const gradient = doc.linearGradient(50, tableTop - 5, 550, tableTop - 5);
    gradient.stop(0, '#34495E').stop(1, '#2E4053');
    doc
      .rect(50, tableTop - 5, 550, 25)
      .fillColor(gradient)
      .fill();

    // Draw headers
    let xPosition = 60;
    tableHeaders.forEach((header, i) => {
      doc
        .fillColor('white')
        .fontSize(14)
        .font('Helvetica-Bold')
        .text(header, xPosition, tableTop, {
          width: columnWidths[i],
          align: 'left',
        });
      xPosition += columnWidths[i];
    });

    // Draw data rows with alternating backgrounds
    let yPosition = tableTop + 35;
    enrollments.forEach((enrollment, index) => {
      // Alternate row background
      if (index % 2 === 0) {
        doc
          .rect(50, yPosition - 5, 550, 30)
          .fillColor('#ECF0F1')
          .fill();
      }

      xPosition = 60;
      doc
        .fillColor('#2E4053')
        .fontSize(14)
        .font('Helvetica');

      // Service name
      doc.text(enrollment.service.name, xPosition, yPosition, {
        width: columnWidths[0],
      });
      xPosition += columnWidths[0];

      // Period
      doc.text(enrollment.service.billingFrequency, xPosition, yPosition, {
        width: columnWidths[1],
      });
      xPosition += columnWidths[1];

      // Base cost
      doc.text(`${enrollment.service.baseCost.toFixed(2)} MAD`, xPosition, yPosition, {
        width: columnWidths[2],
      });
      xPosition += columnWidths[2];

      // Custom price
      doc.text(
        enrollment.customPrice ? `${enrollment.customPrice.toFixed(2)} MAD` : '-',
        xPosition,
        yPosition,
        { width: columnWidths[3] }
      );
      xPosition += columnWidths[3];

      // Status with color-coded badges
      const statusColors = {
        ACTIVE: '#2ECC71',
        PENDING: '#F1C40F',
        SUSPENDED: '#E74C3C',
        CANCELLED: '#95A5A6',
      };

      doc
        .fillColor(statusColors[enrollment.status] || '#7F8C8D')
        .text(enrollment.status, xPosition, yPosition, {
          width: columnWidths[4],
        });

      yPosition += 30;
    });

    doc.moveDown(2);
  }

  private async generatePaymentHistory(doc: PDFKit.PDFDocument, payments: any[]) {
    if (payments.length === 0) return;

    // Payment history header
    doc
      .fillColor('#2E4053')
      .fontSize(20)
      .font('Helvetica-Bold')
      .text('Payment History', 50, doc.y + 20);

    // Create modern payment summary boxes
    const summaryBoxY = doc.y + 30;
    const boxWidth = 170;
    const boxSpacing = 25;

    // Calculate payment statistics
    const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
    const completedPayments = payments.filter(p => p.status === 'COMPLETED').length;
    const pendingPayments = payments.filter(p => p.status === 'PENDING').length;

    // Draw summary boxes with shadow effect
    const summaryBoxes = [
      {
        title: 'Total Payments',
        value: `${totalAmount.toFixed(2)} MAD`,
        color: '#3498DB',
      },
      {
        title: 'Completed',
        value: completedPayments.toString(),
        color: '#2ECC71',
      },
      {
        title: 'Pending',
        value: pendingPayments.toString(),
        color: '#F1C40F',
      },
    ];

    summaryBoxes.forEach((box, index) => {
      const xPos = 50 + (boxWidth + boxSpacing) * index;

      // Draw box background with shadow
      doc
        .rect(xPos, summaryBoxY, boxWidth, 80)
        .fillColor(box.color)
        .fill();

      // Add box content
      doc
        .fillColor('white')
        .fontSize(16)
        .font('Helvetica')
        .text(box.title, xPos + 15, summaryBoxY + 25)
        .fontSize(22)
        .font('Helvetica-Bold')
        .text(box.value, xPos + 15, summaryBoxY + 50);
    });

    // Payment details table
    const tableTop = summaryBoxY + 100;
    const tableHeaders = ['Date', 'Amount', 'Method', 'Status'];
    const columnWidths = [140, 140, 160, 120];

    // Draw header background with gradient
    const gradient = doc.linearGradient(50, tableTop - 5, 550, tableTop - 5);
    gradient.stop(0, '#34495E').stop(1, '#2E4053');
    doc
      .rect(50, tableTop - 5, 550, 25)
      .fillColor(gradient)
      .fill();

    // Draw headers
    let xPosition = 60;
    tableHeaders.forEach((header, i) => {
      doc
        .fillColor('white')
        .fontSize(14)
        .font('Helvetica-Bold')
        .text(header, xPosition, tableTop, {
          width: columnWidths[i],
          align: 'left',
        });
      xPosition += columnWidths[i];
    });

    // Draw payment rows with alternating backgrounds
    let yPosition = tableTop + 35;
    payments.forEach((payment, index) => {
      // Alternate row background
      if (index % 2 === 0) {
        doc
          .rect(50, yPosition - 5, 550, 30)
          .fillColor('#ECF0F1')
          .fill();
      }

      xPosition = 60;
      doc
        .fillColor('#2E4053')
        .fontSize(14)
        .font('Helvetica');

      // Payment date
      doc.text(
        new Date(payment.paymentDate).toLocaleDateString(),
        xPosition,
        yPosition,
        { width: columnWidths[0] }
      );
      xPosition += columnWidths[0];

      // Amount
      doc.text(`${payment.amount.toFixed(2)} MAD`, xPosition, yPosition, {
        width: columnWidths[1],
      });
      xPosition += columnWidths[1];

      // Payment method
      doc.text(payment.paymentMethod.type, xPosition, yPosition, {
        width: columnWidths[2],
      });
      xPosition += columnWidths[2];

      // Status with color-coded text
      const statusColors = {
        COMPLETED: '#2ECC71',
        PENDING: '#F1C40F',
        FAILED: '#E74C3C',
        REFUNDED: '#95A5A6',
      };

      doc
        .fillColor(statusColors[payment.status] || '#7F8C8D')
        .text(payment.status, xPosition, yPosition, {
          width: columnWidths[3],
        });

      yPosition += 30;
    });

    doc.moveDown(2);
  }

  private async generateFooter(doc: PDFKit.PDFDocument) {
    const pageHeight = doc.page.height;

    // Add decorative line with gradient
    const gradient = doc.linearGradient(50, pageHeight - 60, 550, pageHeight - 60);
    gradient.stop(0, '#34495E').stop(1, '#2E4053');
    doc
      .lineWidth(2)
      .strokeColor(gradient)
      .moveTo(50, pageHeight - 60)
      .lineTo(550, pageHeight - 60)
      .stroke();

    // Add footer text
    doc
      .fontSize(12)
      .fillColor('#7F8C8D')
      .text(
        'This is an official financial report. For any queries, please contact the finance department.',
        50,
        pageHeight - 50,
        { align: 'center' }
      );
  }

  async generateFinancialReport(students: Array<{ studentId: string; enrollmentIds: string[] }>) {
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
      bufferPages: true,
    });

    const chunks: Buffer[] = [];
    doc.on('data', chunk => chunks.push(chunk));

    // Add custom font registration here if needed

    await this.generateHeader(doc);

    for (const studentRequest of students) {
      const studentData = await this.prisma.student.findUnique({
        where: { id: studentRequest.studentId },
        include: {
          ServiceEnrollment: {
            where: { id: { in: studentRequest.enrollmentIds } },
            include: {
              service: true,
              payments: {
                include: {
                  paymentMethod: true,
                },
              },
            },
          },
        },
      });

      if (!studentData) continue;

      // Check if we need a new page
      if (doc.y > 500) {
        doc.addPage();
        await this.generateHeader(doc);
      }

      await this.generateStudentInfo(doc, studentData);
      await this.generateServicesTable(doc, studentData.ServiceEnrollment);

      // Check if we need a new page for payment history
      if (doc.y > 500) {
        doc.addPage();
        await this.generateHeader(doc);
      }

      const payments = studentData.ServiceEnrollment.flatMap(e => e.payments);
      await this.generatePaymentHistory(doc, payments);

      // Add page numbers
      const pages = doc.bufferedPageRange();
      for (let i = 0; i < pages.count; i++) {
        doc.switchToPage(i);
        doc.fontSize(12)
          .fillColor('#7F8C8D')
          .text(
            `Page ${i + 1} of ${pages.count}`,
            50,
            doc.page.height - 70,
            { align: 'center' }
          );
        await this.generateFooter(doc);
      }

      if (studentRequest !== students[students.length - 1]) {
        doc.addPage();
      }
    }

    // Finalize the PDF
    doc.end();

    return new Promise<Buffer>((resolve) => {
      doc.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
    });
  }
}
