// __tests__/class.service.test.ts
import { ClassService, ClassData } from '../class.service';

jest.mock('../../../../../models', () => ({
  __esModule: true,
  default: {
    class: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));
const prisma = require('../../../../models').default;

describe('ClassService', () => {
  const sampleData: ClassData = {
    id: '1',
    courseId: 'C1',
    year: 2025,
    semester: 1,
    professorName: 'Prof. X',
    capacity: 30,
    schedule: 'Mon 8-10',
    room: 'A1',
  };

  afterEach(() => jest.clearAllMocks());

  describe('create', () => {
    it('should call prisma.class.create with correct data', async () => {
      prisma.class.create.mockResolvedValue(sampleData);
      const result = await ClassService.create(sampleData);
      expect(prisma.class.create).toHaveBeenCalledWith({ data: sampleData });
      expect(result).toEqual(sampleData);
    });
  });

  describe('findAll', () => {
    it('should call prisma.class.findMany', async () => {
      prisma.class.findMany.mockResolvedValue([sampleData]);
      const result = await ClassService.findAll();
      expect(prisma.class.findMany).toHaveBeenCalled();
      expect(result).toEqual([sampleData]);
    });
  });

  describe('findById', () => {
    it('should call prisma.class.findUnique with correct id', async () => {
      prisma.class.findUnique.mockResolvedValue(sampleData);
      const result = await ClassService.findById('1');
      expect(prisma.class.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(result).toEqual(sampleData);
    });
  });

  describe('update', () => {
    it('should call prisma.class.update with correct params', async () => {
      prisma.class.update.mockResolvedValue({ ...sampleData, room: 'B2' });
      const result = await ClassService.update('1', { room: 'B2' });
      expect(prisma.class.update).toHaveBeenCalledWith({ where: { id: '1' }, data: { room: 'B2' } });
      expect(result.room).toBe('B2');
    });
  });

  describe('delete', () => {
    it('should call prisma.class.delete with correct id', async () => {
      prisma.class.delete.mockResolvedValue(sampleData);
      const result = await ClassService.delete('1');
      expect(prisma.class.delete).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(result).toEqual(sampleData);
    });
  });
});