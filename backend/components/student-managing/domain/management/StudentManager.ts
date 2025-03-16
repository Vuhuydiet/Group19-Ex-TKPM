import { Student } from "./Student";

export class StudentManager {
  private _students: Student[] = [];


  add(student: Student): void {
    this._students.push(student);
  }

  remove(id: string): void {
    this._students = this._students.filter(student => student.id !== id);
  }

  set students(students: Student[]) {
    this._students = students;
  }

  get students() {
    return this._students;
  }

  getStudents(compare: (student: Student) => boolean) {
    return this._students.filter(compare);
  }

  update(id: string, studentInfo: Partial<Student>): void {
    this._students.forEach(student => {
      if (student.id === id) {
        Object.assign(student, studentInfo);
      }
    });
  }

}