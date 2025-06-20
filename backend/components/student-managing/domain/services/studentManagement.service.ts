import { DomainCode } from "../../../../core/responses/DomainCode";
import { BadRequestError } from "../../../../core/responses/ErrorResponse";
import prisma from "../../../../models";
import IdentityDocument from "../management/IdentityDocument";
import { Address, Gender, Student } from "../management/Student";
import { StudentManager } from "../management/StudentManager";

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
  constructor(private readonly studentManager: StudentManager = new StudentManager()) {}

  public async getAllowedEmailDomains() {
    return await prisma.allowedEmailDomain.findMany();
  }

  public async addStudent(studentData: StudentData) {
    if (await this.studentManager.getStudentById(studentData.id) !== null)
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

    await this.studentManager.add(student);

    return student;
  }

  public async removeStudent(id: string) {
    await this.studentManager.remove(id);
  }

  public async getStudentById(id: string) {
    return await this.studentManager.getStudentById(id);
  }

  public async getStudents(query: StudentQuery) {
    const students = await this.studentManager.getStudents(query);
    return students;
  }

  public async updateStudent(id: string, info: Partial<Student>) {
    await this.studentManager.update(id, info);
  }
}