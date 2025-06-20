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
  async create(data: ClassData) {
    return prisma.class.create({ data });
  }

  async findAll(query: ClassQuery) {
    return prisma.class.findMany({
      where: query
    });
  }

  async findById(id: string) {
    return prisma.class.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<ClassData>) {
    return prisma.class.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.class.delete({ where: { id } });
  }
}
