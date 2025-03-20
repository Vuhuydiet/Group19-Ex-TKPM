import { ImportExportStrategy } from '../importExport.strategy';
import { Faculty, Gender, Student, StudyStatus } from '../../management/Student';
import { XMLBuilder, XMLParser  } from 'fast-xml-parser';

export class XMLStrategy implements ImportExportStrategy {

    private xmlParser: XMLParser;

    private xmlBuilder: XMLBuilder; 

    constructor() {
        this.xmlParser = new XMLParser({ ignoreAttributes: false });

        this.xmlBuilder = new XMLBuilder({
            format: true,
            ignoreAttributes: false
        });
    }

    parseData(data: string): any {
        
        const jsonObj = this.xmlParser.parse(data);
        
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
            }
        }
    
        return students;
    }

    stringifyData(data: object[]): string {
        const wrappedData = { students: { student: data } };

        return this.xmlBuilder.build(wrappedData);
    }
}

const xmlStrategy = new XMLStrategy();
export default xmlStrategy;