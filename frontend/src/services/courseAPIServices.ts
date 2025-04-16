import axios from "axios";

const API_BASE_URL = "http://localhost:3000/courses"; // Thay đổi URL nếu cần

export interface Course {
    id: string; 
    courseName: string;
    nCredits: number;
    facultyId: string;
    description: string;
    prerequisiteId: string;
}

export class CourseAPIServices {
    constructor() {
        // Constructor logic if needed
    }

    getCourses = async (): Promise<Course[]> => {
        const response = await axios.get(API_BASE_URL);
        return response.data.metadata;
    }

    getCourseById = async (id: string): Promise<Course | null> => {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data.metadata;
    }

    addCourse = async (course: Course): Promise<Course> => {
        const response = await axios.post(API_BASE_URL, course);
        return response.data.metadata;
    }

    updateCourse = async (id: string, course: Course): Promise<Course> => {
        const response = await axios.patch(`${API_BASE_URL}/${id}`, course);
        return response.data.metadata;
    }

    deleteCourse = async (id: string): Promise<void> => {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data.metadata;
    }
}

