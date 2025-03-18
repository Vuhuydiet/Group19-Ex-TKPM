
import { StudentManager } from '../StudentManager';


// Import necessary modules
// MockStudent class to simulate the behavior of the Student class
class MockStudent {
  public name: string = 'John Doe';
  public age: number = 20;
  public id: string = '12345';
}

describe('StudentManager.add() add method', () => {
  let studentManager: StudentManager;

  beforeEach(() => {
    studentManager = new StudentManager();
  });

  describe('Happy paths', () => {
    it('should add a student to the student list', () => {
      // Arrange
      const mockStudent = new MockStudent() as any;

      // Act
      studentManager.add(mockStudent);

      // Assert
      expect(studentManager.students).toContain(mockStudent);
    });

    it('should add multiple students to the student list', () => {
      // Arrange
      const mockStudent1 = new MockStudent() as any;
      const mockStudent2 = new MockStudent() as any;
      mockStudent2.name = 'Jane Doe';
      mockStudent2.id = '67890';

      // Act
      studentManager.add(mockStudent1);
      studentManager.add(mockStudent2);

      // Assert
      expect(studentManager.students).toContain(mockStudent1);
      expect(studentManager.students).toContain(mockStudent2);
    });
  });

  describe('Edge cases', () => {
    it('should handle adding a student with an empty name', () => {
      // Arrange
      const mockStudent = new MockStudent() as any;
      mockStudent.name = '';

      // Act
      studentManager.add(mockStudent);

      // Assert
      expect(studentManager.students).toContain(mockStudent);
    });

    it('should handle adding a student with a very long name', () => {
      // Arrange
      const mockStudent = new MockStudent() as any;
      mockStudent.name = 'A'.repeat(1000);

      // Act
      studentManager.add(mockStudent);

      // Assert
      expect(studentManager.students).toContain(mockStudent);
    });

    it('should handle adding a student with a negative age', () => {
      // Arrange
      const mockStudent = new MockStudent() as any;
      mockStudent.age = -1;

      // Act
      studentManager.add(mockStudent);

      // Assert
      expect(studentManager.students).toContain(mockStudent);
    });

    it('should handle adding a student with a very large age', () => {
      // Arrange
      const mockStudent = new MockStudent() as any;
      mockStudent.age = 1000;

      // Act
      studentManager.add(mockStudent);

      // Assert
      expect(studentManager.students).toContain(mockStudent);
    });

    it('should handle adding a student with a duplicate ID', () => {
      // Arrange
      const mockStudent1 = new MockStudent() as any;
      const mockStudent2 = new MockStudent() as any;
      mockStudent2.name = 'Jane Doe';

      // Act
      studentManager.add(mockStudent1);
      studentManager.add(mockStudent2);

      // Assert
      expect(studentManager.students).toContain(mockStudent1);
      expect(studentManager.students).toContain(mockStudent2);
    });
  });
});