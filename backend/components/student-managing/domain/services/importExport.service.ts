import ImportExportStrategyFactory from '../import-export/impl/format.strategy.factory';
import StudentManagementService, { StudentQuery } from './studentManagement.service';
import { ParserType } from '../import-export/impl/xml.strategy';
import prisma from '../../../../models';

export default class ImportExportService {
    private readonly studentManagementService = new StudentManagementService();

    async importStudentsData(data: string, format: string): Promise<any> {
        const students = ImportExportStrategyFactory.getStrategy(format).parseData(data);
        for (const studentData of students) {
            if (!studentData.programId) {
                throw new Error(`Missing programId for student with id: ${studentData.id}`);
            }
            // Fetch program by programId
            const program = await prisma.program.findUnique({ where: { id: studentData.programId } });
            if (!program) throw new Error(`Program not found for id: ${studentData.programId}`);
            // Fetch faculty and status if needed (optional, for strictness)
            // const faculty = await prisma.faculty.findUnique({ where: { id: studentData.faculty } });
            // const status = await prisma.studyStatus.findUnique({ where: { id: studentData.status } });

            await this.studentManagementService.addStudent({
                ...studentData,
                program: studentData.programId // pass programId to service
            });
        }
        return students;
    }

    async exportStudentsData(format: string, studentQuery: StudentQuery): Promise<string> {
        const students = await this.studentManagementService.getStudents(studentQuery);
        // Map students to export format (programId only)
        const exportData = students.map((student: any) => ({
            ...student,
            programId: typeof student.program === 'string' ? student.program : student.program?.id
        }));
        return ImportExportStrategyFactory.getStrategy(format).stringifyData(exportData, ParserType.STUDENT);
    }

    async exportStudentDataById(id: string, format: string): Promise<string> {
        const student = await this.studentManagementService.getStudentById(id);
        const exportData = student ? { ...student, programId: typeof student.program === 'string' ? student.program : student.program?.id } : {};
        return ImportExportStrategyFactory.getStrategy(format).stringifyData(exportData, ParserType.STUDENT);
    }
}