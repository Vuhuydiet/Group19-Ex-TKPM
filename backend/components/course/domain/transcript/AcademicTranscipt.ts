import { Student } from "../../../student-managing/domain/management/Student";


export type CourseData = {
  courseId: string;
  courseName: string;
  credits: number;
  grade?: number;
}

export default class AcademicTranscript {
  studentInfo: Student;
  courses: CourseData[];
  totalCredits: number;
  gpa: number;
  createdAt: Date;

  constructor(studentInfo: Student,  courses: CourseData[]) {
    this.studentInfo = studentInfo;
    this.courses = courses;
    this.totalCredits = this.calculateTotalCredits();
    this.gpa = this.calculateGPA();
    this.createdAt = new Date();
  }

  private calculateTotalCredits(): number {
    return this.courses.reduce((total, course) => total + course.credits, 0);
  }

  private calculateGPA(): number {
    const totalPoints = this.courses.reduce((total, course) => {
      return total + ((course.grade ?? 0) * course.credits);
    }, 0);
    const totalCredits = this.courses.reduce((total, course) => total + course.credits, 0);
    if (totalCredits === 0) 
      return 0;
    return totalPoints / totalCredits;
  }
}