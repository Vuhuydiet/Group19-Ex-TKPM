import { Request, Response } from 'express';
import { EnrollmentRecordService, EnrollmentRecordData } from '../../../domain/services/enrollment-record.service';
import { OKResponse } from '../../../../../core/responses/SuccessResponse';
import { NotFoundError } from '../../../../../core/responses/ErrorResponse';
import { DomainCode } from '../../../../../core/responses/DomainCode';

export class EnrollmentRecordController {
  async create(req: Request, res: Response) {
    const data: EnrollmentRecordData = req.body;
    const result = await EnrollmentRecordService.create(data);
    new OKResponse({ message: 'Enrollment record created', metadata: result }).send(res);
  }

  async findAll(_req: Request, res: Response) {
    const result = await EnrollmentRecordService.findAll();
    new OKResponse({ message: 'Enrollment records found', metadata: result }).send(res);
  }

  async findById(req: Request, res: Response) {
    const { studentId, classId } = req.params;
    const result = await EnrollmentRecordService.findById(studentId, classId);
    if (!result) 
      throw new NotFoundError(DomainCode.UNKNOWN_ERROR, 'Enrollment record not found');
    new OKResponse({ message: 'Enrollment record found', metadata: result }).send(res);
  }

  async update(req: Request, res: Response) {
    const { studentId, classId } = req.params;
    const result = await EnrollmentRecordService.update(studentId, classId, req.body);
    new OKResponse({ message: 'Enrollment record updated', metadata: result }).send(res);
  }

  async delete(req: Request, res: Response) {
    const { studentId, classId } = req.params;
    const result = await EnrollmentRecordService.delete(studentId, classId);
    new OKResponse({ message: 'Enrollment record deleted', metadata: result }).send(res);
  }
}

export default new EnrollmentRecordController();
