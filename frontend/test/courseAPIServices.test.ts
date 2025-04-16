import axios from "axios";
import { CourseAPIServices } from "../src/services/courseAPIServices";
import { Course } from "../src/services/courseAPIServices"; // Import Course interface

jest.mock("axios"); // Mock axios

describe("Course API Service Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mock calls before each test
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
                    prerequisiteId: "",
                }
            ]
        };

        const mockCourses: Course[] = [
            {
                id: "1",
                courseName: "Trí tuệ nhân tạo",
                nCredits: 4,
                facultyId: "TN",
                description: "Khóa học trí tuệ nhân tạo",
                prerequisiteId: "",
            }
        ];

        (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

        const courseService = new CourseAPIServices(); // Create an instance of the CourseAPIServices
        const courses = await courseService.getCourses();
        // const courses = await getCourses();
        expect(courses).toEqual(mockCourses);
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
                prerequisites: "None"
            }
        };

        (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
        const courseService = new CourseAPIServices(); // Create an instance of the CourseAPIServices
        const course = await courseService.getCourseById(courseId);
        // const course = await getCourseById(courseId);
        expect(course).toEqual(mockResponse.metadata);
        expect(axios.get).toHaveBeenCalledWith(`http://localhost:3000/courses/${courseId}`);
    });

    // Test deleteCourse()
    it("should delete a course by ID", async () => {
        const courseId = "CS101";
        const mockResponse = {
            domainCode: "999",
            message: "Course deleted",
            metadata: {
                id: "1",
                courseName: "Trí tuệ nhân tạo",
                nCredits: 4,
                facultyId: "TN",
                description: "Khóa học trí tuệ nhân tạo",
                prerequisiteId: null,
                createdAt: "2025-04-16T08:01:41.926Z",
                activated: false
            }
        };

        (axios.delete as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
        const courseService = new CourseAPIServices(); // Create an instance of the CourseAPIServices
        const result = await courseService.deleteCourse(courseId);
        expect(result).toEqual(mockResponse.metadata);
        expect(axios.delete).toHaveBeenCalledWith(`http://localhost:3000/courses/${courseId}`);
    });

    // Test addCourse()
    it("should add a new course", async () => {
        const newCourse: Course = {
            id: "2",
            courseName: "Machine Learning",
            nCredits: 4,
            facultyId: "CS",
            description: "Introduction to machine learning.",
            prerequisiteId: "1",
        };

        const mockResponse = {
            domainCode: "999",
            message: "Course created",
            metadata: newCourse
        };

        (axios.post as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
        const courseService = new CourseAPIServices(); // Create an instance of the CourseAPIServices
        const result = await courseService.addCourse(newCourse);
        // const result = await addCourse(newCourse);
        expect(result).toEqual(mockResponse.metadata);
        expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/courses", newCourse);
    });
    
    
});



