import axios from "axios";
import { AcademicTranscriptAPIServices } from "../src/services/academicTranscriptAPIServices"; // Adjust the import path as necessary
jest.mock("axios"); // Mock axios

describe("Academic Transcript API Service Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mock calls before each test
    });

    // Test getTranscript()
    it("should fetch the academic transcript for a student", async () => {
        const mockResponse =
        {
            domainCode: "999",
            message: "Academic transcript found",
            metadata: {
                studentInfo: {
                    id: "22120252",
                    name: "Giang Duc Nhat",
                    dob: "2004-12-24T00:00:00.000Z",
                    gender: "Nam",
                    faculty: {
                        id: "TA",
                        name: "Khoa tiếng Anh thương mại",
                        description: null,
                        createdAt: "2025-04-16T07:36:17.667Z"
                    },
                    academicYear: 2025,
                    program: "Chất lượng cao",
                    permanentAddress: {
                        city: "Tỉnh Thái Nguyên",
                        district: "Thành phố Sông Công",
                        ward: "Phường Phố Cò",
                        "street": "1232"
                    },
                    temporaryAddress: {
                        city: "Tỉnh Lạng Sơn",
                        district: "Huyện Bình Gia",
                        ward: "Xã Mông Ân",
                        street: "1232"
                    },
                    email: "ducnhaat@student.edu.vn",
                    phone: "0383882412",
                    status: {
                        id: "DH",
                        name: "Đang học",
                        description: null,
                        createdAt: "2025-04-16T07:36:17.667Z"
                    },
                    identityDocument: {
                        type: "New Identity Card",
                        data: {
                            id: "079204015555",
                            issuedDate: "2021-01-12",
                            issuedPlace: "TPHCM",
                            expiredDate: "2029-12-24",
                            hasChip: true
                        }
                    },
                    nationality: "VN"
                },
                courses: [],
                totalCredits: 0,
                gpa: 0,
                createdAt: "2025-04-16T16:29:11.865Z"
            }
        };
        const studentId = "22120252";
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
        const transcriptService = new AcademicTranscriptAPIServices(); // Create an instance of the AcademicTranscriptAPIServices
        const transcript = await transcriptService.getTranscript(studentId);
        expect(transcript).toEqual(mockResponse.metadata);
    });
});

            

        
        
        


