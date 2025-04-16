// __tests__/course-enrollment.service.test.ts
import { CourseEnrollmentService, EnrollmentRecordData } from '../course-enrollment.service';

jest.mock('../../../../../models', () => ({
  __esModule: true,
  default: {
    class: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    enrollmentRecord: {
      create: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    classCancelHistory: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  },
}));
const prisma = require('../../../../../models').default;

describe('CourseEnrollmentService', () => {
  const sampleData: EnrollmentRecordData = {
    studentId: 'S1',
    classId: 'C1',
    grade: 8,
  };

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    it('should create enrollment if no prerequisite', async () => {
      prisma.class.findUnique.mockResolvedValue({ id: 'C1', course: {} });
      prisma.enrollmentRecord.create.mockResolvedValue(sampleData);
      const result = await CourseEnrollmentService.create(sampleData);
      expect(prisma.class.findUnique).toHaveBeenCalled();
      expect(prisma.enrollmentRecord.create).toHaveBeenCalledWith({ data: sampleData });
      expect(result).toEqual(sampleData);
    });
    it('should throw if class not found', async () => {
      prisma.class.findUnique.mockResolvedValue(null);
      await expect(CourseEnrollmentService.create(sampleData)).rejects.toThrow('Class not found');
    });
    it('should throw if prerequisite not passed', async () => {
      prisma.class.findUnique.mockResolvedValue({ id: 'C1', course: { prerequisiteId: 'P1' } });
      prisma.class.findMany.mockResolvedValue([{ id: 'PREQ1' }]);
      prisma.enrollmentRecord.findFirst.mockResolvedValue(null);
      await expect(CourseEnrollmentService.create(sampleData)).rejects.toThrow('Student has not passed the prerequisite course');
    });
  });

  describe('findAll', () => {
    it('should call prisma.enrollmentRecord.findMany with query', async () => {
      prisma.enrollmentRecord.findMany.mockResolvedValue([sampleData]);
      const result = await CourseEnrollmentService.findAll({ studentId: 'S1' });
      expect(prisma.enrollmentRecord.findMany).toHaveBeenCalled();
      expect(result).toEqual([sampleData]);
    });
  });

  describe('findById', () => {
    it('should call prisma.enrollmentRecord.findUnique with correct keys', async () => {
      prisma.enrollmentRecord.findUnique.mockResolvedValue(sampleData);
      const result = await CourseEnrollmentService.findById('S1', 'C1');
      expect(prisma.enrollmentRecord.findUnique).toHaveBeenCalledWith({ where: { studentId_classId: { studentId: 'S1', classId: 'C1' } } });
      expect(result).toEqual(sampleData);
    });
  });

  describe('update', () => {
    it('should call prisma.enrollmentRecord.update with correct params', async () => {
      prisma.enrollmentRecord.update.mockResolvedValue({ ...sampleData, grade: 9 });
      const result = await CourseEnrollmentService.update('S1', 'C1', { grade: 9 });
      expect(prisma.enrollmentRecord.update).toHaveBeenCalledWith({ where: { studentId_classId: { studentId: 'S1', classId: 'C1' } }, data: { grade: 9 } });
      expect(result.grade).toBe(9);
    });
  });

  describe('delete', () => {
    it('should call prisma.classCancelHistory.create and prisma.enrollmentRecord.delete', async () => {
      prisma.classCancelHistory.create.mockResolvedValue({});
      prisma.enrollmentRecord.delete.mockResolvedValue(sampleData);
      const result = await CourseEnrollmentService.delete('S1', 'C1');
      expect(prisma.classCancelHistory.create).toHaveBeenCalledWith({ data: { studentId: 'S1', classId: 'C1' } });
      expect(prisma.enrollmentRecord.delete).toHaveBeenCalledWith({ where: { studentId_classId: { studentId: 'S1', classId: 'C1' } } });
      expect(result).toEqual(sampleData);
    });
  });

  describe('findAllCancelHistory', () => {
    it('should call prisma.classCancelHistory.findMany with query', async () => {
      prisma.classCancelHistory.findMany.mockResolvedValue([{ studentId: 'S1', classId: 'C1' }]);
      const result = await CourseEnrollmentService.findAllCancelHistory({ studentId: 'S1' });
      expect(prisma.classCancelHistory.findMany).toHaveBeenCalledWith({ where: { studentId: 'S1' } });
      expect(result).toEqual([{ studentId: 'S1', classId: 'C1' }]);
    });
  });
});
