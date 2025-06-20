import { StudentManager } from '../StudentManager';
import { Student, Address, Gender } from '../Student';
import prisma from '../../../../../models';

// Mock the prisma client
jest.mock('../../../../../models', () => ({
  address: {
    create: jest.fn(),
  },
  identityDocument: {
    create: jest.fn(),
  },
  student: {
    create: jest.fn(),
  },
}));

describe('StudentManager.add() method', () => {
  let studentManager: StudentManager;
  let mockStudent: Partial<Student>;
  let mockPermanentAddress: Address;
  let mockTemporaryAddress: Address;
  let mockFaculty: any;
  let mockStatus: any;
  let mockIdentityDocument: any;
  let mockProgram: any;

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

    mockProgram = {
      id: 'program-id',
      name: 'Computer Science',
      description: 'Computer Science Program'
    };

    // Setup mock student
    mockStudent = {
      id: 'student-1',
      name: 'Nguyen Van A',
      dob: new Date('2000-01-01'),
      gender: 'Male' as Gender,
      faculty: mockFaculty,
      academicYear: 2020,
      program: mockProgram,
      permanentAddress: mockPermanentAddress,
      temporaryAddress: mockTemporaryAddress,
      email: 'nguyenvana@example.com',
      phone: '0123456789',
      status: mockStatus,
      identityDocument: mockIdentityDocument,
      nationality: 'Vietnam',
      toJSON: jest.fn().mockReturnValue({})
    };

    // Setup prisma mock implementations
    (prisma.address.create as jest.Mock).mockImplementation((params) => {
      return Promise.resolve({ 
        id: params.data.city === 'Ho Chi Minh' ? 'permanent-address-id' : 'temporary-address-id',
        ...params.data 
      });
    });
    
    (prisma.identityDocument.create as jest.Mock).mockResolvedValue({
      id: 'identity-id',
      ...mockIdentityDocument
    });
    
    (prisma.student.create as jest.Mock).mockResolvedValue({
      id: 'student-1',
      ...mockStudent
    });
  });

  describe('Happy path', () => {
    it('should add a student with all fields correctly', async () => {
      // Act
      await studentManager.add(mockStudent as Student);

      // Assert
      expect(prisma.address.create).toHaveBeenCalledTimes(2);
      expect(prisma.identityDocument.create).toHaveBeenCalledTimes(1);
      expect(prisma.student.create).toHaveBeenCalledTimes(1);
      
      // Check if student create was called with correct parameters
      expect(prisma.student.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          id: mockStudent.id,
          name: mockStudent.name,
          dob: mockStudent.dob,
          gender: mockStudent.gender,
          academicYear: mockStudent.academicYear,
          email: mockStudent.email,
          phone: mockStudent.phone,
          permanentAddress: { connect: { id: 'permanent-address-id' } },
          temporaryAddress: { connect: { id: 'temporary-address-id' } },
          faculty: { connect: { id: mockStudent.faculty?.id } },
          status: { connect: { id: mockStudent.status?.id } },
          identityDocument: { connect: { id: 'identity-id' } },
          nationality: mockStudent.nationality,
          program: { connect: { id: mockProgram.id } },
        })
      });
    });

    it('should add a student without temporary address', async () => {
      // Arrange
      mockStudent.temporaryAddress = undefined;

      // Act
      await studentManager.add(mockStudent as Student);

      // Assert
      expect(prisma.address.create).toHaveBeenCalledTimes(1);
      expect(prisma.student.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          temporaryAddress: undefined,
        })
      });
    });

    it('should add a student without identity document', async () => {
      // Arrange
      mockStudent.identityDocument = undefined;

      // Act
      await studentManager.add(mockStudent as Student);

      // Assert
      expect(prisma.identityDocument.create).not.toHaveBeenCalled();
      expect(prisma.student.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          identityDocument: undefined,
        })
      });
    });
  });

  describe('Error handling', () => {
    it('should throw an error if permanent address creation fails', async () => {
      // Arrange
      const errorMessage = 'Failed to create address';
      (prisma.address.create as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      // Act & Assert
      await expect(studentManager.add(mockStudent as Student)).rejects.toThrow();
    });

    it('should throw an error if student creation fails', async () => {
      // Arrange
      const errorMessage = 'Failed to create student';
      (prisma.student.create as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

      // Act & Assert
      await expect(studentManager.add(mockStudent as Student)).rejects.toThrow();
    });
  });
});