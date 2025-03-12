import {StudentManager} from "../../domain/studentManager";
import {Student} from "../../domain/student";
import { StudentManagementMapper } from "./studentManagement.mapper";
import { Request} from "express";

export class StudentManagerController {

    private studentManager: StudentManager;
    private studentManagementMapper: StudentManagementMapper;
    
    constructor() {
        this.studentManager = new StudentManager();
        this.studentManagementMapper = new StudentManagementMapper();
    }
    
    addStudent(req: Request): void {
        const student = this.studentManagementMapper.toStudent(req);
        this.studentManager.add(student);
    }
    
    removeStudent(id: string): void {
        this.studentManager.remove(id);
    }
    
    getStudents(): Student[] {
        return this.studentManager.students;
    }
    
    getStudentById(id: string): Student | undefined {
        return this.studentManager.getStudentById(id);
    }
    
    getStudentsByName(name: string): Student[] {
        return this.studentManager.getStudentsByName(name);
    }
    
    updateStudent(id: string, req: Request): void {
        const studentInfo: Partial<Student> = req.body;
        this.studentManager.update(id, studentInfo);
    }

}