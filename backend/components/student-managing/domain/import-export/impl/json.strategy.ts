import { ImportExportStrategy } from '../importExport.strategy';
import { Student } from '../../management/Student';

export class JSONStrategy implements ImportExportStrategy {
    parseData(data: string): any {
        const students : Student[] = JSON.parse(data);

        return students;
    }

    stringifyData(data: any): string {
        return JSON.stringify(data, null, 2);
    }
}