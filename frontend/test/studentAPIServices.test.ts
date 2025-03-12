import axios from "axios";
import { getStudents, getStudentById, addStudent, updateStudent, removeStudent, Student } from "../src/services/studentAPIServices";

jest.mock("axios"); // Mock axios

describe("API Service Tests", () => {
  // Mock dữ liệu sinh viên
  const mockStudent: Student = {
        id: "22120413",
        name: "GROUP API TEST",
        dob: "2002-08-15",
        gender: "Male",
        faculty: "Computer Science",
        academicYear: 3,
        program: "Information Technology",
        address: "Hanoi",
        email: "testperson@gmail.com",
        phone: "0123456789",
        status: "Active",
    };
  const mockStudentsList = [mockStudent];

  // Test getStudents()
  it("should fetch list of students", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockStudentsList });

    const students = await getStudents();
    expect(students).toEqual(mockStudentsList);
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/api/students");
  });

  // Test getStudentById()
  it("should fetch a student by ID", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockStudent });

    const student = await getStudentById("22120413");
    expect(student).toEqual(mockStudent);
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/api/students/id/22120413");
  });

  // Test addStudent()
  it("should add a new student", async () => {
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue({ data: mockStudent });

    const newStudent = await addStudent(mockStudent);
    expect(newStudent).toEqual(mockStudent);
    expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/api/students", mockStudent);
  });

  // Test updateStudent()
  it("should update a student", async () => {
    const updatedData = { name: "Updated Name" };
    const updatedStudent = { ...mockStudent, ...updatedData };

    (axios.patch as jest.MockedFunction<typeof axios.patch>).mockResolvedValue({ data: updatedStudent });

    const result = await updateStudent("22120413", updatedData);
    expect(result).toEqual(updatedStudent);
    expect(axios.patch).toHaveBeenCalledWith("http://localhost:3000/api/students/22120413", updatedData);
  });

  // Test removeStudent()
  it("should delete a student", async () => {
    (axios.delete as jest.MockedFunction<typeof axios.delete>).mockResolvedValue({});

    await removeStudent("22120413");
    expect(axios.delete).toHaveBeenCalledWith("http://localhost:3000/api/students/22120413");
  });

  // Test lỗi khi API thất bại
  it("should handle API errors", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(new Error("API Error"));

    try {
      await getStudents();
    } catch (error) {
      expect(error).toEqual(new Error("API Error"));
    }
  });
});
