import prisma from "../../../../models";
import { BadRequestError } from "../../../../core/responses/ErrorResponse";
import { DomainCode } from "../../../../core/responses/DomainCode";

export type StudyStatusData = {
  id: string;
  name: string;
  description?: string;
};

export default class StudyStatusService {
  public static async getStudyStatuses() {
    return await prisma.studyStatus.findMany();
  }

  public static async getStudyStatusById(id: string) {
    return await prisma.studyStatus.findUnique({
      where: { id }
    });
  }

  public static async addStudyStatus(studyStatusData: StudyStatusData) {
    const studyStatus = await prisma.studyStatus.findUnique({
      where: { id: studyStatusData.id }
    });
    if (studyStatus)
      throw new BadRequestError(DomainCode.STUDY_STATUS_ALREADY_EXISTS, 'Study status already exists');

    return await prisma.studyStatus.create({
      data: studyStatusData
    });
  }

  public static async removeStudyStatus(id: string) {
    return await prisma.studyStatus.delete({
      where: { id }
    });
  }

  public static async updateStudyStatus(id: string, studyStatusData: Partial<StudyStatusData>) {
    const studyStatus = await prisma.studyStatus.findUnique({
      where: { id }
    });

    if (!studyStatus)
      throw new BadRequestError(DomainCode.STUDY_STATUS_NOT_FOUND, 'Study status not found');

    return await prisma.studyStatus.update({
      where: { id },
      data: studyStatusData
    });
  }

  public static async getValidStudyStatusTransitions() {
    return await prisma.validStudyStatusTransition.findMany();
  }

  public static async addValidStudyStatusTransition(from: string, to: string) {
    const transition = await prisma.validStudyStatusTransition.findUnique({
      where: { from_to: { from, to } }
    });
    if (transition)
      return transition;

    return await prisma.validStudyStatusTransition.create({
      data: { from, to }
    });
  }

  public static async removeValidStudyStatusTransition(from: string, to: string) {
    return await prisma.validStudyStatusTransition.delete({
      where: { from_to: { from, to } }
    });
  }
}