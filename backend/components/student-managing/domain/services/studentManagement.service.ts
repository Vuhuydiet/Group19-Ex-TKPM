import { DomainCode } from "../../../../core/responses/DomainCode";
import { BadRequestError } from "../../../../core/responses/ErrorResponse";
import g_StudentManger from "../../storage/studentManager";
import { Faculty, Student } from "../management/Student";


export type StudentQuery = {
  name?: string,
  faculty?: Faculty,
}

export default class StudentManagementService {
  public static addStudent(student: Student) {
    if (g_StudentManger.students.find(std => std.id === student.id))
      throw new BadRequestError(DomainCode.STUDENT_ALREADY_EXISTS, 'Student already exists');
    g_StudentManger.add(student);
  }

  public static removeStudent(id: string) {
    g_StudentManger.remove(id);
  }

  public static getStudentById(id: string) {
    return g_StudentManger.getStudents((student) => {
      return student.id == id;
    })[0];
  }

  public static getStudents(query: StudentQuery) {
    return g_StudentManger.getStudents((student) => {
      if (query.name && student.name.includes(query.name))
        return true;
      if (query.faculty && student.faculty === query.faculty)
        return true;
      if (!query.name && !query.faculty) 
        return true;
      return false;

    });
    return students;
  }

  public static updateStudent(id: string, info: Partial<Student>) {
    g_StudentManger.update(id, info);
  }
}