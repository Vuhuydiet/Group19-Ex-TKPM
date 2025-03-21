import { Student } from "../../../domain/management/Student";
import { Request} from "express";

// export class StudentManagementMapper {
//     public toStudent(request: Request): Student {
//         const { id, name, dob, gender, faculty, accademicYear, program, address, email, phone, status } = request.body;
//         const student = new Student(
//             id,
//             name,
//             dob,
//             gender,
//             faculty,
//             accademicYear,
//             program,
//             address,
//             email,
//             phone,
//             status
//         );
//         return student;
//     }
// }

export class StudentManagementMapper {
    public toStudent(request: Request): Student {
        const { id, name, dob, gender, faculty, academicYear, program, permanentAddress, temporaryAddress, email, phone, status, identityDocument } = request.body;

        const student = new Student(
            id,
            name,
            dob,
            gender,
            faculty,
            academicYear,
            program,
            {
                city: permanentAddress.city,
                district: permanentAddress.district,
                ward: permanentAddress.ward,
                street: permanentAddress.street,
            },
            {
                city: temporaryAddress.city,
                district: temporaryAddress.district,
                ward: temporaryAddress.ward,
                street: temporaryAddress.street,
            },
            email,
            phone,
            status,
            identityDocument
        );

        return student;
    }
}

