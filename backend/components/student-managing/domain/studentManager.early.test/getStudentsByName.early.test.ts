
import { Student } from "../student";
import { StudentManager } from '../studentManager';


// Import necessary modules and classes
// Define the test suite for the getStudentsByName method
describe('StudentManager.getStudentsByName() getStudentsByName method', () => {
  let studentManager: StudentManager;

  // Initialize a new StudentManager instance before each test
  beforeEach(() => {
    studentManager = new StudentManager();
  });

  // Happy path tests
  describe('Happy Paths', () => {
    it('should return an empty array when no students are present', () => {
      // Test when there are no students in the manager
      const result = studentManager.getStudentsByName('John');
      expect(result).toEqual([]);
    });

    it('should return an array with a single student when one student matches the name', () => {
      // Test when one student matches the name
      const student: Student = new Student('1', 'John', new Date(), 'Nam', 'Khoa Luật', 1, 'Program', 'Address', 'Email', 'Phone', 'Đang học');
      studentManager._students.push(student);

      const result = studentManager.getStudentsByName('John');
      expect(result).toEqual([student]);
    });

    it('should return an array with multiple students when multiple students match the name', () => {
      // Test when multiple students match the name
      const student1: Student = new Student('1', 'John', new Date(), 'Nam', 'Khoa Luật', 1, 'Program', 'Address', 'Email', 'Phone', 'Đang học');
      const student2: Student = new Student('1', 'John', new Date(), 'Nam', 'Khoa Luật', 1, 'Program', 'Address', 'Email', 'Phone', 'Đang học');
      studentManager._students.push(student1, student2);

      const result = studentManager.getStudentsByName('John');
      expect(result).toEqual([student1, student2]);
    });

    it('should return an empty array when no students match the name', () => {
      // Test when no students match the name
      const student: Student = new Student('1', 'john', new Date(), 'Nam', 'Khoa Luật', 1, 'Program', 'Address', 'Email', 'Phone', 'Đang học')
      studentManager._students.push(student);

      const result = studentManager.getStudentsByName('John');
      expect(result).toEqual([]);
    });
  });

  // Edge case tests
  describe('Edge Cases', () => {
    it('should return an empty array when searching for an empty string', () => {
      // Test when searching for an empty string
      const student: Student = new Student('1', 'John', new Date(), 'Nam', 'Khoa Luật', 1, 'Program', 'Address', 'Email', 'Phone', 'Đang học');
      studentManager._students.push(student);

      const result = studentManager.getStudentsByName('');
      expect(result).toEqual([]);
    });

    it('should handle case sensitivity and return an empty array if case does not match', () => {
      // Test case sensitivity
      const student: Student = new Student('1', 'John', new Date(), 'Nam', 'Khoa Luật', 1, 'Program', 'Address', 'Email', 'Phone', 'Đang học');
      studentManager._students.push(student);

      const result = studentManager.getStudentsByName('john');
      expect(result).toEqual([]);
    });

    it('should return an empty array when the student list is empty', () => {
      // Test when the student list is empty
      const result = studentManager.getStudentsByName('John');
      expect(result).toEqual([]);
    });

    it('should return an empty array when searching for a name with special characters', () => {
      // Test when searching for a name with special characters
      const student: Student = new Student('1', 'John', new Date(), 'Nam', 'Khoa Luật', 1, 'Program', 'Address', 'Email', 'Phone', 'Đang học');
      studentManager._students.push(student);

      const result = studentManager.getStudentsByName('J@hn');
      expect(result).toEqual([]);
    });
  });
});