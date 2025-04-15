import axios from "axios";

const API_BASE_URL = "http://localhost:3000/faculties"; // Thay đổi URL nếu cần

export interface Faculty {
    id: string; 
    name: string;
    description: string;
    createdAt: string;
}

export const getFaculties = async (): Promise<any[]> => {
    const response = await axios.get(API_BASE_URL);
    return response.data.metadata.faculties;
}

export const getFacultyById = async (id: string): Promise<any | null> => {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data.metadata;
}

export const addFaculty = async (faculty: Faculty): Promise<any> => {
    const response = await axios.post(API_BASE_URL, faculty);
    return response.data.metadata;
}

export const updateFaculty = async (id: string, faculty: Faculty): Promise<any> => {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, faculty);
    return response.data.metadata;
}

