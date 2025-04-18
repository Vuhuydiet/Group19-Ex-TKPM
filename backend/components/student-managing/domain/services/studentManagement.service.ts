import { DomainCode } from "../../../../core/responses/DomainCode";
import { BadRequestError } from "../../../../core/responses/ErrorResponse";
import prisma from "../../../../models";
import g_StudentManger from "../../storage/studentManager";
import IdentityDocument from "../management/IdentityDocument";
import { Address, Student } from "../management/Student";

export type StudentData = {
  id: string,
  name: string,
  dob: Date,
  gender: 'Nam' | 'Nữ',
  faculty: string,
  academicYear: number,
  program: string,
  permanentAddress: Address,
  temporaryAddress?: Address,
  email: string,
  phone: string,
  status: string,
  identityDocument: IdentityDocument,
  nationality: string,
}

export type StudentQuery = {
  name?: string,
  faculty?: String,
}

export default class StudentManagementService {

  public static async getAllowedEmailDomains() {
    return await prisma.allowedEmailDomain.findMany();
  }

  public static async addStudent(studentData: StudentData) {
    if (g_StudentManger.students.find(std => std.id === studentData.id))
      throw new BadRequestError(DomainCode.STUDENT_ALREADY_EXISTS, 'Student already exists');

    const faculty = await prisma.faculty.findUnique({
      where: { id: studentData.faculty }
    });

    if (!faculty)
      throw new BadRequestError(DomainCode.FACULTY_NOT_FOUND, 'Faculty not found');

    const status = await prisma.studyStatus.findUnique({
      where: { id: studentData.status }
    });

    if (!status)
      throw new BadRequestError(DomainCode.STUDY_STATUS_NOT_FOUND, 'Study status not found');

    const student = new Student(
      studentData.id,
      studentData.name,
      studentData.dob,
      studentData.gender,
      faculty,
      studentData.academicYear,
      studentData.program,
      studentData.permanentAddress,
      studentData.temporaryAddress,
      studentData.email,
      studentData.phone,
      status,
      studentData.identityDocument,
      studentData.nationality
    );

    g_StudentManger.add(student);

    return student;
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
      if (query.faculty && student.faculty.id === query.faculty)
        return true;
      if (!query.name && !query.faculty) 
        return true;
      return false;

    });
  }

  public static updateStudent(id: string, info: Partial<Student>) {
    g_StudentManger.update(id, info);
  }
}