import { Student } from "../../domain/student";
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
