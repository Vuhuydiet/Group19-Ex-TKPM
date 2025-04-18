import axios from "axios";

const API_BASE_URL = "http://localhost:3000/course-enrollments";

export interface CourseEnrollment {
    studentId: string;
    classId: string;
    grade?: number;
}

export class CourseEnrollmentAPIServices {
    constructor() {

    }

    createEnrollment = async (enrollment: CourseEnrollment): Promise<CourseEnrollment> => {
        const response = await axios.post(API_BASE_URL, enrollment);
        return response.data.metadata;
    }

    getEnrollments = async (): Promise<CourseEnrollment[]> => {
        const response = await axios.get(API_BASE_URL);
        return response.data.metadata;
    }

    getEnrollmentById = async (studentId: string, classId: string): Promise<CourseEnrollment | null> => {
        const response = await axios.get(`${API_BASE_URL}/${studentId}/${classId}`);
        return response.data.metadata;
    }

    updateEnrollment = async (studentId: string, classId: string, enrollment: Partial<CourseEnrollment>): Promise<CourseEnrollment> => {
        const response = await axios.patch(`${API_BASE_URL}/${studentId}/${classId}`, enrollment);
        return response.data.metadata;
    }

    cancelClass = async (studentId: string, classId: string): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/${studentId}/${classId}`);
    }

    getCanceledHistory = async (studentId?: string): Promise<CourseEnrollment[]> => {
        const response = await axios.get(`${API_BASE_URL}/cancel-history`, { params: { studentId } });
        return response.data.metadata;
    }
};




