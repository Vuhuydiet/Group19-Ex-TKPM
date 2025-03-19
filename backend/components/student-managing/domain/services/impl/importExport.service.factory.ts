import jsonImportExportService from './jsonImportExport.service.impl';
import xmlImportExportService from './xmlImportExport.service.impl';
import {NotFoundError} from '../../../../../core/responses/ErrorResponse';
import { DomainCode } from '../../../../../core/responses/DomainCode';

export const enum ImportExportType {
    JSON = 'JSON',
    XML = 'XML'
}

export default class ImportExportServiceFactory {
    static getService(type: ImportExportType) {
        switch (type) {
            case ImportExportType.JSON:
                return jsonImportExportService;
            case ImportExportType.XML:
                return xmlImportExportService;
            default:
                throw new NotFoundError(DomainCode.IMPORT_EXPORT_TYPE_NOT_FOUND, `Import/Export type ${type} not found`);
        }
    }
}