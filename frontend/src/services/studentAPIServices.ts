import axios from "axios";

const API_BASE_URL = "http://localhost:3000/students"; // Thay đổi URL nếu cần

export interface Student {
  id: string; 
  name: string;
  dob: string;
  gender: string;
  faculty: string;
  academicYear: number;
  program: string;
  permanentAddress: {
    city: string;
    district: string;
    ward: string;
    street: string;
  };
  temporaryAddress: {
    city: string;
    district: string;
    ward: string;
    street: string;
  };
  nationality: string;
  email: string;//
  identityDocument: {
    type: "OldIdentityCard" | "NewIdentityCard" | "Passport" | "";
    data: {
      id: string;
      issuedDate: string;
      issuedPlace: string;
      expiredDate: string;
    } | {
      id: string;
      issuedDate: string;
      issuedPlace: string;
      expiredDate: string;
      hasChip: boolean;
    } | {
      passportNumber: string;
      issuedDate: string;
      issuedPlace: string;
      expiredDate: string;
      issuedCountry: string;
      note: string;
    } | null;
  };
  phone: string;//
  status: string;//
}

export class StudentAPIServices {
  constructor() {
    // Constructor logic if needed
  }

  //Lấy danh sách sinh viên
  getStudents = async (): Promise<Student[]> => {
    const response = await axios.get(API_BASE_URL);
    return response.data.metadata;
  };

  //Lấy sinh viên theo ID
  getStudentById = async (id: string): Promise<Student | null> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/id/${id}`);
      return response.data.metadata;
    } catch (error) {
      console.error("Student not found", error);
      return null;
    }
  };

  //Lấy danh sách sinh viên theo tên
  getStudentsByName = async (name: string): Promise<Student[]> => {
    const response = await axios.get(`${API_BASE_URL}/name`, { params: { name } });
    return response.data.metadata;
  };

  //Thêm sinh viên mới
  addStudent = async (student: Student): Promise<Student> => {
    const response = await axios.post(API_BASE_URL, student);
    return response.data.metadata;
  };

  //Cập nhật sinh viên
  updateStudent = async (id: string, updatedData: Partial<Student>): Promise<Student> => {
    const response = await axios.patch<Student>(`${API_BASE_URL}/${id}`, updatedData);
    return response.data;
  };

  //Xóa sinh viên theo ID
  removeStudent = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
  };

}

