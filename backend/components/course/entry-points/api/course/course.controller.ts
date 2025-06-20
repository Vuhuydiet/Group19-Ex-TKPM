import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { CourseService, CourseData } from '../../../domain/services/course.service';
import { OKResponse } from '../../../../../core/responses/SuccessResponse';
import { NotFoundError } from '../../../../../core/responses/ErrorResponse';
import { DomainCode } from '../../../../../core/responses/DomainCode';

export class CourseController {
  constructor(private readonly courseService = new CourseService()) {}

  async create(req: Request, res: Response) {
    const data: CourseData = matchedData(req);
    const course = await this.courseService.create(data);
    new OKResponse({ message: 'Course created', metadata: course }).send(res);
  }

  async findAll(req: Request, res: Response) {
    const query = matchedData(req, { locations: ['query'] });
    const courses = await this.courseService.findAll(query);
    new OKResponse({ message: 'Courses found', metadata: courses }).send(res);
  }

  async findById(req: Request, res: Response) {
    const { id } = matchedData(req);
    const course = await this.courseService.findById(id);
    if (!course)
      throw new NotFoundError(DomainCode.UNKNOWN_ERROR, 'Course not found');
    new OKResponse({ message: 'Course found', metadata: course }).send(res);
  }

  async update(req: Request, res: Response) {
    const { id, ...body } = matchedData(req);
    const course = await this.courseService.update(id, body);
    new OKResponse({ message: 'Course updated', metadata: course }).send(res);
  }

  async delete(req: Request, res: Response) {
    const { id } = matchedData(req);
    const result = await this.courseService.delete(id);
    new OKResponse({ message: 'Course deleted', metadata: result }).send(res);
  }
}

export default new CourseController();
