import {StudentManager} from "../../domain/management/StudentManager";
import {Student} from "../../domain/management/Student";
import { StudentManagementMapper } from "./studentManagement.mapper";
import { Request} from "express";
import g_StudentManger from "../../storage/studentManager";

export class StudentManagerController {

    private studentManager: StudentManager;
    private studentManagementMapper: StudentManagementMapper;
    
    constructor() {
        this.studentManager = g_StudentManger;
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