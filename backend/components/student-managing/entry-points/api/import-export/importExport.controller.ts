import { OKResponse } from "../../../../../core/responses/SuccessResponse";
import ImportExportServiceFactory, { ImportExportType } from "../../../domain/services/impl/importExport.service.factory";
import {Request, Response} from 'express';

export class ImportExportController {
    
    importStudents(req: Request, res: Response): void {
        const type = req.params.type.toUpperCase() as ImportExportType;
        const importedData = req.body.students;
        ImportExportServiceFactory.getService(type).importData(importedData);
        new OKResponse({
                message: 'Students imported successfully'
            }).send(res);    
    }
    
    exportStudents(req: Request, res: Response): void {
        const type = req.params.type.toUpperCase() as ImportExportType;
        const exportedData = ImportExportServiceFactory.getService(type).exportAllStudentsData();
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=students.json');
        res.send(exportedData);
    }
}

const g_ImportExportController = new ImportExportController();
export default g_ImportExportController;