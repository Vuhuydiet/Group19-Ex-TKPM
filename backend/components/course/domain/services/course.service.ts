import prisma from '../../../../models';

// TypeScript interfaces for data parameters
export interface CourseData {
  id: string;
  courseName: string;
  nCredits: number;
  facultyId: string;
  description: string;
  prerequisiteId?: string;
  createdAt?: Date;
  activated?: boolean;
}

export class CourseService {
  async create(data: CourseData) {
    if (typeof data.nCredits !== 'number' || data.nCredits < 2) {
      throw new Error('nCredits must be >= 2');
    }
    return prisma.course.create({ data });
  }

  async findAll({ activated }: { activated?: boolean } = {}) {
    const where = typeof activated === 'boolean' ? { activated } : { activated: true };
    return prisma.course.findMany({ where });
  }

  async findById(id: string) {
    return prisma.course.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<CourseData>) {
    if (data.nCredits !== undefined) {
      if (data.nCredits < 2) {
        throw new Error('nCredits must be >= 2');
      }
      const classes = await prisma.class.findMany({ where: { courseId: id }, select: { enrollments: { take: 1 } } });
      const hasEnrollment = classes.some(cls => cls.enrollments.length > 0);
      if (hasEnrollment) {
        delete data.nCredits;
      }
    }
    return prisma.course.update({ where: { id }, data: data });
  }

  async delete(id: string) {
    const course = await prisma.course.findUnique({ where: { id } });
    if (!course) throw new Error('Course not found');
    const now = new Date();
    const createdAt = new Date(course.createdAt);
    const diffMinutes = (now.getTime() - createdAt.getTime()) / 60000;
    const classCount = await prisma.class.count({ where: { courseId: id } });
    if (diffMinutes <= 30 && classCount === 0) {
      return prisma.course.delete({ where: { id } });
    } else {
      return prisma.course.update({ where: { id }, data: { activated: false } });
    }
  }
}
