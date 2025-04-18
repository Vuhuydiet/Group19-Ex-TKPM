import axios from "axios";

const API_BASE_URL = "http://localhost:3000/study-status-transition"; // Thay đổi URL nếu cần

export interface ValidStudyStatusTransition {
    from: string;
    to: string;
}

export class ValidStudyStatusTransitionAPIServices {
    constructor() {
        // Constructor logic if needed
    }


    addValidStudyStatusTransition = async (transition: ValidStudyStatusTransition): Promise<ValidStudyStatusTransition> => {
        const response = await axios.post(API_BASE_URL, transition);
        return response.data.metadata.transition;
    }   

    removeValidStudyStatusTransition = async (transition: ValidStudyStatusTransition): Promise<ValidStudyStatusTransition> => {
        const response = await axios.delete(API_BASE_URL, { data: transition });
        return response.data.metadata.transition;
    }   
}

// export const addValidStudyStatusTransition = async (transition: ValidStudyStatusTransition): Promise<ValidStudyStatusTransition> => {
//     const response = await axios.post(API_BASE_URL, transition);
//     return response.data.metadata.transition;
// };

// export const removeValidStudyStatusTransition = async (transition: ValidStudyStatusTransition): Promise<ValidStudyStatusTransition> => {
//     const response = await axios.delete(API_BASE_URL, { data: transition });
//     return response.data.metadata.transition;
// };