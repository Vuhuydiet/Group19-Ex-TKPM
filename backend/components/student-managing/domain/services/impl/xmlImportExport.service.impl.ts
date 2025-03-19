import { ImportExportService } from '../importExport.service';
import { ImportExportStrategy } from '../../import-export/importExport.strategy';
import { XMLStrategy } from '../../import-export/impl/xml.strategy';
import g_StudentManger from "../../../storage/studentManager";

export class XMLImportExportService implements ImportExportService {
    private xmlStrategy: ImportExportStrategy;

    constructor() {
        this.xmlStrategy = new XMLStrategy();
    }

    importData(data: string): any {
        return this.xmlStrategy.importData(data);
    }

    exportAllStudentsData(): string {
        const students = g_StudentManger.students;
        return this.xmlStrategy.exportData(students);
    }

    exportStudentDataById(id: string): string {
        const student = g_StudentManger.getStudents((student) => {
            return student.id == id;
        });

        if (student.length == 0) {
            return "";
        }

        return this.xmlStrategy.exportData(student[0]);
    }
}

const xmlImportExportService = new XMLImportExportService();
export default xmlImportExportService;