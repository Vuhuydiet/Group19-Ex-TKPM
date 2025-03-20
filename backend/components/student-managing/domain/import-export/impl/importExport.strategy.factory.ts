import { DomainCode } from "../../../../../core/responses/DomainCode";
import { NotFoundError } from "../../../../../core/responses/ErrorResponse";
import { ImportExportStrategy } from "../importExport.strategy";
import {JSONStrategy} from "./json.strategy";
import {XMLStrategy} from "./xml.strategy";

export const enum ImportExportType {
    JSON = 'JSON',
    XML = 'XML'
}

export default class ImportExportStrategyFactory {
    private static strategies: Map<ImportExportType, ImportExportStrategy> = new Map<ImportExportType, ImportExportStrategy>([
        [ImportExportType.JSON, new JSONStrategy()],
        [ImportExportType.XML, new XMLStrategy()]
    ]);

    static getStrategy(type: ImportExportType): ImportExportStrategy {
        const strategy = this.strategies.get(type);
        if (!strategy) {
            throw new NotFoundError(DomainCode.IMPORT_EXPORT_TYPE_NOT_FOUND, `Import/Export type ${type} not found`);
        }
        
        return strategy;
    }
}
