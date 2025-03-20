import jsonStrategy from '../impl/json.strategy';
import { ImportExportStrategy } from '../importExport.strategy';

export class ImportExportContext {
    private strategy: ImportExportStrategy;

    constructor(strategy?: ImportExportStrategy) {
        this.strategy = strategy == null ? jsonStrategy : strategy;
    }

    public setStrategy(strategy: ImportExportStrategy) {
        this.strategy = strategy;
    }

    public parseData(data: string): any {
        return this.strategy.parseData(data);
    }

    public stringifyData(data: any): string {
        return this.strategy.stringifyData(data);
    }
}

const importExportContext = new ImportExportContext();
export default importExportContext;
