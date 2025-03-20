import { ImportExportService } from '../importExport.service';
import ImportExportStrategyFactory from '../../import-export/impl/format.strategy.factory';
import StudentManagementService, { StudentQuery } from '../studentManagement.service';
import { Student } from '../../management/Student';

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
                studentData.address,
                studentData.email,
                studentData.phone,
                studentData.status
            );
            StudentManagementService.addStudent(student);
        }
        return students;
    }

    exportStudentsData(format: string, studentQuery: StudentQuery): string {
        const students = StudentManagementService.getStudents(studentQuery);
        return ImportExportStrategyFactory.getStrategy(format).stringifyData(students);
    }

    exportStudentDataById(id: string, format: string): string {
        const student = StudentManagementService.getStudentById(id)?.toJSON() || {};

        return ImportExportStrategyFactory.getStrategy(format).stringifyData(student);
    }
}

const importExportService = new ImportExportServiceImpl();
export default importExportService;