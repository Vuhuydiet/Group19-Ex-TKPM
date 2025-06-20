import { OKResponse } from "../../../../../core/responses/SuccessResponse";
import { Request, Response } from 'express';
import ImportExportService from "../../../domain/services/importExport.service";

export class ImportExportController {
	constructor(private readonly importExportService: ImportExportService = new ImportExportService()) {}

	async importStudents(req: Request, res: Response): Promise<void> {
		const type = req.params.type;
		const importedData = req.body.students;
		await this.importExportService.importStudentsData(importedData, type);
		new OKResponse({
			message: 'Students imported successfully'
		}).send(res);
	}

	async exportStudents(req: Request, res: Response): Promise<void> {
		const type = req.params.type;
		const query = req.query;
		const exportedData = await this.importExportService.exportStudentsData(type, query);
		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Content-Disposition', 'attachment; filename=students.json');
		res.send(exportedData);
	}
}

const importExportController = new ImportExportController();
export default importExportController;