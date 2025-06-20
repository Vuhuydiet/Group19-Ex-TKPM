import { DomainCode } from "../../../../core/responses/DomainCode";
import { BadRequestError } from "../../../../core/responses/ErrorResponse";
import prisma from "../../../../models";

export type FacultyData = {
  id: string;
  name: string;
  description?: string;
};

export default class FacultyService {
  public async getFaculties() {
    return await prisma.faculty.findMany();
  }

  public async getFacultyById(id: string) {
    return await prisma.faculty.findUnique({
      where: { id }
    });
  }

  public async addFaculty(facultyData: FacultyData) {
    const faculty = await prisma.faculty.findUnique({
      where: { id: facultyData.id }
    });
    if (faculty)
      throw new BadRequestError(DomainCode.FACULTY_ALREADY_EXISTS, 'Faculty already exists');

    return await prisma.faculty.create({
      data: facultyData
    });
  }

  public async removeFaculty(id: string) {
    return await prisma.faculty.delete({
      where: { id }
    });
  }

  public async updateFaculty(id: string, facultyData: Partial<FacultyData>) {
    const faculty = await prisma.faculty.findUnique({
      where: { id }
    });

    if (!faculty)
      throw new BadRequestError(DomainCode.FACULTY_NOT_FOUND, 'Faculty not found');

    return await prisma.faculty.update({
      where: { id },
      data: facultyData
    });
  }
}