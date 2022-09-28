import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface CreateEnrollmentParams {
  studentId: string;
  courseId: string;
}

interface FindByCourseAndStudentIdParams {
  courseId: string;
  studentId: string;
}

@Injectable()
export class EnrollmentsService {
  constructor(private prisma: PrismaService) {}

  createEnrollment({ studentId, courseId }: CreateEnrollmentParams) {
    return this.prisma.enrollment.create({
      data: {
        studentId,
        courseId,
      },
    });
  }

  findByCourseAndStudentId({
    courseId,
    studentId,
  }: FindByCourseAndStudentIdParams) {
    return this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        cancelledAt: null,
      },
    });
  }

  findAllEnrollments() {
    return this.prisma.enrollment.findMany({
      where: {
        cancelledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findEnrollmentsByStudent(studentId: string) {
    return this.prisma.enrollment.findMany({
      where: {
        studentId,
        cancelledAt: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
