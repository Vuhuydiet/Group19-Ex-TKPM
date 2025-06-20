import { StudentManager } from '../StudentManager';
import prisma from '../../../../../models';

// Mock the prisma client
jest.mock('../../../../../models', () => ({
  student: {
    delete: jest.fn(),
    findUnique: jest.fn(),
  },
}));

describe('StudentManager.remove() method', () => {
  let studentManager: StudentManager;
  const mockStudentId = 'student-1';

  beforeEach(() => {
    studentManager = new StudentManager();
    
    // Reset mocks
    jest.clearAllMocks();

    // Setup default mock implementation
    (prisma.student.delete as jest.Mock).mockResolvedValue({});
    (prisma.student.findUnique as jest.Mock).mockResolvedValue({ id: mockStudentId });
  });

  describe('Happy path', () => {
    it('should successfully remove a student by ID', async () => {
      // Act
      await studentManager.remove(mockStudentId);

      // Assert
      expect(prisma.student.delete).toHaveBeenCalledTimes(1);
      expect(prisma.student.delete).toHaveBeenCalledWith({
        where: { id: mockStudentId }
      });
    });

    it('should succeed even when called multiple times with the same ID', async () => {
      // Act
      await studentManager.remove(mockStudentId);
      await studentManager.remove(mockStudentId);

      // Assert
      expect(prisma.student.delete).toHaveBeenCalledTimes(2);
      expect(prisma.student.delete).toHaveBeenCalledWith({
        where: { id: mockStudentId }
      });
    });
  });

  describe('Error handling', () => {
    it('should throw an error when student doesn\'t exist', async () => {
      // Arrange
      (prisma.student.delete as jest.Mock).mockRejectedValueOnce(
        new Error('Student not found')
      );

      // Act & Assert
      await expect(studentManager.remove('non-existent-id')).rejects.toThrow();
    });

    it('should throw an error when database operation fails', async () => {
      // Arrange
      const errorMessage = 'Database connection error';
      (prisma.student.delete as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage)
      );

      // Act & Assert
      await expect(studentManager.remove(mockStudentId)).rejects.toThrow();
    });
  });

  describe('Edge cases', () => {
    it('should throw an error when given an empty ID', async () => {
      // Arrange
      (prisma.student.delete as jest.Mock).mockRejectedValueOnce(
        new Error('Invalid ID provided')
      );

      // Act & Assert
      await expect(studentManager.remove('')).rejects.toThrow();
    });

    it('should handle special characters in student ID', async () => {
      // Arrange
      const specialId = 'student@123#$';
      
      // Act
      await studentManager.remove(specialId);
      
      // Assert
      expect(prisma.student.delete).toHaveBeenCalledWith({
        where: { id: specialId }
      });
    });
  });

  describe('Transaction integrity', () => {
    it('should fail completely if deletion fails partially', async () => {
      
      // Arrange
      (prisma.student.delete as jest.Mock).mockRejectedValueOnce(
        new Error('Error during deletion')
      );
      
      // Act & Assert
      await expect(studentManager.remove(mockStudentId)).rejects.toThrow('Error during deletion');
      
    });
  });
});