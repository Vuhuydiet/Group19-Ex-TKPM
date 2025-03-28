import { OKResponse } from "../../../../../core/responses/SuccessResponse";
import { Request, Response } from 'express';
import importExportService from "../../../domain/services/impl/importExportStudent.service.impl";

export class ImportExportController {

    importStudents(req: Request, res: Response): void {
        const type = req.params.type;
        const importedData = req.body.students;
        importExportService.importStudentsData(importedData, type);
        new OKResponse({
            message: 'Students imported successfully'
        }).send(res);
    }

    exportStudents(req: Request, res: Response): void {
        const type = req.params.type;
        const query = req.query;
        const exportedData = importExportService.exportStudentsData(type, query);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=students.json');
        res.send(exportedData);
    }
}

const g_ImportExportController = new ImportExportController();
export default g_ImportExportController;