import { DomainCode } from "../../../../core/responses/DomainCode";
import { BadRequestError } from "../../../../core/responses/ErrorResponse";
import prisma from "../../../../models";
import g_StudentManger from "../../storage/studentManager";
import IdentityDocument from "../management/IdentityDocument";
import { Address, Gender, Student } from "../management/Student";

export type StudentData = {
  id: string,
  name: string,
  dob: Date,
  gender: Gender,
  faculty: string,
  academicYear: number,
  program: string, // now just the id
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
  faculty?: string,
}

export default class StudentManagementService {

  public static async getAllowedEmailDomains() {
    return await prisma.allowedEmailDomain.findMany();
  }

  public static async addStudent(studentData: StudentData) {
    if (await g_StudentManger.getStudentById(studentData.id) !== null)
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

    // fetch program by id
    const program = await prisma.program.findUnique({
      where: { id: studentData.program }
    });
    if (!program)
      throw new BadRequestError(DomainCode.PROGRAM_NOT_FOUND, 'Program not found');

    const student = new Student(
      studentData.id,
      studentData.name,
      studentData.dob,
      studentData.gender,
      faculty,
      studentData.academicYear,
      program,
      studentData.permanentAddress,
      studentData.temporaryAddress,
      studentData.email,
      studentData.phone,
      status,
      studentData.identityDocument,
      studentData.nationality
    );

    await g_StudentManger.add(student);

    return student;
  }

  public static async removeStudent(id: string) {
    await g_StudentManger.remove(id);
  }

  public static async getStudentById(id: string) {
    return await g_StudentManger.getStudentById(id);
  }

  public static async getStudents(query: StudentQuery) {
    const students = await g_StudentManger.getStudents(query);
    return students;
  }

  public static async updateStudent(id: string, info: Partial<Student>) {
    await g_StudentManger.update(id, info);
  }
}