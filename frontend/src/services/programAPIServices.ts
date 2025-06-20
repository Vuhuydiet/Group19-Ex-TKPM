
// export interface Program {
//     id: string;
//     name: string;
//     description: string;
//     createdAt: string;

// }

// export const mockDataPrograms: Program[] = [
//     {
//         id: "1",
//         name: "Chất lượng cao",
//         description: "Chương trình chất lượng cao dành cho sinh viên xuất sắc.",
//         createdAt: "2023-01-01T00:00:00Z"
//     },
//     {
//         id: "2",
//         name: "Đề án",
//         description: "Chương trình đề án dành cho sinh viên có dự án nghiên cứu.",
//         createdAt: "2023-01-02T00:00:00Z"
//     },
//     {
//         id: "3",
//         name: "Chính quy",
//         description: "Chương trình chính quy dành cho tất cả sinh viên.",
//         createdAt: "2023-01-03T00:00:00Z"
//     }
// ];


// frontend/src/services/programAPIServices.ts

import axios from 'axios';

// Định nghĩa base URL cho các endpoint của program
const API_BASE_URL = 'http://localhost:3000/programs'; // Thay đổi port nếu cần

// Interface này khớp với cấu trúc dữ liệu Program đã có ở frontend
export interface Program {
    id: string;
    name: string;
    description: string | null;
    createdAt: string;
}

// Dữ liệu cần thiết để tạo một Program mới
type CreateProgramData = Omit<Program, 'createdAt'>;

// Dữ liệu cần thiết để cập nhật một Program
type UpdateProgramData = Omit<Program, 'id' | 'createdAt'>;


export class ProgramAPIServices {
    /**
     * Lấy tất cả các chương trình học
     */
    async getPrograms(): Promise<Program[]> {
        const response = await axios.get(API_BASE_URL);
        // Giả định backend trả về một mảng Program trực tiếp
        return response.data;
    }

    /**
     * Thêm một chương trình học mới
     * @param programData - Dữ liệu của chương trình học mới
     */
    async addProgram(programData: CreateProgramData): Promise<Program> {
        const response = await axios.post(API_BASE_URL, programData);
        return response.data;
    }

    /**
     * Cập nhật một chương trình học đã có
     * @param id - ID của chương trình học cần cập nhật
     * @param programData - Dữ liệu mới để cập nhật
     */
    async updateProgram(id: string, programData: UpdateProgramData): Promise<Program> {
        // Backend của bạn dùng PUT, chúng ta sẽ gọi đúng phương thức PUT
        const response = await axios.put(`${API_BASE_URL}/${id}`, programData);
        return response.data;
    }

    /**
     * Xóa một chương trình học
     * @param id - ID của chương trình học cần xóa
     */
    async deleteProgram(id: string): Promise<void> {
        await axios.delete(`${API_BASE_URL}/${id}`);
    }
}