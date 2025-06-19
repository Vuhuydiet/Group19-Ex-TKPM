import { Request, Response } from 'express';
import { ProgramService } from '../../../domain/services/program.service';

const programService = new ProgramService();

export const getAllPrograms = async (req: Request, res: Response) => {
  const programs = await programService.getAllPrograms();
  res.json(programs);
};

export const getProgramById = async (req: Request, res: Response) => {
  const program = await programService.getProgramById(req.params.id);
  if (!program) return res.status(404).json({ message: 'Program not found' });
  res.json(program);
};

export const createProgram = async (req: Request, res: Response) => {
  const { id, name, description } = req.body;
  const program = await programService.createProgram({ id, name, description });
  res.status(201).json(program);
};

export const updateProgram = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const program = await programService.updateProgram(req.params.id, { name, description });
  if (!program) return res.status(404).json({ message: 'Program not found' });
  res.json(program);
};

export const deleteProgram = async (req: Request, res: Response) => {
  const program = await programService.deleteProgram(req.params.id);
  if (!program) return res.status(404).json({ message: 'Program not found' });
  res.json({ message: 'Program deleted' });
};
