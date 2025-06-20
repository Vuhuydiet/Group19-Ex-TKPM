import prisma from '../../../../models';

// TypeScript interfaces for data parameters
export interface EnrollmentRecordData {
  studentId: string;
  classId: string;
  grade?: number;
}

export interface EnrollmentRecordQuery {
  studentId?: string;
  classId?: string;
  grade?: number;
}

export class CourseEnrollmentService {
  async create(data: EnrollmentRecordData) {
    // Check prerequisite if exists
    const classObj = await prisma.class.findUnique({ where: { id: data.classId }, include: { course: true } });
    if (!classObj) 
      throw new Error('Class not found');
    const course = classObj.course;

    if (course.prerequisiteId) {
      const preqClasses = await prisma.class.findMany({ where: { courseId: course.prerequisiteId }, select: { id: true } });
      const preqClassIds = preqClasses.map(c => c.id);
      if (preqClassIds.length === 0) 
        throw new Error('No class found for prerequisite course');
      const passed = await prisma.enrollmentRecord.findFirst({
        where: {
          studentId: data.studentId,
          classId: { in: preqClassIds },
          grade: { gte: 5 }
        }
      });
      if (!passed) throw new Error('Student has not passed the prerequisite course');
    }
    return await prisma.enrollmentRecord.create({ data });
  }

  async findAll(query?: EnrollmentRecordQuery) {
    return await prisma.enrollmentRecord.findMany({
      where: {
        ...(query?.studentId ? { studentId: query.studentId } : {}),
        ...(query?.classId ? { classId: query.classId } : {}),
        ...(query?.grade !== undefined ? { grade: query.grade } : {}),
      },
      include: {
        class: {
          include: {
            course: true,
          }
        }
      }
    });
  }

  async findById(studentId: string, classId: string) {
    return await prisma.enrollmentRecord.findUnique({ where: { studentId_classId: { studentId, classId } } });
  }

  async update(studentId: string, classId: string, data: Partial<EnrollmentRecordData>) {
    return await prisma.enrollmentRecord.update({ where: { studentId_classId: { studentId, classId } }, data });
  }

  async delete(studentId: string, classId: string) {
    await prisma.classCancelHistory.create({
      data: { studentId, classId }
    });
    return await prisma.enrollmentRecord.delete({ where: { studentId_classId: { studentId, classId } } });

  }

  async findAllCancelHistory(query: {studentId?: string, classId?: string}) {
    return await prisma.classCancelHistory.findMany({
      where: query
    });
  }
}
