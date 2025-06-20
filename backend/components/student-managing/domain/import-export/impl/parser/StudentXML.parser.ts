// import { Faculty, Gender, Student, StudyStatus } from "../../../management/Student";

export class StudentXMLParser {
    parse(jsonObj: any) {
        const students: any[] = [];
    
        if (jsonObj.students?.student) {
            const studentList = Array.isArray(jsonObj.students.student)
                ? jsonObj.students.student
                : [jsonObj.students.student];
    
            for (const studentObj of studentList) {

                const identityDocument = studentObj.identityDocument ? {
                    // 1. Chuyển ID thành String
                    id: studentObj.identityDocument.id !== undefined ? String(studentObj.identityDocument.id) : "",
                    type: studentObj.identityDocument.type || "",
                    // 2. Chuyển đổi Date thành ISO String
                    issuedDate: studentObj.identityDocument.issuedDate ? new Date(studentObj.identityDocument.issuedDate).toISOString() : "",
                    expiredDate: studentObj.identityDocument.expiredDate ? new Date(studentObj.identityDocument.expiredDate).toISOString() : "",
                    issuedPlace: studentObj.identityDocument.issuedPlace || ""
                } : null; // Nếu không có identityDocument thì trả về null


                students.push({
                    id: studentObj.id !== undefined ? String(studentObj.id) : "",
                    name: studentObj.name || "",
                    dob: studentObj.dob || "",
                    gender: studentObj.gender || "",
                    faculty: studentObj.faculty || "",
                    academicYear: studentObj.academicYear || 0,
                    programId: studentObj.programId || "",
                    permanentAddress: studentObj.permanentAddress ? {
                        city: studentObj.permanentAddress.city !== undefined ? String(studentObj.permanentAddress.city) : "",
                        district: studentObj.permanentAddress.district !== undefined ? String(studentObj.permanentAddress.district) : "",
                        ward: studentObj.permanentAddress.ward !== undefined ? String(studentObj.permanentAddress.ward) : "",
                        street: studentObj.permanentAddress.street !== undefined ? String(studentObj.permanentAddress.street) : ""
                    } : {},
                    temporaryAddress: studentObj.temporaryAddress ? {
                        city: studentObj.temporaryAddress.city !== undefined ? String(studentObj.temporaryAddress.city) : "",
                        district: studentObj.temporaryAddress.district !== undefined ? String(studentObj.temporaryAddress.district) : "",
                        ward: studentObj.temporaryAddress.ward !== undefined ? String(studentObj.temporaryAddress.ward) : "",
                        street: studentObj.temporaryAddress.street !== undefined ? String(studentObj.temporaryAddress.street) : ""
                    } : undefined,
                    email: studentObj.email || "",
                    phone: studentObj.phone !== undefined ? String(studentObj.phone) : "",
                    status: studentObj.status || "",
                    identityDocument:identityDocument || {},
                    nationality: studentObj.nationality || ""
                });
            }
        }
    
        return students;
    }

    wrap(students: any) : any {
        const cleanData = students.map((student: { toJSON?: () => any; }) => student.toJSON ? student.toJSON() : student);
        const wrappedData = { students: { student: cleanData } };
        return wrappedData;
    }
}

const studentXMLParser = new StudentXMLParser();
export default studentXMLParser;