import { ImportExportService } from '../importExport.service';
import { ImportExportStrategy } from '../../import-export/importExport.strategy';
import { JSONStrategy } from '../../import-export/impl/json.strategy';
import g_StudentManger from "../../../storage/studentManager";

export class JsonImportExportService implements ImportExportService {
    private jsonStrategy: ImportExportStrategy;

    constructor() {
        this.jsonStrategy = new JSONStrategy();
    }

    importData(data: string): any {
        return this.jsonStrategy.importData(data);
    }

    exportAllStudentsData(): string {
        const students = g_StudentManger.students;
        return this.jsonStrategy.exportData(students);
    }

    exportStudentDataById(id: string): string {
        const student = g_StudentManger.getStudents((student) => {
            return student.id == id;
        });

        if (student.length == 0) {
            return "";
        }

        return this.jsonStrategy.exportData(student[0]);
    }
}

const jsonImportExportService = new JsonImportExportService();
export default jsonImportExportService;