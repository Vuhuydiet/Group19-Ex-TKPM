import prisma from '../../../../models';

// TypeScript interfaces for data parameters
export interface ClassCancelHistoryData {
  studentId: string;
  classId: string;
  canceledAt: Date;
}

export class ClassCancelHistoryService {
  static async create(data: ClassCancelHistoryData) {
    return prisma.classCancelHistory.create({ data });
  }

  static async findAll() {
    return prisma.classCancelHistory.findMany();
  }

  static async findById(studentId: string, classId: string, canceledAt: Date) {
    return prisma.classCancelHistory.findUnique({ where: { studentId_classId_canceledAt: { studentId, classId, canceledAt } } });
  }

  static async update(studentId: string, classId: string, canceledAt: Date, data: Partial<ClassCancelHistoryData>) {
    return prisma.classCancelHistory.update({ where: { studentId_classId_canceledAt: { studentId, classId, canceledAt } }, data });
  }

  static async delete(studentId: string, classId: string, canceledAt: Date) {
    return prisma.classCancelHistory.delete({ where: { studentId_classId_canceledAt: { studentId, classId, canceledAt } } });
  }
}
