import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { CourseEnrollmentService, EnrollmentRecordData } from '../../../domain/services/course-enrollment.service';
import { OKResponse } from '../../../../../core/responses/SuccessResponse';
import { NotFoundError } from '../../../../../core/responses/ErrorResponse';
import { DomainCode } from '../../../../../core/responses/DomainCode';

export class CourseEnrollmentController {
  constructor(private readonly courseEnrollmentService = new CourseEnrollmentService()) {}

  async create(req: Request, res: Response) {
    const data: EnrollmentRecordData = matchedData(req);
    const result = await this.courseEnrollmentService.create(data);
    new OKResponse({ message: 'Enrollment record created', metadata: result }).send(res);
  }

  async findAll(req: Request, res: Response) {
    const query = matchedData(req, { locations: ['query'] });
    const result = await this.courseEnrollmentService.findAll(query);
    new OKResponse({ message: 'Enrollment records found', metadata: result }).send(res);
  }

  async findById(req: Request, res: Response) {
    const { studentId, classId } = matchedData(req);
    const result = await this.courseEnrollmentService.findById(studentId, classId);
    if (!result) 
      throw new NotFoundError(DomainCode.UNKNOWN_ERROR, 'Enrollment record not found');
    new OKResponse({ message: 'Enrollment record found', metadata: result }).send(res);
  }

  async update(req: Request, res: Response) {
    const { studentId, classId, grade } = matchedData(req);
    const result = await this.courseEnrollmentService.update(studentId, classId, grade);
    new OKResponse({ message: 'Enrollment record updated', metadata: result }).send(res);
  }

  async cancelClass(req: Request, res: Response) {
    const { studentId, classId } = matchedData(req);
    const result = await this.courseEnrollmentService.delete(studentId, classId);
    new OKResponse({ message: 'Class canceled', metadata: result }).send(res);
  }

  async findAllCanceledHistory(req: Request, res: Response) {
    const query = matchedData(req, { locations: ['query'] });
    const result = await this.courseEnrollmentService.findAllCancelHistory(query);
    new OKResponse({ message: 'Class cancel histories found', metadata: result }).send(res);
  }
  
}

export default new CourseEnrollmentController();
