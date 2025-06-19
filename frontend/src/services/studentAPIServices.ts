import axios from "axios";
import { Student, Address } from "./classes/Student";
import { OldIdentityCard, NewIdentityCard, Passport } from "./classes/IdentityDocument";

const API_BASE_URL = "http://localhost:3000/students";

export class StudentAPIServices {
  private parseStudent(data: any): Student {
    let doc = null;
    if (data.identityDocument?.type === "OldIdentityCard") {
      const d = data.identityDocument.data;
      doc = new OldIdentityCard(d.id, new Date(d.issuedDate), d.issuedPlace, new Date(d.expiredDate));
    } else if (data.identityDocument?.type === "NewIdentityCard") {
      const d = data.identityDocument.data;
      doc = new NewIdentityCard(d.id, new Date(d.issuedDate), d.issuedPlace, new Date(d.expiredDate), d.hasChip);
    } else if (data.identityDocument?.type === "Passport") {
      const d = data.identityDocument.data;
      doc = new Passport(data.id, d.passportNumber, new Date(d.issuedDate), new Date(d.expiredDate), d.issuedPlace, d.issuedCountry, d.note);
    }

    return new Student(
      data.id,
      data.name,
      data.dob,
      data.gender,
      data.faculty,
      data.academicYear,
      data.program,
      new Address(data.permanentAddress.city, data.permanentAddress.district, data.permanentAddress.ward, data.permanentAddress.street),
      new Address(data.temporaryAddress.city, data.temporaryAddress.district, data.temporaryAddress.ward, data.temporaryAddress.street),
      data.nationality,
      data.email,
      doc,
      data.phone,
      data.status
    );
  }

  getStudents = async (): Promise<Student[]> => {
    const response = await axios.get(API_BASE_URL);
    return response.data.metadata.map(this.parseStudent);
  };

  getStudentById = async (id: string): Promise<Student | null> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/id/${id}`);
      return this.parseStudent(response.data.metadata);
    } catch {
      return null;
    }
  };

  getStudentsByName = async (name: string): Promise<Student[]> => {
    const response = await axios.get(`${API_BASE_URL}/name`, { params: { name } });
    return response.data.metadata.map(this.parseStudent);
  };

  addStudent = async (student: Student): Promise<Student> => {
    const response = await axios.post(API_BASE_URL, student.toJSON());
    return this.parseStudent(response.data.metadata);
  };

  updateStudent = async (id: string, updatedData: Partial<Student>): Promise<Student> => {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, updatedData);
    return this.parseStudent(response.data.metadata);
  };

  removeStudent = async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
  };
}
