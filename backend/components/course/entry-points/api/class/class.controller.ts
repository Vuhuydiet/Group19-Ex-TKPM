import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { ClassService, ClassData, ClassQuery } from '../../../domain/services/class.service';
import { OKResponse } from '../../../../../core/responses/SuccessResponse';
import { NotFoundError } from '../../../../../core/responses/ErrorResponse';
import { DomainCode } from '../../../../../core/responses/DomainCode';

export class ClassController {
  async create(req: Request, res: Response) {
    const data: ClassData = matchedData(req);
    const result = await ClassService.create(data);
    new OKResponse({ message: 'Class created', metadata: result }).send(res);
  }

  async findAll(req: Request, res: Response) {
    const query = matchedData(req) as ClassQuery;
    const result = await ClassService.findAll(query);
    new OKResponse({ message: 'Classes found', metadata: result }).send(res);
  }

  async findById(req: Request, res: Response) {
    const { id } = matchedData(req);
    const result = await ClassService.findById(id);
    if (!result) {
      throw new NotFoundError(DomainCode.UNKNOWN_ERROR, 'Class not found');
    }
    new OKResponse({ message: 'Class found', metadata: result }).send(res);
  }

  async update(req: Request, res: Response) {
    const { id, ...body } = matchedData(req);
    const result = await ClassService.update(id, body);
    new OKResponse({ message: 'Class updated', metadata: result }).send(res);
  }

  async delete(req: Request, res: Response) {
    const { id } = matchedData(req);
    const result = await ClassService.delete(id);
    new OKResponse({ message: 'Class deleted', metadata: result }).send(res);
  }
}

export default new ClassController();
