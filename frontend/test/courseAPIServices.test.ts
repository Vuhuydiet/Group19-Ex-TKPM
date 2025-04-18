import axios from "axios";
import { CourseAPIServices } from "../src/services/courseAPIServices";
import { Module } from "../src/services/moduleAPIServices"; // đúng interface

jest.mock("axios");

describe("Course API Service Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Test getCourses()
    it("should fetch all courses", async () => {
        const mockResponse = {
            domainCode: "999",
            message: "Courses found",
            metadata: [
                {
                    id: "1",
                    courseName: "Trí tuệ nhân tạo",
                    nCredits: 4,
                    facultyId: "TN",
                    description: "Khóa học trí tuệ nhân tạo",
                    prerequisiteId: ""
                }
            ]
        };

        const expectedModules: Module[] = [
            {
                id: "1",
                name: "Trí tuệ nhân tạo",
                numOfCredits: 4,
                faculty: "TN",
                description: "Khóa học trí tuệ nhân tạo",
                prerequisiteModules: []
            }
        ];

        (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

        const courseService = new CourseAPIServices();
        const modules = await courseService.getCourses();

        expect(modules).toEqual(expectedModules);
        expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/courses");
    });

    // Test getCourseById()
    it("should fetch a course by ID", async () => {
        const courseId = "CS101";
        const mockResponse = {
            domainCode: "999",
            message: "Course found",
            metadata: {
                id: courseId,
                courseName: "Introduction to Computer Science",
                nCredits: 3,
                facultyId: "CS",
                description: "Basic concepts of computer science.",
                prerequisiteId: "None"
            }
        };

        const expectedModule: Module = {
            id: courseId,
            name: "Introduction to Computer Science",
            numOfCredits: 3,
            faculty: "CS",
            description: "Basic concepts of computer science.",
            prerequisiteModules: ["None"]
        };

        (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

        const courseService = new CourseAPIServices();
        const result = await courseService.getCourseById(courseId);

        expect(result).toEqual(expectedModule);
        expect(axios.get).toHaveBeenCalledWith(`http://localhost:3000/courses/${courseId}`);
    });

    // Test deleteCourse()
    it("should delete a course by ID", async () => {
        const courseId = "CS101";
        const mockResponse = {
            domainCode: "999",
            message: "Course deleted",
            metadata: {}
        };

        (axios.delete as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

        const courseService = new CourseAPIServices();
        const result = await courseService.deleteCourse(courseId);

        expect(result).toEqual({});
        expect(axios.delete).toHaveBeenCalledWith(`http://localhost:3000/courses/${courseId}`);
    });

    // Test addCourse()
    it("should add a new course", async () => {
        const newModule: Module = {
            id: "2",
            name: "Machine Learning",
            numOfCredits: 4,
            faculty: "CS",
            description: "Introduction to machine learning.",
            prerequisiteModules: ["1"]
        };

        const mockResponse = {
            domainCode: "999",
            message: "Course created",
            metadata: {
                id: "2",
                courseName: "Machine Learning",
                nCredits: 4,
                facultyId: "CS",
                description: "Introduction to machine learning.",
                prerequisiteId: "1"
            }
        };

        const expectedModule: Module = {
            id: "2",
            name: "Machine Learning",
            numOfCredits: 4,
            faculty: "CS",
            description: "Introduction to machine learning.",
            prerequisiteModules: ["1"]
        };

        (axios.post as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

        const courseService = new CourseAPIServices();
        const result = await courseService.addCourse(newModule);

        expect(result).toEqual(expectedModule);
        expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/courses", {
            id: "2",
            courseName: "Machine Learning",
            nCredits: 4,
            facultyId: "CS",
            description: "Introduction to machine learning.",
            prerequisiteId: "1"
        });
    });
});
