import {Student} from "../../../domain/management/Student";
import { StudentManagementMapper } from "./studentManagement.mapper";
import { Request, Response} from "express";
import StudentManagementService from "../../../domain/services/studentManagement.service";
import StudentQuery from "../../../domain/services/studentManagement.service";
import { CreatedResponse, OKResponse } from "../../../../../core/responses/SuccessResponse"

class StudentManagerController {

    private studentManagementMapper: StudentManagementMapper;
    
    constructor() {
        this.studentManagementMapper = new StudentManagementMapper();
    }
    
    async addStudent(req: Request, res: Response): Promise<void> {
        if (!this.studentManagementMapper)
            this.studentManagementMapper = new StudentManagementMapper();
        const studentData = this.studentManagementMapper.toStudent(req);

        const student = await StudentManagementService.addStudent(studentData);
        new CreatedResponse({
            message: 'Student added successfully',
            metadata: student
        }).send(res);
    }
    
    async removeStudent(req: Request, res: Response): Promise<void> {
        const studentId = req.params.id;
        await StudentManagementService.removeStudent(studentId);
        new OKResponse({
            message: 'Student removed successfully'
        }).send(res);
    }
    
    async getStudents(req: Request, res: Response): Promise<void> {
        const query: StudentQuery = req.body;
        const students = await StudentManagementService.getStudents(query);
        new OKResponse({
            metadata: students
        }).send(res);
    }
    
    async getStudentById(req: Request, res: Response): Promise<void> {
        const studentId = req.params.id;
        const student = await StudentManagementService.getStudentById(studentId);
        
        if (!student) {
            new OKResponse({
                message: "Student not found",
                metadata: null
            }).send(res);
            return;
        }

        new OKResponse({
            message: "Student found",
            metadata: student
        }).send(res);
    }
    
    async getStudentsByName(req: Request, res: Response): Promise<void> {
        const studentName = req.query.name as string;
        const students = await StudentManagementService.getStudents({name: studentName});
        
        new OKResponse({
            message: "Students found",
            metadata: students
        }).send(res);
    }
    
    async updateStudent(req: Request, res: Response): Promise<void> {
        const studentInfo: Partial<Student> = req.body;
        const studentId = req.params.id;
        await StudentManagementService.updateStudent(studentId, studentInfo);
        
        const student = await StudentManagementService.getStudentById(studentId);
        new OKResponse({
            message: 'Student updated successfully',
            metadata: student
        }).send(res);
    }
}

export default new StudentManagerController();