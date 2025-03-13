
import { StudentManager } from '../studentManager';


// Import necessary modules
// MockStudent class to simulate the behavior of the Student class
class MockStudent {
  public id: string = 'default-id';
  public name: string = 'default-name';
  public age: number = 20;
}

// Test suite for the update method in StudentManager
describe('StudentManager.update() update method', () => {
  let studentManager: StudentManager;
  let mockStudent1: MockStudent;
  let mockStudent2: MockStudent;

  beforeEach(() => {
    // Initialize StudentManager and mock students before each test
    studentManager = new StudentManager();
    mockStudent1 = new MockStudent();
    mockStudent2 = new MockStudent();
    mockStudent2.id = 'another-id';

    // Add mock students to the StudentManager
    studentManager['students'].push(mockStudent1 as any, mockStudent2 as any);
  });

  // Happy path tests
  describe('Happy paths', () => {
    it('should update the student information when a valid ID is provided', () => {
      // Arrange
      const updatedInfo = { name: 'updated-name', age: 25 };

      // Act
      studentManager.update('default-id', updatedInfo as any);

      // Assert
      expect(mockStudent1.name).toBe('updated-name');
      expect(mockStudent1.age).toBe(25);
    });

    it('should not update any student if the ID does not match', () => {
      // Arrange
      const updatedInfo = { name: 'updated-name', age: 25 };

      // Act
      studentManager.update('non-existent-id', updatedInfo as any);

      // Assert
      expect(mockStudent1.name).toBe('default-name');
      expect(mockStudent1.age).toBe(20);
      expect(mockStudent2.name).toBe('default-name');
      expect(mockStudent2.age).toBe(20);
    });
  });

  // Edge case tests
  describe('Edge cases', () => {
    it('should handle updating with an empty object gracefully', () => {
      // Arrange
      const updatedInfo = {};

      // Act
      studentManager.update('default-id', updatedInfo as any);

      // Assert
      expect(mockStudent1.name).toBe('default-name');
      expect(mockStudent1.age).toBe(20);
    });

    it('should handle updating with partial information', () => {
      // Arrange
      const updatedInfo = { age: 30 };

      // Act
      studentManager.update('default-id', updatedInfo as any);

      // Assert
      expect(mockStudent1.name).toBe('default-name');
      expect(mockStudent1.age).toBe(30);
    });

    it('should not throw an error if the students list is empty', () => {
      // Arrange
      studentManager._students = [];

      // Act & Assert
      expect(() => studentManager.update('default-id', { name: 'new-name' } as any)).not.toThrow();
    });
  });
});