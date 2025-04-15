import { Request, Response } from 'express';
import { ClassCancelHistoryService, ClassCancelHistoryData } from '../../../domain/services/class-cancel-history.service';
import { OKResponse } from '../../../../../core/responses/SuccessResponse';
import { DomainCode } from '../../../../../core/responses/DomainCode';
import { NotFoundError } from '../../../../../core/responses/ErrorResponse';

export class ClassCancelHistoryController {
  async create(req: Request, res: Response) {
    const data: ClassCancelHistoryData = req.body;
    const result = await ClassCancelHistoryService.create(data);
    new OKResponse({ message: 'Class cancel history created', metadata: result }).send(res);
  }

  async findAll(_req: Request, res: Response) {
    const result = await ClassCancelHistoryService.findAll();
    new OKResponse({ message: 'Class cancel histories found', metadata: result }).send(res);
  }

  async findById(req: Request, res: Response) {
    const { studentId, classId, canceledAt } = req.params;
    const result = await ClassCancelHistoryService.findById(studentId, classId, new Date(canceledAt));
    if (!result)
      throw new NotFoundError(DomainCode.UNKNOWN_ERROR, 'Class cancel history not found');
    new OKResponse({ message: 'Class cancel history found', metadata: result }).send(res);
  }

  async update(req: Request, res: Response) {
    const { studentId, classId, canceledAt } = req.params;
    const result = await ClassCancelHistoryService.update(studentId, classId, new Date(canceledAt), req.body);
    new OKResponse({ message: 'Class cancel history updated', metadata: result }).send(res);
  }

  async delete(req: Request, res: Response) {
    const { studentId, classId, canceledAt } = req.params;
    const result = await ClassCancelHistoryService.delete(studentId, classId, new Date(canceledAt));
    new OKResponse({ message: 'Class cancel history deleted', metadata: result }).send(res);
  }
}

export default new ClassCancelHistoryController();
