import { ImportExportStrategy } from '../importExport.strategy';
import g_StudentManger from "../../../storage/studentManager";
import { Student } from '../../management/Student';

export class JSONStrategy implements ImportExportStrategy {
    importData(data: string): any {
        const students : Student[] = JSON.parse(data);
        
        for (let student of students) {
            g_StudentManger.add(student);
        }

        return students;
    }

    exportData(data: any): string {
        return JSON.stringify(data, null, 2);
    }
}
