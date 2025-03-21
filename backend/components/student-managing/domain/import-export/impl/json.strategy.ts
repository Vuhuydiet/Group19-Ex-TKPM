import { ImportExportStrategy } from '../format.strategy';
import { Student } from '../../management/Student';

export class JSONStrategy implements ImportExportStrategy {
    parseData(data: string): Student[] {
        const students : Student[] = JSON.parse(data);
        return students;
    }

    stringifyData(data: any): string {
        return JSON.stringify(data);
    }
}