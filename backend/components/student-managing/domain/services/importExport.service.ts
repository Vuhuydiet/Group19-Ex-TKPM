import { ImportExportType } from "../import-export/impl/importExport.strategy.factory";

export interface ImportExportService {
    importData(data: string, type: ImportExportType): any;
    exportAllStudentsData(type: ImportExportType): string;
    exportStudentDataById(id: string, type: ImportExportType): string;
}