import axios from "axios";
import { Student } from "./studentAPIServices";

export type CourseData = {
  courseId: string;
  courseName: string;
  credits: number;
  grade?: number;
}


export interface AcademicTranscript {
  studentInfo: Student;
  courses: CourseData[];
  totalCredits: number;
  gpa: number;
  createdAt: Date;
}

export const API_BASE_URL = "http://localhost:3000/academic-transcript"; // Adjust the URL if needed

export class AcademicTranscriptAPIServices {
    constructor() {
        // Constructor logic if needed
    }
    
    getTranscript = async (studentId: string): Promise<AcademicTranscript> => {
        const response = await axios.get(`${API_BASE_URL}/${studentId}`);
        return response.data.metadata;
    };
}   