import { Request, Response } from 'express';
import { ClassService, ClassData } from '../../../domain/services/class.service';
import { OKResponse } from '../../../../../core/responses/SuccessResponse';

export class ClassController {
  async create(req: Request, res: Response) {
    const data: ClassData = req.body;
    const result = await ClassService.create(data);
    new OKResponse({ message: 'Class created', metadata: result }).send(res);
  }

  async findAll(_req: Request, res: Response) {
    const result = await ClassService.findAll();
    new OKResponse({ message: 'Classes found', metadata: result }).send(res);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await ClassService.findById(id);
    if (!result) {
      new OKResponse({ message: 'Class not found', metadata: null }).send(res);
      return;
    }
    new OKResponse({ message: 'Class found', metadata: result }).send(res);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const result = await ClassService.update(id, req.body);
    new OKResponse({ message: 'Class updated', metadata: result }).send(res);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await ClassService.delete(id);
    new OKResponse({ message: 'Class deleted', metadata: result }).send(res);
  }
}

export default new ClassController();
