import { Request, Response } from 'express';
import ProgramService, { ProgramData } from '../../../domain/services/program.service';
import { matchedData } from 'express-validator';
import { OKResponse } from '../../../../../core/responses/SuccessResponse';
import { NotFoundError } from '../../../../../core/responses/ErrorResponse';
import { DomainCode } from '../../../../../core/responses/DomainCode';

class ProgramController {
  constructor(private readonly programService: ProgramService = new ProgramService()) {}
  
  public async getAllPrograms(_req: Request, res: Response): Promise<void> {
    const programs = await this.programService.getAllPrograms();
    new OKResponse({
      message: 'Programs retrieved successfully',
      metadata: { programs }
    }).send(res);
  }

  public async getProgramById(req: Request, res: Response): Promise<void> {
    const { id } = matchedData(req);
    const program = await this.programService.getProgramById(id);
    if (!program) {
      throw new NotFoundError(DomainCode.NOT_FOUND, 'Program not found');
    }
    new OKResponse({
      message: 'Program retrieved successfully',
      metadata: { program }
    }).send(res);
  }

  public async createProgram(req: Request, res: Response): Promise<void> {
    const programData = matchedData(req) as ProgramData;
    const program = await this.programService.createProgram(programData);
    new OKResponse({
      message: 'Program created successfully',
      metadata: { program }
    }).send(res);
  }

  public async updateProgram(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const programData = matchedData(req);
    const program = await this.programService.updateProgram(id, programData);
    if (!program) {
      throw new NotFoundError(DomainCode.NOT_FOUND, 'Program not found');
    }
    new OKResponse({
      message: 'Program updated successfully',
      metadata: { program }
    }).send(res);
  }

  public async deleteProgram(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const program = await this.programService.deleteProgram(id);
    if (!program) {
      throw new NotFoundError(DomainCode.NOT_FOUND, 'Program not found');
    }
    new OKResponse({
      message: 'Program deleted successfully'
    }).send(res);
  }
}

export default new ProgramController();