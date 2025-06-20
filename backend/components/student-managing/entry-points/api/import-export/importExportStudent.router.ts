import importExportController from "./importExportStudent.controller";
import express, { Request, Response } from "express";
const router = express.Router();

router.post('/:type', (req: Request, res: Response) => {
    importExportController.importStudents(req, res);
});

router.get('/:type', (req: Request, res: Response) => {
    importExportController.exportStudents(req, res);
});

export default router;