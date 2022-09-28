import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma/prisma.service';

interface CreateStudentParams {
  authUserId: string;
}

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  createStudent({ authUserId }: CreateStudentParams) {
    return this.prisma.student.create({
      data: {
        authUserId,
      },
    });
  }

  findAllStudents() {
    return this.prisma.student.findMany();
  }

  findStudentByAuthUserId(authUserId: string) {
    return this.prisma.student.findUnique({
      where: {
        authUserId,
      },
    });
  }

  findStudentById(id: string) {
    return this.prisma.student.findUnique({
      where: {
        id,
      },
    });
  }
}
