// studentAPIServices.ts

import axios from "axios";
import { Student, Address } from "./classes/Student";
import { OldIdentityCard, NewIdentityCard, Passport } from "./classes/IdentityDocument";

const API_BASE_URL = "http://localhost:3000/students";

export class StudentAPIServices {
  // private parseStudent(data: any): Student | null {
  //   if (!data) {
  //       console.error("parseStudent received null or undefined data");
  //       return null;
  //   }

  //   const parseDate = (dateInput: string | Date): string => {
  //       if (!dateInput) return "";
  //       if (dateInput instanceof Date) return dateInput.toISOString();
  //       return new Date(dateInput).toISOString();
  //   };

  //   let doc: OldIdentityCard | NewIdentityCard | Passport | null = null;
  //   const identityDocData = data.identityDocument;

  //   // --- BẮT ĐẦU SỬA LỖI ---
  //   // Phải kiểm tra type và gọi đúng constructor tương ứng
  //   if (identityDocData) {
  //       if (identityDocData.type === 'OldIdentityCard') {
  //           doc = new OldIdentityCard(
  //               String(identityDocData.id),
  //               new Date(identityDocData.issuedDate),
  //               identityDocData.issuedPlace,
  //               new Date(identityDocData.expiredDate)
  //           );
  //       } else if (identityDocData.type === 'NewIdentityCard') {
  //           doc = new NewIdentityCard(
  //               String(identityDocData.id),
  //               new Date(identityDocData.issuedDate),
  //               identityDocData.issuedPlace,
  //               new Date(identityDocData.expiredDate),
  //               identityDocData.hasChip
  //           );
  //       } else if (identityDocData.type === 'Passport') {
  //           doc = new Passport(
  //               String(identityDocData.id || identityDocData.passportNumber),
  //               identityDocData.passportNumber,
  //               new Date(identityDocData.issuedDate),
  //               new Date(identityDocData.expiredDate),
  //               identityDocData.issuedPlace,
  //               identityDocData.issuedCountry,
  //               identityDocData.note
  //           );
  //       }
  //   }
  //   // --- KẾT THÚC SỬA LỖI ---

  //   // Chú ý: Dữ liệu từ API trả về có thể có faculty và status là object
  //   // Chúng ta cần lấy ra ID để truyền vào constructor của Student
  //   const facultyId = typeof data.faculty === 'object' && data.faculty !== null ? data.faculty.id : data.faculty;
  //   const statusId = typeof data.status === 'object' && data.status !== null ? data.status.id : data.status;

  //   return new Student(
  //       data.id,
  //       data.name,
  //       parseDate(data.dob),
  //       data.gender,
  //       facultyId, // Truyền ID dạng string
  //       data.academicYear,
  //       data.programId,
  //       new Address(
  //           data.permanentAddress?.city ?? '',
  //           data.permanentAddress?.district ?? '',
  //           data.permanentAddress?.ward ?? '',
  //           data.permanentAddress?.street ?? ''
  //       ),
  //       new Address(
  //           data.temporaryAddress?.city ?? '',
  //           data.temporaryAddress?.district ?? '',
  //           data.temporaryAddress?.ward ?? '',
  //           data.temporaryAddress?.street ?? ''
  //       ),
  //       data.nationality,
  //       data.email,
  //       doc,
  //       data.phone,
  //       statusId // Truyền ID dạng string
  //   );
  // }

  private parseStudent(data: any): Student | null {
    if (!data) {
        return null;
    }

    // Helper function để đảm bảo date luôn là ISO string hợp lệ
    const toISOStringSafe = (dateInput: string | Date): string => {
        if (!dateInput) return '';
        // Kiểm tra xem chuỗi có phải đã là ISO không
        if (typeof dateInput === 'string' && dateInput.includes('T') && dateInput.includes('Z')) {
            return dateInput;
        }
        const date = new Date(dateInput);
        // Kiểm tra xem date có hợp lệ không trước khi chuyển đổi
        return !isNaN(date.getTime()) ? date.toISOString() : '';
    };

    let doc: OldIdentityCard | NewIdentityCard | Passport | null = null;
    const identityDocData = data.identityDocument;

    if (identityDocData) {
        if (identityDocData.type === 'OldIdentityCard') {
            doc = new OldIdentityCard(
                String(identityDocData.id),
                new Date(identityDocData.issuedDate),
                identityDocData.issuedPlace,
                new Date(identityDocData.expiredDate)
            );
        } else if (identityDocData.type === 'NewIdentityCard') {
            doc = new NewIdentityCard(
                String(identityDocData.id),
                new Date(identityDocData.issuedDate),
                identityDocData.issuedPlace,
                new Date(identityDocData.expiredDate),
                identityDocData.hasChip
            );
        } else if (identityDocData.type === 'Passport') {
            doc = new Passport(
                String(identityDocData.id || identityDocData.passportNumber),
                identityDocData.passportNumber,
                new Date(identityDocData.issuedDate),
                new Date(identityDocData.expiredDate),
                identityDocData.issuedPlace,
                identityDocData.issuedCountry,
                identityDocData.note
            );
        }
    }

    const facultyId = typeof data.faculty === 'object' && data.faculty !== null ? data.faculty.id : data.faculty;
    const statusId = typeof data.status === 'object' && data.status !== null ? data.status.id : data.status;

    // Sử dụng helper function để tạo Student instance
    return new Student(
        data.id, data.name, toISOStringSafe(data.dob), data.gender,
        facultyId, data.academicYear, data.programId,
        new Address(
            data.permanentAddress?.city ?? '', data.permanentAddress?.district ?? '',
            data.permanentAddress?.ward ?? '', data.permanentAddress?.street ?? ''
        ),
        new Address(
            data.temporaryAddress?.city ?? '', data.temporaryAddress?.district ?? '',
            data.temporaryAddress?.ward ?? '', data.temporaryAddress?.street ?? ''
        ),
        data.nationality, data.email, doc, data.phone, statusId
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

export { Student };
