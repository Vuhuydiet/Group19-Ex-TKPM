import g_StudentMangerController from "./studentManagement.controller";
import express, { Request, Response } from "express";
import { checkEmailPattern, checkPhoneNumberPattern } from "./studentManagement.middleware";
const router = express.Router();

router.post('/', checkEmailPattern, checkPhoneNumberPattern, (req: Request, res: Response) => {
    g_StudentMangerController.addStudent(req, res);
});

router.delete('/:id', (req: Request, res: Response) => {
    g_StudentMangerController.removeStudent(req, res);
});

router.get('/', (req: Request, res: Response) => {
    g_StudentMangerController.getStudents(req, res);
});

router.get('/id/:id', (req: Request, res: Response) => {
    g_StudentMangerController.getStudentById(req, res);
});

router.get('/name', (req: Request, res: Response) => {
    g_StudentMangerController.getStudentsByName(req, res);
});

router.patch('/:id', checkEmailPattern, checkPhoneNumberPattern, (req: Request, res: Response) => {
    g_StudentMangerController.updateStudent(req, res);
});


export default router;