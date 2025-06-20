import { OKResponse } from "../../../../../core/responses/SuccessResponse";
import { Request, Response } from 'express';
import importExportService from "../../../domain/services/impl/importExportStudent.service.impl";

export class ImportExportController {

    async importStudents(req: Request, res: Response): Promise<void> {
        const type = req.params.type;
        const importedData = req.body.students;
        try {
            await importExportService.importStudentsData(importedData, type);
            new OKResponse({
                message: 'Students imported successfully'
            }).send(res);
        } catch (error: any) {
            res.status(error.statusCode || 500).json({
                message: error.message || 'Internalll server error',
                domainCode: error.domainCode,
            });
        }
    }

    async exportStudents(req: Request, res: Response): Promise<void> {
        const type = req.params.type;
        const query = req.query;
        const exportedData = await importExportService.exportStudentsData(type, query);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', 'attachment; filename=students.json');
        res.send(exportedData);
    }
}

const g_ImportExportController = new ImportExportController();
export default g_ImportExportController;