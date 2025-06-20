import { StudentQuery } from "./studentManagement.service";

export interface ImportExportService {
    importStudentsData(data: string, type: string): Promise<any>;
    exportStudentsData(type: string, studentQuery: StudentQuery): Promise<string>;
    exportStudentDataById(id: string, type: string): Promise<string>;
}