import { StudentManager } from '../StudentManager';
import { Student, Address, Gender } from '../Student';
import prisma from '../../../../../models';
import { OldIdentityCard } from '../IdentityDocument';

// Mock the prisma client
jest.mock('../../../../../models', () => ({
  student: {
    update: jest.fn(),
    findUnique: jest.fn(),
  },
  address: {
    update: jest.fn(),
  },
  identityDocument: {
    update: jest.fn(),
  },
}));

describe('StudentManager.update() method', () => {
  let studentManager: StudentManager;
  let mockStudent: Partial<Student>;
  let mockPermanentAddress: Address;
  let mockTemporaryAddress: Address;
  let mockFaculty: any;
  let mockStatus: any;
  let mockIdentityDocument: any;
  const mockStudentId = 'student-1';

  beforeEach(() => {
    studentManager = new StudentManager();
    
    // Reset mocks
    jest.clearAllMocks();
    
    // Setup mock data
    mockPermanentAddress = {
      id: 'permanent-address-id',
      city: 'Ho Chi Minh',
      district: 'District 1',
      ward: 'Ward 1',
      street: '123 Main St'
    };
    
    mockTemporaryAddress = {
      id: 'temporary-address-id',
      city: 'Da Nang',
      district: 'District 2',
      ward: 'Ward 2',
      street: '456 Second St'
    };
    
    mockFaculty = {
      id: 'faculty-id',
      name: 'Information Technology'
    };
    
    mockStatus = {
      id: 'status-id',
      name: 'Studying'
    };
    
    mockIdentityDocument = {
      id: 'identity-id',
      type: 'NewIdentityCard',
      data: {
        id: '123456789',
        issuedDate: '2020-01-01',
        issuedPlace: 'Ho Chi Minh',
        expiredDate: '2030-01-01',
        hasChip: true
      }
    };
    
    // Setup mock student
    mockStudent = {
      id: mockStudentId,
      name: 'Nguyen Van A',
      dob: new Date('2000-01-01'),
      gender: 'Nam' as Gender,
      faculty: mockFaculty,
      academicYear: 2020,
      program: { id: 'HQ', name: 'High-Quality', description: 'High-Quality Program' },
      permanentAddress: mockPermanentAddress,
      temporaryAddress: mockTemporaryAddress,
      email: 'nguyenvana@example.com',
      phone: '0123456789',
      status: mockStatus,
      identityDocument: mockIdentityDocument,
      nationality: 'Việt Nam',
      toJSON: jest.fn().mockReturnValue({})
    };

    // Setup default mock implementation
    (prisma.student.update as jest.Mock).mockResolvedValue({
      id: mockStudentId,
      ...mockStudent
    });
    
    (prisma.student.findUnique as jest.Mock).mockResolvedValue({
      id: mockStudentId,
      ...mockStudent
    });
  });

  describe('Happy path', () => {
    it('should update all fields of a student correctly', async () => {
      // Arrange
      const updateInfo = {
        name: 'Nguyen Van B',
        dob: new Date('2001-02-02'),
        gender: 'Nữ' as Gender,
        academicYear: 2021,
        program: { id: 'REG', name: 'Regular', description: 'Regular Program' },
        email: 'nguyenvanb@example.com',
        phone: '9876543210',
        nationality: 'USA'
      };

      // Act
      await studentManager.update(mockStudentId, updateInfo);

      // Assert
      expect(prisma.student.update).toHaveBeenCalledTimes(1);
      expect(prisma.student.update).toHaveBeenCalledWith({
        where: { id: mockStudentId },
        data: expect.objectContaining(updateInfo)
      });
    });

    it('should update faculty reference correctly', async () => {
      // Arrange
      const newFaculty = { id: 'new-faculty-id', name: 'Computer Science', description: "", createdAt: new Date() };
      
      // Act
      await studentManager.update(mockStudentId, { faculty: newFaculty });

      // Assert
      expect(prisma.student.update).toHaveBeenCalledWith({
        where: { id: mockStudentId },
        data: expect.objectContaining({
          faculty: { connect: { id: newFaculty.id } }
        })
      });
    });

    it('should update status reference correctly', async () => {
      // Arrange
      const newStatus = { id: 'new-status-id', name: 'Graduated', description: "", createdAt: new Date() };
      
      // Act
      await studentManager.update(mockStudentId, { status: newStatus });

      // Assert
      expect(prisma.student.update).toHaveBeenCalledWith({
        where: { id: mockStudentId },
        data: expect.objectContaining({
          status: { connect: { id: newStatus.id } }
        })
      });
    });

    it('should update identity document reference correctly', async () => {
      // Arrange
      const newIdentityDocument = new OldIdentityCard("oldIdentityCard", new Date(), 'Hanoi', new Date());
      
      // Act
      await studentManager.update(mockStudentId, { identityDocument: newIdentityDocument });

      // Assert
      expect(prisma.student.update).toHaveBeenCalledWith({
        where: { id: mockStudentId },
        data: expect.objectContaining({
          identityDocument: { connect: { id: newIdentityDocument.id } }
        })
      });
    });

    it('should update permanent address reference correctly', async () => {
      // Arrange
      const newPermanentAddress = {
        id: 'new-permanent-address-id',
        city: 'Hanoi',
        district: 'Ba Dinh',
        ward: 'Kim Ma',
        street: '78 Tran Hung Dao'
      };
      
      // Act
      await studentManager.update(mockStudentId, { permanentAddress: newPermanentAddress });

      // Assert
      expect(prisma.student.update).toHaveBeenCalledWith({
        where: { id: mockStudentId },
        data: expect.objectContaining({
          permanentAddress: { connect: { id: newPermanentAddress.id } }
        })
      });
    });

    it('should update temporary address reference correctly', async () => {
      // Arrange
      const newTemporaryAddress = {
        id: 'new-temporary-address-id',
        city: 'Can Tho',
        district: 'Ninh Kieu',
        ward: 'An Khanh',
        street: '45 Nguyen Trai'
      };
      
      // Act
      await studentManager.update(mockStudentId, { temporaryAddress: newTemporaryAddress });

      // Assert
      expect(prisma.student.update).toHaveBeenCalledWith({
        where: { id: mockStudentId },
        data: expect.objectContaining({
          temporaryAddress: { connect: { id: newTemporaryAddress.id } }
        })
      });
    });
  });

  describe('Error handling', () => {
    it('should throw an error if student does not exist', async () => {
      // Arrange
      (prisma.student.update as jest.Mock).mockRejectedValueOnce(
        new Error('Student not found')
      );
      
      // Act & Assert
      await expect(studentManager.update('non-existent-id', { name: 'New Name' }))
        .rejects.toThrow('Student not found');
    });

    it('should throw an error when database operation fails', async () => {
      // Arrange
      const errorMessage = 'Database connection error';
      (prisma.student.update as jest.Mock).mockRejectedValueOnce(
        new Error(errorMessage)
      );
      
      // Act & Assert
      await expect(studentManager.update(mockStudentId, { name: 'New Name' }))
        .rejects.toThrow(errorMessage);
    });
    
    it('should throw an error when trying to update with invalid faculty reference', async () => {
      // Arrange
      const invalidFaculty = { id: 'invalid-faculty-id', name: 'Invalid Faculty', description: "", createdAt: new Date() };
      (prisma.student.update as jest.Mock).mockRejectedValueOnce(
        new Error('Foreign key constraint failed on the field: `faculty`')
      );
      
      // Act & Assert
      await expect(studentManager.update(mockStudentId, { faculty: invalidFaculty }))
        .rejects.toThrow('Foreign key constraint failed');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty update data without changes', async () => {
      // Arrange
      const emptyUpdate = {};
      
      // Act
      await studentManager.update(mockStudentId, emptyUpdate);
      
      // Assert
      expect(prisma.student.update).toHaveBeenCalledTimes(1);
      expect(prisma.student.update).toHaveBeenCalledWith({
        where: { id: mockStudentId },
        data: {}
      });
    });
    
    it('should handle update with only undefined values', async () => {
      // Arrange
      const updateWithUndefined = {
        name: undefined,
        email: undefined,
        phone: undefined
      };
      
      // Act
      await studentManager.update(mockStudentId, updateWithUndefined);
      
      // Assert
      expect(prisma.student.update).toHaveBeenCalledTimes(1);
      // The update should filter out undefined values
      expect(prisma.student.update).toHaveBeenCalledWith({
        where: { id: mockStudentId },
        data: {}
      });
    });
    
    it('should remove temporary address if set to undefined', async () => {
      // Act
      await studentManager.update(mockStudentId, { temporaryAddress: undefined });
      
      // Assert
      expect(prisma.student.update).toHaveBeenCalledWith({
        where: { id: mockStudentId },
        data: expect.objectContaining({
          temporaryAddress: undefined
        })
      });
    });
    
    it('should remove identity document if set to undefined', async () => {
      // Act
      await studentManager.update(mockStudentId, { identityDocument: undefined });
      
      // Assert
      expect(prisma.student.update).toHaveBeenCalledWith({
        where: { id: mockStudentId },
        data: expect.objectContaining({
          identityDocument: undefined
        })
      });
    });
  });
});