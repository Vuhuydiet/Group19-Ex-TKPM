import { Request, Response } from 'express';
import FacultyService, { FacultyData } from '../../../domain/services/faculty.service';
import { OKResponse } from '../../../../../core/responses/SuccessResponse';
import { matchedData } from 'express-validator';


class FacultyController {

  public async getAllFaculties(_req: Request, res: Response): Promise<void> {
    const faculties = await FacultyService.getFaculties();
    
    new OKResponse({
      message: 'Faculties found',
      metadata: { faculties }
    }).send(res);
  }

  public async getFacultyById(req: Request, res: Response): Promise<void> {
    const { id } = matchedData(req);

    const faculty = await FacultyService.getFacultyById(id);
    new OKResponse({
      message: 'Faculty found',
      metadata: { faculty }
    }).send(res);
  }

  public async createFaculty(req: Request, res: Response): Promise<void> {
    const facultyData = matchedData(req) as FacultyData;
    const faculty = await FacultyService.addFaculty(facultyData);
    new OKResponse({
      message: 'Faculty added successfully',
      metadata: { faculty }
    }).send(res);
  }

  public async updateFaculty(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const facultyData = matchedData(req) as Partial<FacultyData>;
    const faculty = await FacultyService.updateFaculty(id, facultyData);
    new OKResponse({
      message: 'Faculty updated successfully',
      metadata: { faculty }
    }).send(res);
  }

  public async deleteFaculty(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await FacultyService.removeFaculty(id);
    new OKResponse({
      message: 'Faculty removed successfully'
    }).send(res);
  }

}

export default new FacultyController();