
import { Student } from "../student";
import { StudentManager } from '../studentManager';


// Import necessary modules and classes
// Define a test suite for the getStudentById method
describe('StudentManager.getStudentById() getStudentById method', () => {
  let studentManager: StudentManager;
  let students: Student[];

  // Initialize the StudentManager and a set of students before each test
  beforeEach(() => {
    students = [
      new Student('1', 'Alice', new Date('2004-2-2'), 'Nam', 'Khoa Luật', 1, 'Program', 'Address', 'Email', 'Phone', 'Đang học'),
      new Student('2', 'Bob',new Date('2023-2-2'), 'Nam', 'Khoa Luật', 1, 'Program', 'Address', 'Email', 'Phone', 'Đang học'),
      new Student('3', 'Charlie', new Date('2003-1-1'), 'Nam', 'Khoa Luật', 1, 'Program', 'Address', 'Email', 'Phone', 'Đang học')
    ];
    studentManager = new StudentManager();
    (studentManager as any)._students = students; // Directly setting private property for testing
  });

  // Happy path tests
  describe('Happy Paths', () => {
    it('should return the correct student when a valid ID is provided', () => {
      // Test to ensure the method returns the correct student for a valid ID
      const student = studentManager.getStudentById('1');
      expect(student).toEqual(new Student('1', 'Alice', new Date('2004-2-2'), 'Nam', 'Khoa Luật', 1, 'Program', 'Address', 'Email', 'Phone', 'Đang học'));
    });

    it('should return undefined when an ID does not exist', () => {
      // Test to ensure the method returns undefined for a non-existent ID
      const student = studentManager.getStudentById('4');
      expect(student).toBeUndefined();
    });
  });

  // Edge case tests
  describe('Edge Cases', () => {
    it('should return undefined when an empty string is provided as ID', () => {
      // Test to ensure the method returns undefined for an empty string ID
      const student = studentManager.getStudentById('');
      expect(student).toBeUndefined();
    });

    it('should return undefined when a null value is provided as ID', () => {
      // Test to ensure the method returns undefined for a null ID
      const student = studentManager.getStudentById(null as any);
      expect(student).toBeUndefined();
    });

    it('should return undefined when an undefined value is provided as ID', () => {
      // Test to ensure the method returns undefined for an undefined ID
      const student = studentManager.getStudentById(undefined as any);
      expect(student).toBeUndefined();
    });

    it('should return undefined when a numeric ID is provided', () => {
      // Test to ensure the method returns undefined for a numeric ID
      const student = studentManager.getStudentById(1 as any);
      expect(student).toBeUndefined();
    });

    it('should return undefined when a special character ID is provided', () => {
      // Test to ensure the method returns undefined for a special character ID
      const student = studentManager.getStudentById('@');
      expect(student).toBeUndefined();
    });
  });
});