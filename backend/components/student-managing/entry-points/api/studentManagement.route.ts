import {StudentManagerController} from "./studentManagement.controller";
import express, { Request, Response } from "express";
import { checkStudentNamePattern, checkEmailPattern, checkPhoneNumberPattern } from "./studentManagement.middleware";
const router = express.Router();

const controller = new StudentManagerController();


// router.post('/', checkStudentNamePattern, checkEmailPattern, checkPhoneNumberPattern, (req: Request, res: Response) => {
router.post('/', (req: Request, res: Response) => {

    controller.addStudent(req);
    res.json({ message: 'Student added successfully' });
});

router.delete('/:id', (req: Request, res: Response) => {
    controller.removeStudent(req.params.id);
    res.json({ message: 'Student removed successfully' });
});

router.get('/', (_, res: Response) => {
    res.json(controller.getStudents());
});

router.get('/id/:id', (req: Request, res: Response) => {
    const student = controller.getStudentById(req.params.id);
    if (!student) {
        res.status(404).json({ message: 'Student not found' });
        return;
    }
    res.json(student);
});

router.get('/name', (req: Request, res: Response) => {
    const students = controller.getStudentsByName(req.query.name as string);
    res.json(students);
});

router.patch('/:id', checkStudentNamePattern, checkEmailPattern, checkPhoneNumberPattern, (req: Request, res: Response) => {
    controller.updateStudent(req.params.id, req);
    res.json({ message: 'Student updated successfully' });
});


export default router;