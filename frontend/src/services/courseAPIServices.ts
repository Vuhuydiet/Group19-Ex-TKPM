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

export const getCourses = async (): Promise<any[]> => {
    const response = await axios.get(API_BASE_URL);
    return response.data.metadata;
}

export const getCourseById = async (id: string): Promise<any | null> => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data.metadata;
}

export const addCourse = async (course: Course): Promise<any> => {
    const response = await axios.post(API_BASE_URL, course);
    return response.data.metadata;
}

export const updateCourse = async (id: string, course: Course): Promise<any> => {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, course);
    return response.data.metadata;
}

export const deleteCourse = async (id: string): Promise<any> => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data.metadata;
}

