import prisma from '../../../../models';

export class ProgramService {
  async getAllPrograms() {
    return prisma.program.findMany();
  }

  async getProgramById(id: string) {
    return prisma.program.findUnique({ where: { id } });
  }

  async createProgram(data: { id: string; name: string; description: string }) {
    return prisma.program.create({ data });
  }

  async updateProgram(id: string, data: { name?: string; description?: string }) {
    return prisma.program.update({ where: { id }, data });
  }

  async deleteProgram(id: string) {
    return prisma.program.delete({ where: { id } });
  }
}
