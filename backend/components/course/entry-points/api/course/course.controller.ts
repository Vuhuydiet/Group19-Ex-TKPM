import { Request, Response } from 'express';
import { CourseService, CourseData } from '../../../domain/services/course.service';
import { OKResponse } from '../../../../../core/responses/SuccessResponse';
import { NotFoundError } from '../../../../../core/responses/ErrorResponse';
import { DomainCode } from '../../../../../core/responses/DomainCode';

export class CourseController {
  async create(req: Request, res: Response) {
    const data: CourseData = req.body;
    const course = await CourseService.create(data);
    new OKResponse({ message: 'Course created', metadata: course }).send(res);
  }

  async findAll(req: Request, res: Response) {
    const courses = await CourseService.findAll(req.query);
    new OKResponse({ message: 'Courses found', metadata: courses }).send(res);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const course = await CourseService.findById(id);
    if (!course)
      throw new NotFoundError(DomainCode.UNKNOWN_ERROR, 'Course not found');
    new OKResponse({ message: 'Course found', metadata: course }).send(res);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const course = await CourseService.update(id, req.body);
    new OKResponse({ message: 'Course updated', metadata: course }).send(res);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const result = await CourseService.delete(id);
    new OKResponse({ message: 'Course deleted', metadata: result }).send(res);
  }
}

export default new CourseController();
