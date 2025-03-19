import { ImportExportStrategy } from '../importExport.strategy';
import g_StudentManger from "../../../storage/studentManager";
import { Faculty, Gender, Student, StudyStatus } from '../../management/Student';
import { XMLBuilder, XMLParser  } from 'fast-xml-parser';

export class XMLStrategy implements ImportExportStrategy {
    importData(data: string): any {
        const parser = new XMLParser({ ignoreAttributes: false });
        const jsonObj = parser.parse(data);
        
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
                    studentObj.address || "",
                    studentObj.email || "",
                    studentObj.phone || "",
                    studentObj.status as StudyStatus || null
                );
                students.push(student);
                g_StudentManger.add(student);
            }
        }
    
        return students;
    }

    exportData(data: object[]): string {
        const builder = new XMLBuilder({
            format: true,
            ignoreAttributes: false
        });
    
        const wrappedData = { students: { student: data } };
        return builder.build(wrappedData);
    }
}