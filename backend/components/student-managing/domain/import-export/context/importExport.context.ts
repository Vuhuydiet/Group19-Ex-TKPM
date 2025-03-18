import { ImportExportStrategy } from '../importExport.strategy';

export class ImportExportContext {
    private strategy: ImportExportStrategy;

    constructor(strategy: ImportExportStrategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy: ImportExportStrategy) {
        this.strategy = strategy;
    }

    importData(data: string): any {
        return this.strategy.importData(data);
    }

    exportData(data: any): string {
        return this.strategy.exportData(data);
    }
}

