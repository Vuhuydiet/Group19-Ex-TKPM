import axios from "axios";
import { StudentAPIServices } from "../src/services/studentAPIServices";
import { mockStudent } from "../src/services/mockData";
jest.mock("axios"); // Mock axios

describe("API Service Tests", () => {

  // Test getStudentById()
  // it("should fetch a student by ID", async () => {
  //   (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockStudent });

  //   const student = await getStudentById("22120413");
  //   expect(student).toEqual(mockStudent);
  //   expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/students/id/22120413");
  // });

  it("should fetch a student by ID and return metadata", async () => {
    const mockResponse = { metadata: mockStudent };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockResponse });

    const studentService = new StudentAPIServices(); // Create an instance of the StudentAPIServices
    const student = await studentService.getStudentById("22120413"); // Call the method to test
    // const student = await getStudentById("22120413");
    expect(student).toEqual(mockStudent);
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/students/id/22120413");
  });


  // // Test addStudent()
  // it("should add a new student", async () => {
  //   (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue({ data: mockStudent });

  //   const newStudent = await addStudent(mockStudent);
  //   expect(newStudent).toEqual(mockStudent);
  //   expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/students", mockStudent);
  // });

  // Test addStudent()
  it("should add a new student and return metadata", async () => {
      const mockResponse = { metadata: mockStudent };

      (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue({ data: mockResponse });

    // const newStudent = await addStudent(mockStudent);
      const studentService = new StudentAPIServices(); // Create an instance of the StudentAPIServices
      const newStudent = await studentService.addStudent(mockStudent); // Call the method to test
      expect(newStudent).toEqual(mockStudent);
      expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/students", mockStudent);
  });


  // Test updateStudent()
  it("should update a student", async () => {
    const updatedData = { name: "Updated Name" };
    const updatedStudent = { ...mockStudent, ...updatedData };

    (axios.patch as jest.MockedFunction<typeof axios.patch>).mockResolvedValue({ data: updatedStudent });

    // const result = await updateStudent("22120413", updatedData);
    const studentService = new StudentAPIServices(); // Create an instance of the StudentAPIServices
    const result = await studentService.updateStudent("22120413", updatedData); // Call the method to test
    expect(result).toEqual(updatedStudent);
    expect(axios.patch).toHaveBeenCalledWith("http://localhost:3000/students/22120413", updatedData);
  });

  // Test removeStudent()
  it("should delete a student", async () => {
    (axios.delete as jest.MockedFunction<typeof axios.delete>).mockResolvedValue({});

    // await removeStudent("22120413");
    const studentService = new StudentAPIServices(); // Create an instance of the StudentAPIServices
    await studentService.removeStudent("22120413"); // Call the method to test
    expect(axios.delete).toHaveBeenCalledWith("http://localhost:3000/students/22120413");
  });

  // Test lỗi khi API thất bại
  it("should handle API errors", async () => {
    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValue(new Error("API Error"));

    try {
      // await getStudents();
      const studentService = new StudentAPIServices(); // Create an instance of the StudentAPIServices
      await studentService.getStudents(); // Call the method to test
    } catch (error) {
      expect(error).toEqual(new Error("API Error"));
    }
  });
});
