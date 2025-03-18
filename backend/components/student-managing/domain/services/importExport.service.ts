export interface ImportExportService {
    importData(data: string): any;
    exportAllStudentsData(): string;
    exportStudentDataById(id: string): string;
}