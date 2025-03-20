import { ImportExportService } from '../importExport.service';
import g_StudentManger from "../../../storage/studentManager";
import ImportExportStrategyFactory, { ImportExportType } from '../../import-export/impl/importExport.strategy.factory';

export class ImportExportServiceImpl implements ImportExportService {

    importData(data: string, type: ImportExportType): any {
        const students = ImportExportStrategyFactory.getStrategy(type).parseData(data);
        for (const student of students) {
            g_StudentManger.add(student);
        }
        return students;
    }

    exportAllStudentsData(type: ImportExportType): string {
        const students = g_StudentManger.students;
        return ImportExportStrategyFactory.getStrategy(type).stringifyData(students);
    }

    exportStudentDataById(id: string, type: ImportExportType): string {
        const student = g_StudentManger.getStudents((student) => {
            return student.id == id;
        });

        if (student.length == 0) {
            return "";
        }

        return ImportExportStrategyFactory.getStrategy(type).stringifyData(student[0]);
    }
}

const importExportService = new ImportExportServiceImpl();
export default importExportService;