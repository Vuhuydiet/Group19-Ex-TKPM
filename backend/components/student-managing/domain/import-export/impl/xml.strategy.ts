import { ImportExportStrategy } from '../importExport.strategy';

export class XMLStrategy implements ImportExportStrategy {
    importData(data: string): any {
        const parser = new DOMParser();
        return parser.parseFromString(data, "application/xml");
    }

    exportData(data: Document): string {
        const serializer = new XMLSerializer();
        return serializer.serializeToString(data);
    }
}

