import axios from "axios";
import { removeEmptyFields } from "../utils/RemoveEmptyFieldHelper";

const API_BASE_URL = "http://localhost:3000/faculties"; // Thay đổi URL nếu cần

export interface Faculty {
    id: string;
    name: string;
    description: string;
    createdAt: string;
}

export class FacultyAPIServices {
    constructor() {
        // Constructor logic if needed
    }

    getFaculties = async (): Promise<Faculty[]> => {
        const response = await axios.get(API_BASE_URL);
        return response.data.metadata.faculties;
    }

    getFacultyById = async (id: string): Promise<Faculty | null> => {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data.metadata;
    }

    addFaculty = async (faculty: Faculty): Promise<Faculty> => {
        const response = await axios.post(API_BASE_URL, faculty);
        return response.data.metadata;
    }

    updateFaculty = async (id: string, faculty: Faculty): Promise<Faculty> => {
        const cleanedFaculty = removeEmptyFields(faculty);
        const response = await axios.patch(`${API_BASE_URL}/${id}`, cleanedFaculty);
        return response.data.metadata;
    }

    deleteFaculty = async (id: string): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    }

}