import { StudentManager } from "../StudentManager";

// Import necessary modules
// MockStudent class to simulate the behavior of the Student class
class MockStudent {
  public id: string = "default-id";
}

// Test suite for the remove method in StudentManager
describe("StudentManager.remove() remove method", () => {
  let studentManager: StudentManager;
  let mockStudent1: MockStudent;
  let mockStudent2: MockStudent;

  beforeEach(() => {
    studentManager = new StudentManager();
    mockStudent1 = new MockStudent();
    mockStudent2 = new MockStudent();
  });

  describe("Happy paths", () => {
    it("should remove a student by id when the student exists", () => {
      // Arrange
      mockStudent1.id = "student-1";
      mockStudent2.id = "student-2";
      studentManager.students = [mockStudent1 as any, mockStudent2 as any];

      // Act
      studentManager.remove("student-1");

      // Assert
      expect(studentManager.students).toEqual([mockStudent2 as any]);
    });

    it("should not remove any student if the id does not match", () => {
      // Arrange
      mockStudent1.id = "student-1";
      mockStudent2.id = "student-2";
      studentManager.students = [mockStudent1 as any, mockStudent2 as any];

      // Act
      studentManager.remove("non-existent-id");

      // Assert
      expect(studentManager.students).toEqual([
        mockStudent1 as any,
        mockStudent2 as any,
      ]);
    });
  });

  describe("Edge cases", () => {
    it("should handle removing from an empty list gracefully", () => {
      // Arrange
      studentManager.students = [];

      // Act
      studentManager.remove("any-id");

      // Assert
      expect(studentManager.students).toEqual([]);
    });

    it("should handle removing a student when there is only one student in the list", () => {
      // Arrange
      mockStudent1.id = "student-1";
      studentManager.students = [mockStudent1 as any];

      // Act
      studentManager.remove("student-1");

      // Assert
      expect(studentManager.students).toEqual([]);
    });

    it("should handle removing a student with an empty string as id", () => {
      // Arrange
      mockStudent1.id = "";
      mockStudent2.id = "student-2";
      studentManager.students = [mockStudent1 as any, mockStudent2 as any];

      // Act
      studentManager.remove("");

      // Assert
      expect(studentManager.students).toEqual([mockStudent2 as any]);
    });

    it("should handle removing a student with a null id", () => {
      // Arrange
      mockStudent1.id = null as any;
      mockStudent2.id = "student-2";
      studentManager.students = [mockStudent1 as any, mockStudent2 as any];

      // Act
      studentManager.remove(null as any);

      // Assert
      expect(studentManager.students).toEqual([mockStudent2 as any]);
    });
  });
});
