// studentAPIServices.ts

import axios from "axios";
import { Student, Address } from "./classes/Student";
import { OldIdentityCard, NewIdentityCard, Passport } from "./classes/IdentityDocument";

const API_BASE_URL = "http://localhost:3000/students";

export class StudentAPIServices {
  private parseStudent(data: any): Student | null {
    if (!data || !data.id) {
      console.error("Invalid student data received from API:", data);
      return null;
    }

    let doc: OldIdentityCard | NewIdentityCard | Passport | null = null;
    const identityDocData = data.identityDocument;

    if (identityDocData) {
      // ... (logic parse identityDocument giữ nguyên)
      if (identityDocData.type === "OldIdentityCard") {
        doc = new OldIdentityCard(
          identityDocData.id,
          new Date(identityDocData.issuedDate),
          identityDocData.issuedPlace,
          new Date(identityDocData.expiredDate)
        );
      } else if (identityDocData.type === "NewIdentityCard") {
        doc = new NewIdentityCard(
          identityDocData.id,
          new Date(identityDocData.issuedDate),
          identityDocData.issuedPlace,
          new Date(identityDocData.expiredDate),
          identityDocData.hasChip
        );
      } else if (identityDocData.type === "Passport") {
        doc = new Passport(
          identityDocData.id || identityDocData.passportNumber,
          identityDocData.passportNumber,
          new Date(identityDocData.issuedDate),
          new Date(identityDocData.expiredDate),
          identityDocData.issuedPlace,
          identityDocData.issuedCountry,
          identityDocData.note
        );
      }
    }

    const facultyId = typeof data.faculty === 'object' && data.faculty !== null 
      ? data.faculty.id 
      : data.faculty;

    return new Student(
      data.id,
      data.name ?? 'N/A',
      data.dob,
      data.gender ?? 'N/A',
      facultyId ?? 'N/A', // Sử dụng facultyId đã được xử lý
      data.academicYear ?? 0,
      data.programId ?? 'N/A', 
      new Address(
        data.permanentAddress?.city ?? '',
        data.permanentAddress?.district ?? '',
        data.permanentAddress?.ward ?? '',
        data.permanentAddress?.street ?? ''
      ),
      new Address(
        data.temporaryAddress?.city ?? '',
        data.temporaryAddress?.district ?? '',
        data.temporaryAddress?.ward ?? '',
        data.temporaryAddress?.street ?? ''
      ),
      data.nationality ?? 'N/A',
      data.email ?? 'N/A',
      doc,
      data.phone ?? 'N/A',
      data.status ?? 'N/A'
    );
  }


  getStudents = async (): Promise<Student[]> => {
    const response = await axios.get(API_BASE_URL);

    // Đảm bảo metadata là một mảng
    if (!Array.isArray(response.data.metadata)) {
      console.error("API response for getStudents is not an array:", response.data);
      return [];
    }
    
    // Thêm .filter để loại bỏ các bản ghi không hợp lệ
    return response.data.metadata
      .map(this.parseStudent)
      .filter((student: Student): student is Student => student !== null);
  };

  getStudentById = async (id: string): Promise<Student | null> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/id/${id}`);
      // Dữ liệu cho một sinh viên có thể nằm trong response.data.metadata
      return this.parseStudent(response.data.metadata);
    } catch {
      return null;
    }
  };

  getStudentsByName = async (name: string): Promise<Student[]> => {
    const response = await axios.get(`${API_BASE_URL}/name`, { params: { name } });
    
    if (!Array.isArray(response.data.metadata)) {
      console.error("API response for getStudentsByName is not an array:", response.data);
      return [];
    }

    return response.data.metadata
      .map(this.parseStudent)
      .filter((student: Student): student is Student => student !== null);
  };

  addStudent = async (student: Student): Promise<Student | null> => {
    const response = await axios.post(API_BASE_URL, student.toJSON());
    return this.parseStudent(response.data.metadata);
  };

  updateStudent = async (id: string, updatedData: Partial<Student>): Promise<Student | null> => {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, updatedData);
    return this.parseStudent(response.data.metadata);
  };

  removeStudent = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
  };
}