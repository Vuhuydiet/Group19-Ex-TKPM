import axios from "axios";
import { Module } from "./moduleAPIServices";

const API_BASE_URL = "http://localhost:3000/courses"; // Thay đổi URL nếu cần

export interface Course {
    id: string;
    courseName: string;
    nCredits: number;
    facultyId: string;
    description: string;
    prerequisiteId: string | null; // Thay đổi kiểu dữ liệu nếu cần
}

function mapModuleToCourse(module: Module): Course {
    return {
        id: module.id,
        courseName: module.name,
        nCredits: module.numOfCredits,
        facultyId: module.faculty,
        description: module.description,
        prerequisiteId: module.prerequisiteModules[0] || null,
    };
}

function mapCourseToModule(course: Course): Module {
    return {
        id: course.id,
        name: course.courseName,
        numOfCredits: course.nCredits,
        faculty: course.facultyId,
        description: course.description,
        prerequisiteModules: course.prerequisiteId ? [course.prerequisiteId] : [], // chuyển thành mảng
    };
}

export class CourseAPIServices {
    constructor() {
        // Constructor logic if needed
    }

    getCourses = async (): Promise<Module[]> => {
        const response = await axios.get(API_BASE_URL);
        const courses: Course[] = response.data.metadata;
        const modules: Module[] = courses.map(course => mapCourseToModule(course));
        return modules;
    }

    getCourseById = async (id: string): Promise<Module | null> => {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        // return response.data.metadata;
        const course: Course = response.data.metadata;
        if (course) {
            return mapCourseToModule(course);
        } else {
            return null; // Hoặc xử lý theo cách bạn muốn nếu không tìm thấy khóa học
        }
    }

    addCourse = async (course: Module): Promise<Module> => {
        const courseData: Course = mapModuleToCourse(course);
        const response = await axios.post(API_BASE_URL, courseData);

        const newCourse: Course = response.data.metadata;
        return mapCourseToModule(newCourse); // Chuyển đổi lại thành Module trước khi trả về
    }

    updateCourse = async (id: string, course: Module): Promise<Module> => {
        const courseData: Course = mapModuleToCourse(course);
        const response = await axios.patch(`${API_BASE_URL}/${id}`, courseData);
        const updatedCourse: Course = response.data.metadata;
        return mapCourseToModule(updatedCourse); // Chuyển đổi lại thành Module trước khi trả về
    }


    deleteCourse = async (id: string): Promise<void> => {
        const response = await axios.delete(`${API_BASE_URL}/${id}`);
        return response.data.metadata;
    }
}

