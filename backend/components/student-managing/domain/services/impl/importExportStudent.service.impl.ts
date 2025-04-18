import { ImportExportService } from '../importExport.service';
import ImportExportStrategyFactory from '../../import-export/impl/format.strategy.factory';
import StudentManagementService, { StudentQuery, StudentData } from '../studentManagement.service';
import { Student } from '../../management/Student';
import { ParserType } from '../../import-export/impl/xml.strategy';

export class ImportExportServiceImpl implements ImportExportService {

    importStudentsData(data: string, format: string): any {
        const students = ImportExportStrategyFactory.getStrategy(format).parseData(data);
        for (const studentData of students) {
            const student = new Student(
                studentData.id,
                studentData.name,
                studentData.dob,
                studentData.gender,
                studentData.faculty,
                studentData.academicYear,
                studentData.program,
                studentData.permanentAddress,
                studentData.temporaryAddress,
                studentData.email,
                studentData.phone,
                studentData.status,
                studentData.identityDocument,
                studentData.nationality
            );
            StudentManagementService.addStudent(student as StudentData);
        }
        return students;
    }

    exportStudentsData(format: string, studentQuery: StudentQuery): string {
        const students = StudentManagementService.getStudents(studentQuery);
        return ImportExportStrategyFactory.getStrategy(format).stringifyData(students, ParserType.STUDENT);
    }

    exportStudentDataById(id: string, format: string): string {
        const student = StudentManagementService.getStudentById(id)?.toJSON() || {};

        return ImportExportStrategyFactory.getStrategy(format).stringifyData(student, ParserType.STUDENT);
    }
}

const importExportService = new ImportExportServiceImpl();
export default importExportService;