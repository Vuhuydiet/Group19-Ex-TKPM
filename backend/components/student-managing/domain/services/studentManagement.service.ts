import g_StudentManger from "../../storage/studentManager";
import { Faculty, Student } from "../management/Student";


type StudentQuery = {
  name?: string,
  faculty?: Faculty,
}

export default class StudentManagementService {
  public static addStudent(student: Student) {
    g_StudentManger.add(student);
  }

  public static removeStudent(id: string) {
    g_StudentManger.remove(id);
  }

  public static getStudentById(id: string) {
    return g_StudentManger.getStudents((student) => {
      return student.id == id;
    });
  }

  public static getStudents(query: StudentQuery) {
    return g_StudentManger.getStudents((student) => {
      return ((query.name || false) && student.name.includes(query.name)) || ((query.faculty || false) && student.faculty === query.faculty);
    });
  }

  public static updateStudent(id: string, info: Partial<Student>) {
    g_StudentManger.update(id, info);
  }
}