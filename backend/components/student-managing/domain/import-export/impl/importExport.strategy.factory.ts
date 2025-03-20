import { DomainCode } from "../../../../../core/responses/DomainCode";
import { NotFoundError } from "../../../../../core/responses/ErrorResponse";
import importExportContext, { ImportExportContext } from "../context/importExport.context";
import jsonStrategy from "./json.strategy";
import xmlStrategy from "./xml.strategy";

export const enum ImportExportType {
    JSON = 'JSON',
    XML = 'XML'
}

export default class ImportExportStrategyFactory {

    static getStrategy(type: ImportExportType) : ImportExportContext {
        switch (type) {
            case ImportExportType.JSON: {
                importExportContext.setStrategy(jsonStrategy);
                return importExportContext;
            }
            case ImportExportType.XML: {
                importExportContext.setStrategy(xmlStrategy);
                return importExportContext;
            }
            default:
                throw new NotFoundError(DomainCode.IMPORT_EXPORT_TYPE_NOT_FOUND, `Import/Export type ${type} not found`);    
        }
        
    }
}