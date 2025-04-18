import prisma from '../../../../models';

// TypeScript interfaces for data parameters
export interface ClassData {
  id: string;
  courseId: string;
  year: number;
  semester: number;
  professorName: string;
  capacity: number;
  schedule: string;
  room: string;
}

export interface ClassQuery {
  courseId?: string
  year?: number
  semester?: number
  room?: string
}

export class ClassService {
  static async create(data: ClassData) {
    return prisma.class.create({ data });
  }

  static async findAll(query: ClassQuery) {
    return prisma.class.findMany({
      where: query
    });
  }

  static async findById(id: string) {
    return prisma.class.findUnique({ where: { id } });
  }

  static async update(id: string, data: Partial<ClassData>) {
    return prisma.class.update({ where: { id }, data });
  }

  static async delete(id: string) {
    return prisma.class.delete({ where: { id } });
  }
}
