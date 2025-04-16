import axios from "axios";

const API_BASE_URL = "http://localhost:3000/classes"; // Thay đổi URL nếu cần

export interface ClassData {
    id: string;
    courseId: string;
    year: number;
    semester: number;
    professorName: string;
    capacity: number;
    schedule: string;
    room: string;
}



export const getClasses = async (): Promise<ClassData[]> => {
    const response = await axios.get(API_BASE_URL);
    return response.data.metadata;
}

export const getClassById = async (id: string): Promise<ClassData | null> => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data.metadata;
}

export const createClass = async (classData: ClassData): Promise<ClassData> => {
    const response = await axios.post(API_BASE_URL, classData);
    return response.data.metadata;
}

export const updateClass = async (id: string, classData: ClassData): Promise<ClassData> => {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, classData);
    return response.data.metadata;
}

export const deleteClass = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
}
