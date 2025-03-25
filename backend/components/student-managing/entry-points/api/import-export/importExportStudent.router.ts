import g_ImportExportController from "./importExportStudent.controller";
import express, { Request, Response } from "express";
const router = express.Router();

router.post('/:type', (req: Request, res: Response) => {
    g_ImportExportController.importStudents(req, res);
});

router.get('/:type', (req: Request, res: Response) => {
    g_ImportExportController.exportStudents(req, res);
});

export default router;