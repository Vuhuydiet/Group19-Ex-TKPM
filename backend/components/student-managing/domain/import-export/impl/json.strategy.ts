import { ImportExportStrategy } from '../importExport.strategy';

export class JSONStrategy implements ImportExportStrategy {
    importData(data: string): any {
        return JSON.parse(data);
    }

    exportData(data: any): string {
        return JSON.stringify(data, null, 2);
    }
}
