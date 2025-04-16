import axios from "axios";

import { CourseEnrollmentAPIServices, CourseEnrollment } from "../src/services/courseEnrollmentAPIServices";

jest.mock("axios"); // Mock axios

describe("Course Enrollment API Service Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mock calls before each test
    });
    
    // Test createEnrollment()
    it("should create a new enrollment", async () => {
        const mockEnrollment: CourseEnrollment = {
            studentId: "123",
            classId: "456",
            grade: 90,
        };

        const mockResponse = {
            domainCode: "999",
            message: "Enrollment record created",
            metadata: mockEnrollment,
        };

        (axios.post as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
        const result = await CourseEnrollmentAPIServices.createEnrollment(mockEnrollment);
        expect(result).toEqual(mockEnrollment);
        expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/course-enrollments", mockEnrollment);
    });

    // Test getEnrollments()
    it("should fetch all enrollments", async () => {
        const mockResponse = {
            domainCode: "999",
            message: "Enrollment records found",
            metadata: [
                {
                    studentId: "123",
                    classId: "456",
                    grade: 90,
                },
                {
                    studentId: "789",
                    classId: "012",
                    grade: 85,
                },
            ],
        };

        const mockEnrollments: CourseEnrollment[] = [
            {
                studentId: "123",
                classId: "456",
                grade: 90,
            },
            {
                studentId: "789",
                classId: "012",
                grade: 85,
            },
        ];

        (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
        const result = await CourseEnrollmentAPIServices.getEnrollments();
        expect(result).toEqual(mockEnrollments);
        expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/course-enrollments");
    });

    // Test getEnrollmentById()
    it("should fetch an enrollment by studentId and classId", async () => {
        const studentId = "123";
        const classId = "456";
        const mockResponse = {
            domainCode: "999",
            message: "Enrollment record found",
            metadata: {
                studentId,
                classId,
                grade: 90,
            },
        };

        (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
        const result = await CourseEnrollmentAPIServices.getEnrollmentById(studentId, classId);
        expect(result).toEqual(mockResponse.metadata);
        expect(axios.get).toHaveBeenCalledWith(`http://localhost:3000/course-enrollments/${studentId}/${classId}`);
    });

    // Test updateEnrollment()
    it("should update an existing enrollment", async () => {
        const studentId = "123";
        const classId = "456";
        const updatedEnrollment: Partial<CourseEnrollment> = {
            grade: 95,
        };

        const mockResponse = {
            domainCode: "999",
            message: "Enrollment record updated",
            metadata: {
                ...updatedEnrollment,
                studentId,
                classId,
            },
        };

        (axios.patch as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
        const result = await CourseEnrollmentAPIServices.updateEnrollment(studentId, classId, updatedEnrollment);
        expect(result).toEqual(mockResponse.metadata);
        expect(axios.patch).toHaveBeenCalledWith(`http://localhost:3000/course-enrollments/${studentId}/${classId}`, updatedEnrollment);
    });

    // Test deleteEnrollment()
    it("should cancel a class", async () => {
        const studentId = "123";
        const classId = "456";

        (axios.delete as jest.Mock).mockResolvedValueOnce({ data: {} });
        await CourseEnrollmentAPIServices.cancelClass(studentId, classId);
        expect(axios.delete).toHaveBeenCalledWith(`http://localhost:3000/course-enrollments/${studentId}/${classId}`);
    }
    );

    // Test getCanceledHistory()
    it("should fetch canceled history", async () => {
        const mockResponse = {
            domainCode: "999",
            message: "Class cancel histories found",
            metadata: [
                {
                    studentId: "123",
                    classId: "456",
                    grade: 90,
                },
                {
                    studentId: "789",
                    classId: "012",
                    grade: 85,
                },
            ],
        };
        
        const mockCanceledHistory: CourseEnrollment[] = [
            {
                studentId: "123",
                classId: "456",
                grade: 90,
            },
            {
                studentId: "789",
                classId: "012",
                grade: 85,
            },
        ];
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
        const result = await CourseEnrollmentAPIServices.getCanceledHistory();
        expect(result).toEqual(mockCanceledHistory);
        expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/course-enrollments/cancel-history", { params: {} });
    });
});
