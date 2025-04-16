// __tests__/course.service.test.ts
import { CourseService, CourseData } from '../course.service';

jest.mock('../../../../../models', () => ({
  __esModule: true,
  default: {
    course: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
    class: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
  },
}));
const prisma = require('../../../../models').default;

describe('CourseService', () => {
  const sampleData: CourseData = {
    id: 'C1',
    courseName: 'Math',
    nCredits: 3,
    facultyId: 'F1',
    description: 'desc',
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
    activated: true,
  };

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    it('should create course if nCredits >= 2', async () => {
      prisma.course.create.mockResolvedValue(sampleData);
      const result = await CourseService.create(sampleData);
      expect(prisma.course.create).toHaveBeenCalledWith({ data: sampleData });
      expect(result).toEqual(sampleData);
    });
    it('should throw if nCredits < 2', async () => {
      await expect(CourseService.create({ ...sampleData, nCredits: 1 })).rejects.toThrow('nCredits must be >= 2');
    });
  });

  describe('findAll', () => {
    it('should call prisma.course.findMany with activated true by default', async () => {
      prisma.course.findMany.mockResolvedValue([sampleData]);
      const result = await CourseService.findAll();
      expect(prisma.course.findMany).toHaveBeenCalledWith({ where: { activated: true } });
      expect(result).toEqual([sampleData]);
    });
    it('should call prisma.course.findMany with activated false', async () => {
      prisma.course.findMany.mockResolvedValue([]);
      await CourseService.findAll({ activated: false });
      expect(prisma.course.findMany).toHaveBeenCalledWith({ where: { activated: false } });
    });
  });

  describe('findById', () => {
    it('should call prisma.course.findUnique with correct id', async () => {
      prisma.course.findUnique.mockResolvedValue(sampleData);
      const result = await CourseService.findById('C1');
      expect(prisma.course.findUnique).toHaveBeenCalledWith({ where: { id: 'C1' } });
      expect(result).toEqual(sampleData);
    });
  });

  describe('update', () => {
    it('should update allowed fields', async () => {
      prisma.class.findMany.mockResolvedValue([]);
      prisma.course.update.mockResolvedValue({ ...sampleData, courseName: 'Physics' });
      const result = await CourseService.update('C1', { courseName: 'Physics' });
      expect(prisma.course.update).toHaveBeenCalledWith({ where: { id: 'C1' }, data: { courseName: 'Physics' } });
      expect(result.courseName).toBe('Physics');
    });
    it('should not update nCredits if students registered', async () => {
      prisma.class.findMany.mockResolvedValue([{ enrollments: [{}] }]);
      prisma.course.update.mockResolvedValue(sampleData);
      const result = await CourseService.update('C1', { nCredits: 4 });
      expect(prisma.course.update).toHaveBeenCalledWith({ where: { id: 'C1' }, data: {} });
      expect(result).toEqual(sampleData);
    });
    it('should throw if nCredits < 2', async () => {
      await expect(CourseService.update('C1', { nCredits: 1 })).rejects.toThrow('nCredits must be >= 2');
    });
  });

  describe('delete', () => {
    it('should delete if created < 30min ago and no class', async () => {
      prisma.course.findUnique.mockResolvedValue({ ...sampleData, createdAt: new Date() });
      prisma.class.count.mockResolvedValue(0);
      prisma.course.delete.mockResolvedValue(sampleData);
      const result = await CourseService.delete('C1');
      expect(prisma.course.delete).toHaveBeenCalledWith({ where: { id: 'C1' } });
      expect(result).toEqual(sampleData);
    });
    it('should deactivate if created > 30min ago or has class', async () => {
      prisma.course.findUnique.mockResolvedValue(sampleData);
      prisma.class.count.mockResolvedValue(1);
      prisma.course.update.mockResolvedValue({ ...sampleData, activated: false });
      const result = await CourseService.delete('C1');
      expect(prisma.course.update).toHaveBeenCalledWith({ where: { id: 'C1' }, data: { activated: false } });
      expect(result.activated).toBe(false);
    });
    it('should throw if course not found', async () => {
      prisma.course.findUnique.mockResolvedValue(null);
      await expect(CourseService.delete('C1')).rejects.toThrow('Course not found');
    });
  });
});