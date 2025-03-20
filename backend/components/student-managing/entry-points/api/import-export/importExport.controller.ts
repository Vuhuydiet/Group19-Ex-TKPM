import { OKResponse } from "../../../../../core/responses/SuccessResponse";
import {Request, Response} from 'express';
import importExportService from "../../../domain/services/impl/importExport.service.impl";
import { ImportExportType } from "../../../domain/import-export/impl/importExport.strategy.factory";

export class ImportExportController {

    importStudents(req: Request, res: Response): void {
        const type = req.params.type.toUpperCase() as ImportExportType;
        const importedData = req.body.students;
        importExportService.importData(importedData, type);
        new OKResponse({
                message: 'Students imported successfully'
            }).send(res);    
    }
    
    exportStudents(req: Request, res: Response): void {
        const type = req.params.type.toUpperCase() as ImportExportType;
        const exportedData = importExportService.exportAllStudentsData(type);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=students.json');
        res.send(exportedData);
    }
}

const g_ImportExportController = new ImportExportController();
export default g_ImportExportController;