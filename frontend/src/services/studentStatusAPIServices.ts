import axios from "axios";
import { removeEmptyFields } from "../utils/RemoveEmptyFieldHelper";

const API_BASE_URL = "http://localhost:3000/study-status"; // Thay đổi URL nếu cần


export interface StudyStatus {
    id: string;
    name: string;
    description: string | null;
    createdAt: string;
}

export class StudyStatusAPIServices {
    constructor() {
        // Constructor logic if needed
    }

    getStudyStatuses = async (): Promise<StudyStatus[]> => {
        const response = await axios.get(API_BASE_URL);
        return response.data.metadata.statuses;
    }

    getStudyStatusById = async (id: string): Promise<StudyStatus | null> => {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data.metadata.studyStatus;
    }

    addStudyStatus = async (studyStatus: StudyStatus): Promise<StudyStatus> => {
        const cleanedStatus = removeEmptyFields(studyStatus);
        const response = await axios.post(API_BASE_URL, cleanedStatus);
        return response.data.metadata.studyStatus;
    }

    updateStudyStatus = async (id: string, studyStatus: StudyStatus): Promise<StudyStatus> => {
        const cleanedStudyStatus = removeEmptyFields(studyStatus);
        const response = await axios.patch(`${API_BASE_URL}/${id}`, cleanedStudyStatus);
        return response.data.metadata.studyStatus;
    }

    deleteStudyStatus = async (id: string): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/${id}`);
    }
}
