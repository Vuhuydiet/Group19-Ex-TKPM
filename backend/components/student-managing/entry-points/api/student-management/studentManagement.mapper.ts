import { Request} from "express";

export class StudentManagementMapper {
    public toStudent(request: Request) {
        const { id, name, dob, gender, faculty, academicYear, program, permanentAddress, temporaryAddress, email, phone, status, identityDocument, nationality } = request.body;

        const student = {
            id,
            name,
            dob,
            gender,
            faculty,
            academicYear,
            program,
            permanentAddress: {
                city: permanentAddress.city,
                district: permanentAddress.district,
                ward: permanentAddress.ward,
                street: permanentAddress.street,
            },
            temporaryAddress: {
                city: temporaryAddress.city,
                district: temporaryAddress.district,
                ward: temporaryAddress.ward,
                street: temporaryAddress.street,
            },
            email,
            phone,
            status,
            identityDocument,
            nationality
        };

        return student;
    }
}

