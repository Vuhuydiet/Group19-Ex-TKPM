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
  static async create(data: CourseData) {
    if (typeof data.nCredits !== 'number' || data.nCredits < 2) {
      throw new Error('nCredits must be >= 2');
    }
    return prisma.course.create({ data });
  }

  static async findAll({ activated }: { activated?: boolean } = {}) {
    const where = typeof activated === 'boolean' ? { activated } : { activated: true };
    return prisma.course.findMany({ where });
  }

  static async findById(id: string) {
    return prisma.course.findUnique({ where: { id } });
  }

  static async update(id: string, data: Partial<CourseData>) {
    // Only allow updating courseName, description, facultyId, nCredits (with condition)
    const allowedFields = ['courseName', 'description', 'facultyId', 'nCredits'];
    const updateData: Partial<CourseData> = {};
    for (const key of allowedFields) {
      if ((data as any)[key] !== undefined) updateData[key as keyof CourseData] = (data as any)[key];
    }
    // If nCredits is being updated, check if any student has registered
    if (updateData.nCredits !== undefined) {
      if (updateData.nCredits < 2) {
        throw new Error('nCredits must be >= 2');
      }
      const classes = await prisma.class.findMany({ where: { courseId: id }, select: { enrollments: { take: 1 } } });
      const hasEnrollment = classes.some(cls => cls.enrollments.length > 0);
      if (hasEnrollment) {
        delete updateData.nCredits;
      }
    }
    return prisma.course.update({ where: { id }, data: updateData });
  }

  static async delete(id: string) {
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
