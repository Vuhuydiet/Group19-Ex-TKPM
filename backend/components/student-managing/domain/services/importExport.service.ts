import { StudentQuery } from "./studentManagement.service";

export interface ImportExportService {
    importStudentsData(data: string, type: string): any;
    exportStudentsData(type: string, studentQuery: StudentQuery): string;
    exportStudentDataById(id: string, type: string): string;
}