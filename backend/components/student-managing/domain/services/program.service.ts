import prisma from '../../../../models';

export type ProgramData = {
  id: string;
  name: string;
  description: string;
};

export default class ProgramService {
  async getAllPrograms() {
    return await prisma.program.findMany();
  }

  async getProgramById(id: string) {
    return await prisma.program.findUnique({ where: { id } });
  }

  async createProgram(data: ProgramData) {
    return await prisma.program.create({ data });
  }

  async updateProgram(id: string, data: Partial<ProgramData>) {
    return await prisma.program.update({ where: { id }, data });
  }

  async deleteProgram(id: string) {
    return await prisma.program.delete({ where: { id } });
  }
}
