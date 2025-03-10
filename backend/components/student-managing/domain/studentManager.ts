import { Student } from "./student";

export class StudentManager {
  public _students: Student[] = [];


  add(student: Student): void {
    this._students.push(student);
  }

  remove(id: string): void {
    this._students = this._students.filter(student => student.id !== id);
  }

  get students() {
    return this._students;
  }

  getStudentById(id: string): Student | undefined {
    return this._students.find(student => student.id === id);
  }

  getStudentsByName(name: string): Student[] {
    return this._students.filter(student => student.name === name);
  }

  update(id: string, studentInfo: Partial<Student>): void {
    this._students.forEach(student => {
      if (student.id === id) {
        Object.assign(student, studentInfo);
      }
    });
  }

}