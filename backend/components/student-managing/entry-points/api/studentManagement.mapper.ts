import { Student } from "../../domain/management/Student";
import { Request} from "express";

export class StudentManagementMapper {
    public toStudent(request: Request): Student {
        const { id, name, dob, gender, faculty, accademicYear, program, address, email, phone, status } = request.body;
        const student = new Student(
            id,
            name,
            dob,
            gender,
            faculty,
            accademicYear,
            program,
            address,
            email,
            phone,
            status
        );
        return student;
    }
}
