import axios from "axios";

const API_BASE_URL = "http://localhost:3000/classes"; // Thay đổi URL nếu cần

export interface Class {
    id: string;
    courseId: string;
    year: number;
    semester: number;
    professorName: string;
    capacity: number;
    schedule: string;
    room: string;
}

export interface ClassQueryParams {
    courseId?: string;
    year?: number;
    semester?: number;
    room?: string;
}



export class classAPIServices {
    constructor() {
        // Constructor logic if needed
    }

    getClasses = async (): Promise<Class[]> => {
        const response = await axios.get(API_BASE_URL, );
        return response.data.metadata;
    }


    getClassesByQuery = async (queryParams: ClassQueryParams): Promise<Class[]> => {
        const response = await axios.get(API_BASE_URL, { params: queryParams });
        return response.data.metadata;
    }


    getClassById = async (id: string): Promise<Class | null> => {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data.metadata;
    }

    createClass = async (classData: Class): Promise<Class> => {
        const response = await axios.post(API_BASE_URL, classData);
        return response.data.metadata;
    }   

    updateClass = async (id: string, classData: Class): Promise<Class> => {
        const response = await axios.patch(`${API_BASE_URL}/${id}`, classData);
        return response.data.metadata;
    }   

    deleteClass = async (id: string): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    }  
}