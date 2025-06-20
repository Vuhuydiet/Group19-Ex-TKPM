import axios from "axios";
import { StudentAPIServices } from "../src/services/studentAPIServices";
import { Student, Address } from "../src/services/classes/Student";
import { NewIdentityCard } from "../src/services/classes/IdentityDocument";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// --- DỮ LIỆU MOCK ---

// 1. Dữ liệu thô, giống như JSON nhận từ API
const mockStudentFromAPI = {
    id: "SV001",
    name: "Nguyễn Văn A",
    dob: "2002-05-15T00:00:00.000Z",
    gender: "Male",
    faculty: { id: 'L', name: 'Khoa Luật' }, // API có thể trả về object
    academicYear: 2020,
    programId: "CLC",
    permanentAddress: { city: "TP.HCM", district: "Quận 1", ward: "Bến Nghé", street: "123 Lê Lợi" },
    temporaryAddress: { city: "TP.HCM", district: "Quận 1", ward: "Bến Thành", street: "456 Nguyễn Huệ" },
    nationality: "VN",
    email: "nguyenvana@example.com",
    identityDocument: {
        type: "NewIdentityCard",
        id: "079403029299",
        issuedDate: "2021-12-21T00:00:00.000Z",
        issuedPlace: "Ho Chi Minh",
        expiredDate: "2029-12-01T00:00:00.000Z",
        hasChip: true
    },
    phone: "0123456789",
    status: { id: 'DH', name: 'Đang học' } // API có thể trả về object
};

// 2. KẾT QUẢ MONG ĐỢI: một instance thật của class Student, được tạo từ dữ liệu thô ở trên
const expectedStudentInstance = new Student(
    "SV001", "Nguyễn Văn A", "2002-05-15T00:00:00.000Z", "Male", "L", 2020, "CLC",
    new Address("TP.HCM", "Quận 1", "Bến Nghé", "123 Lê Lợi"),
    new Address("TP.HCM", "Quận 1", "Bến Thành", "456 Nguyễn Huệ"),
    "VN", "nguyenvana@example.com",
    new NewIdentityCard("079403029299", new Date("2021-12-21T00:00:00.000Z"), "Ho Chi Minh", new Date("2029-12-01T00:00:00.000Z"), true),
    "0123456789", "DH"
);


describe("StudentAPIServices Tests", () => {
    let studentService: StudentAPIServices;

    beforeEach(() => {
        studentService = new StudentAPIServices();
        jest.clearAllMocks(); // Dùng jest.clearAllMocks() để reset toàn diện hơn
    });

    it("should fetch a student by ID", async () => {
        // Mock API trả về dữ liệu thô
        mockedAxios.get.mockResolvedValue({ data: { metadata: mockStudentFromAPI } });

        const student = await studentService.getStudentById("SV001");
        
        // So sánh kết quả (instance) với kết quả mong đợi (instance)
        expect(student).toEqual(expectedStudentInstance);
        expect(mockedAxios.get).toHaveBeenCalledWith("http://localhost:3000/students/id/SV001");
    });

    it("should add a new student", async () => {
        // Mock API trả về dữ liệu thô
        mockedAxios.post.mockResolvedValue({ data: { metadata: mockStudentFromAPI } });
        
        // Gọi hàm addStudent với một instance Student
        const newStudent = await studentService.addStudent(expectedStudentInstance);

        expect(newStudent).toEqual(expectedStudentInstance);
        
        // Hàm addStudent sẽ gọi .toJSON() trên instance, tạo ra object để gửi đi
        expect(mockedAxios.post).toHaveBeenCalledWith(
            "http://localhost:3000/students", 
            expectedStudentInstance.toJSON() 
        );
    });

    it("should update a student", async () => {
        const updatedData = { name: "Updated Name" };
        
        // Dữ liệu API trả về sau khi update thành công
        const mockResponseData = { ...mockStudentFromAPI, name: updatedData.name };
        mockedAxios.patch.mockResolvedValue({ data: { metadata: mockResponseData } });
        
        // Kết quả mong đợi sau khi update
        const expectedResult = new Student(
            expectedStudentInstance.id, updatedData.name, expectedStudentInstance.dob, expectedStudentInstance.gender,
            expectedStudentInstance.faculty, expectedStudentInstance.academicYear, expectedStudentInstance.programId,
            expectedStudentInstance.permanentAddress, expectedStudentInstance.temporaryAddress, expectedStudentInstance.nationality,
            expectedStudentInstance.email, expectedStudentInstance.identityDocument, expectedStudentInstance.phone, expectedStudentInstance.status
        );

        const result = await studentService.updateStudent("SV001", updatedData);
        
        expect(result).toEqual(expectedResult);
        expect(mockedAxios.patch).toHaveBeenCalledWith("http://localhost:3000/students/SV001", updatedData);
    });

    it("should delete a student", async () => {
        // DELETE không cần trả về body, nên mock rỗng là đủ
        mockedAxios.delete.mockResolvedValue({});

        await studentService.removeStudent("22120413");
        
        expect(mockedAxios.delete).toHaveBeenCalledWith("http://localhost:3000/students/22120413");
        expect(mockedAxios.delete).toHaveBeenCalledTimes(1);
    });

    it("should handle API errors when getting students", async () => {
        const apiError = new Error("API Error");
        mockedAxios.get.mockRejectedValue(apiError);

        // expect.assertions(1) đảm bảo rằng ít nhất một assertion trong khối catch được gọi
        expect.assertions(1);

        try {
            await studentService.getStudents();
        } catch (error) {
            expect(error).toEqual(apiError);
        }
    });
});