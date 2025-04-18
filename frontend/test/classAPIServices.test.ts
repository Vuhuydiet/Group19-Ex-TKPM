import axios from "axios";

import { Class } from "../src/services/classAPIServices"; // Adjust the import path as necessary
import { classAPIServices } from "../src/services/classAPIServices"; // Adjust the import path as necessary
jest.mock("axios"); // Mock axios

describe("Class API Service Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mock calls before each test
    });
    
    // Test getClasses()
    it("should fetch all classes", async () => {
        const mockResponse = {
            domainCode: "999",
            message: "Class created",
            metadata: [
                    {
                        id: "1",
                        courseId: "52",
                        year: 2025,
                        semester: 1,
                        professorName: "Lê Anh Khôi",
                        capacity: 120,
                        schedule: "T2 1-4",
                        room: "F302"
                    }
                ]
            };

        const mockClasses: Class[] = [
            {
                id: "1",
                courseId: "52",
                year: 2025,
                semester: 1,
                professorName: "Lê Anh Khôi",
                capacity: 120,
                schedule: "T2 1-4",
                room: "F302"
            }
        ];

        (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
        const classService = new classAPIServices(); // Create an instance of the classAPIServices
        const classes = await classService.getClasses();
        expect(classes).toEqual(mockClasses);
        expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/classes");
    });

    // Test getClassById()
    it("should fetch a class by ID", async () => {
        const classId = "1";
        const mockResponse = {
            domainCode: "999",
            message: "Class found",
            metadata: {
                id: classId,
                courseId: "52",
                year: 2025,
                semester: 1,
                professorName: "Lê Anh Khôi",
                capacity: 120,
                schedule: "T2 1-4",
                room: "F302"
            }
        };

        (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
        const classService = new classAPIServices(); // Create an instance of the classAPIServices
        const classData = await classService.getClassById(classId);
        expect(classData).toEqual(mockResponse.metadata);
        expect(axios.get).toHaveBeenCalledWith(`http://localhost:3000/classes/${classId}`);
    });

    // Test createClass()
    it("should create a new class", async () => {
        const newClass: Class = {
            id: "2",
            courseId: "52",
            year: 2025,
            semester: 1,
            professorName: "Nguyễn Văn A",
            capacity: 100,
            schedule: "T3 1-4",
            room: "F301"
        };

        const mockResponse = {
            domainCode: "999",
            message: "Class created",
            metadata: newClass
        };

        (axios.post as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

        const classService = new classAPIServices(); // Create an instance of the classAPIServices
        const createdClass = await classService.createClass(newClass);
        expect(createdClass).toEqual(mockResponse.metadata);
        expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/classes", newClass);
    });

    // Test updateClass()
    it("should update an existing class", async () => {
        const classId = "1";
        const updatedClass: Class = {
            id: classId,
            courseId: "52",
            year: 2025,
            semester: 1,
            professorName: "Nguyễn Văn B",
            capacity: 150,
            schedule: "T4 1-4",
            room: "F303"
        };

        const mockResponse = {
            domainCode: "999",
            message: "Class updated",
            metadata: updatedClass
        };

        (axios.patch as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

        const classService = new classAPIServices(); // Create an instance of the classAPIServices
        const result = await classService.updateClass(classId, updatedClass);
        expect(result).toEqual(mockResponse.metadata);
        expect(axios.patch).toHaveBeenCalledWith(`http://localhost:3000/classes/${classId}`, updatedClass);
    });

    // Test deleteClass()
    it("should delete a class", async () => {
        const classId = "1";

        (axios.delete as jest.Mock).mockResolvedValueOnce({});

        const classService = new classAPIServices(); // Create an instance of the classAPIServices
        await classService.deleteClass(classId);
        expect(axios.delete).toHaveBeenCalledWith(`http://localhost:3000/classes/${classId}`);
    });
});
    