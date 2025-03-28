import {Student} from "../../../domain/management/Student";
import { StudentManagementMapper } from "./studentManagement.mapper";
import { Request, Response} from "express";
import StudentManagementService from "../../../domain/services/studentManagement.service";
import StudentQuery from "../../../domain/services/studentManagement.service";
import { CreatedResponse, OKResponse } from "../../../../../core/responses/SuccessResponse"

export class StudentManagerController {

    private studentManagementMapper: StudentManagementMapper;
    
    constructor() {
        this.studentManagementMapper = new StudentManagementMapper();
    }
    
    async addStudent(req: Request, res: Response): Promise<void> {
        const studentData = this.studentManagementMapper.toStudent(req);

        const student = await StudentManagementService.addStudent(studentData);
        new CreatedResponse({
            message: 'Student added successfully',
            metadata: student
        }).send(res);
    }
    
    removeStudent(req: Request, res: Response): void {
        const studentId = req.params.id;
        StudentManagementService.removeStudent(studentId);
        new OKResponse({
            message: 'Student removed successfully'
        }).send(res);
    }
    
    getStudents(req: Request, res: Response): void {
        const query: StudentQuery = req.body;
        const students = StudentManagementService.getStudents(query);
        new OKResponse({
            metadata: students
        }).send(res);
    }
    
    getStudentById(req: Request, res: Response): void {
        const studentId = req.params.id;
        const student = StudentManagementService.getStudentById(studentId);

        new OKResponse({
            message: "Student found",
            metadata: student
        }).send(res);
    }
    
    getStudentsByName(req: Request, res: Response): void {
        const studentName = req.query.name as string;
        const students = StudentManagementService.getStudents({name: studentName});
        
        new OKResponse({
            message: "Students found",
            metadata: students
        }).send(res);
    }
    
    updateStudent(req: Request, res: Response): void {
        const studentInfo: Partial<Student> = req.body;
        const studentId = req.params.id;
        StudentManagementService.updateStudent(studentId, studentInfo);
        
        const student = StudentManagementService.getStudentById(studentId);
        new OKResponse({
            message: 'Student updated successfully',
            metadata: student
        }).send(res);
    }
}

const g_StudentManagerController = new StudentManagerController();

export default g_StudentManagerController;