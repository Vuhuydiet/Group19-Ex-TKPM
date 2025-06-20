import { Request, Response } from "express";
import StudyStatusService, { StudyStatusData } from "../../../domain/services/studyStatus.service";
import { CreatedResponse, OKResponse } from "../../../../../core/responses/SuccessResponse";
import { matchedData } from "express-validator";


class StudyStatusController {

  async getStudyStatuses(_req: Request, res: Response) {
    const statuses = await StudyStatusService.getStudyStatuses();

    new OKResponse({
      message: 'Study statuses found',
      metadata: { statuses }
    }).send(res);
  }

  async addStudyStatus(req: Request, res: Response) {
    const studyStatusData = matchedData(req) as StudyStatusData;
    const studyStatus = await StudyStatusService.addStudyStatus(studyStatusData);

    new CreatedResponse({
      message: 'Study status added successfully',
      metadata: { studyStatus }
    }).send(res);
  }

  async updateStudyStatus(req: Request, res: Response) {
    const { id } = req.params;
    const studyStatusData = matchedData(req) as Partial<StudyStatusData>;
    
    const studyStatus = await StudyStatusService.updateStudyStatus(id, studyStatusData);
    
    new OKResponse({
      message: 'Study status updated successfully',
      metadata: { studyStatus }
    }).send(res);
  }

  async removeStudyStatus(req: Request, res: Response) {
    const { id } = req.params;
    await StudyStatusService.removeStudyStatus(id);
    new OKResponse({
      message: 'Study status removed successfully'
    }).send(res);
  }

  async addValidStudyStatusTransition(req: Request, res: Response) {
    const { from, to } = matchedData(req);
    const transition = await StudyStatusService.addValidStudyStatusTransition(from, to);
    new CreatedResponse({
      message: 'Valid study status transition added successfully',
      metadata: { transition }
    }).send(res);
  }

  async removeValidStudyStatusTransition(req: Request, res: Response) {
    const { from, to } = matchedData(req);
    const transition = await StudyStatusService.removeValidStudyStatusTransition(from, to);
    new OKResponse({
      message: 'Valid study status transition removed successfully',
      metadata: { transition }
    }).send(res);
  }

}

export default new StudyStatusController();