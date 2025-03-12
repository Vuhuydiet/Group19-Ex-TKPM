import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/students"; // Thay đổi URL nếu cần

export interface Student {
  id: string;
  name: string;
  dob: string; 
  gender: string;
  faculty: string;
  academicYear: number;
  program: string;
  address: string;
  email: string;
  phone: string;
  status: string;
}

//Lấy danh sách tất cả sinh viên
export const getStudents = async (): Promise<Student[]> => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

//Lấy sinh viên theo ID
export const getStudentById = async (id: string): Promise<Student | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/id/${id}`);
    return response.data;
  } catch (error) {
    console.error("Student not found", error);
    return null;
  }
};

//Lấy danh sách sinh viên theo tên
export const getStudentsByName = async (name: string): Promise<Student[]> => {
  const response = await axios.get(`${API_BASE_URL}/name`, { params: { name } });
  return response.data;
};

//Thêm sinh viên mới
export const addStudent = async (student: Student): Promise<void> => {
  await axios.post(API_BASE_URL, student);
};

//Cập nhật thông tin sinh viên
export const updateStudent = async (id: string, updatedData: Partial<Student>): Promise<void> => {
  await axios.patch(`${API_BASE_URL}/${id}`, updatedData);
};

//Xóa sinh viên theo ID
export const removeStudent = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};  
