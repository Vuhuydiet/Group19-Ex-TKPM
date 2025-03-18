export interface ImportExportStrategy {
    importData(data: string): any;
    exportData(data: any): string;
}