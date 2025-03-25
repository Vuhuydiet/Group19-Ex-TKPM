import { Faculty, Gender, Student, StudyStatus } from "../../../management/Student";

export class StudentXMLParser {
    parse(jsonObj: any) {
        const students: Student[] = [];
    
        if (jsonObj.students?.student) {
            const studentList = Array.isArray(jsonObj.students.student)
                ? jsonObj.students.student
                : [jsonObj.students.student];
    
            for (const studentObj of studentList) {
                const student: Student = new Student(
                    studentObj.id || "",
                    studentObj.name || "",
                    new Date(studentObj.dob || ""),
                    studentObj.gender as Gender || "",
                    studentObj.faculty as Faculty || "",
                    parseInt(studentObj.academicYear || "0", 10),
                    studentObj.program || "",
                    studentObj.permanentAddress || {},
                    studentObj.temporaryAddress || undefined,
                    studentObj.email || "",
                    studentObj.phone || "",
                    studentObj.status as StudyStatus || null,
                    studentObj.identityDocument || {},
                    studentObj.nationality
                );
                students.push(student);
            }
        }
    
        return students;
    }

    wrap(students: any) : any {
        const cleanData = students.map((student: { toJSON: () => any; }) => student.toJSON());
        const wrappedData = { students: { student: cleanData } };
        return wrappedData;
    }
}

const studentXMLParser = new StudentXMLParser();
export default studentXMLParser;