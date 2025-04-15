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


export const getStudents = async (): Promise<Student[]> => {
  const response = await axios.get(API_BASE_URL);
  return response.data.metadata;
};

//Lấy sinh viên theo ID
export const getStudentById = async (id: string): Promise<Student | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/id/${id}`);
    return response.data.metadata;
  } catch (error) {
    console.error("Student not found", error);
    return null;
  }
};

//Lấy danh sách sinh viên theo tên
export const getStudentsByName = async (name: string): Promise<Student[]> => {
  const response = await axios.get(`${API_BASE_URL}/name`, { params: { name } });
  return response.data.metadata;
};

// export const getStudentsByFacultyAndName = async (faculty: string, name: string): Promise<Student[]> => {
//   const response = await axios.get(`${API_BASE_URL}?faculty=${faculty}&name=${name}`);
//   return response.data.metadata;
// };

//Thêm sinh viên mới
export const addStudent = async (student: Student) => {
  const response = await axios.post("http://localhost:3000/students", student);
  return response.data.metadata;
};

// Hàm cập nhật sinh viên với kiểu trả về là `Promise<Student>`
export const updateStudent = async (id: string, updatedData: Partial<Student>): Promise<Student> => {
  const response = await axios.patch<Student>(`http://localhost:3000/students/${id}`, updatedData);
  return response.data;
};

//Xóa sinh viên theo ID
export const removeStudent = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};


