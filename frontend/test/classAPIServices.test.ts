import axios from "axios";

import { ClassData } from "../src/services/classAPIServices"; // Adjust the import path as necessary
import { getClasses, getClassById, createClass, updateClass, deleteClass } from "../src/services/classAPIServices"; // Adjust the import path as necessary
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

        const mockClasses: ClassData[] = [
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

        const classes = await getClasses();
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

        const classData = await getClassById(classId);
        expect(classData).toEqual(mockResponse.metadata);
        expect(axios.get).toHaveBeenCalledWith(`http://localhost:3000/classes/${classId}`);
    });

    // Test createClass()
    it("should create a new class", async () => {
        const newClass: ClassData = {
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

        const createdClass = await createClass(newClass);
        expect(createdClass).toEqual(mockResponse.metadata);
        expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/classes", newClass);
    });

    // Test updateClass()
    it("should update an existing class", async () => {
        const classId = "1";
        const updatedClass: ClassData = {
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

        const result = await updateClass(classId, updatedClass);
        expect(result).toEqual(mockResponse.metadata);
        expect(axios.patch).toHaveBeenCalledWith(`http://localhost:3000/classes/${classId}`, updatedClass);
    });

    // Test deleteClass()
    it("should delete a class", async () => {
        const classId = "1";

        (axios.delete as jest.Mock).mockResolvedValueOnce({});

        await deleteClass(classId);
        expect(axios.delete).toHaveBeenCalledWith(`http://localhost:3000/classes/${classId}`);
    });
});
    