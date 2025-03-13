import { Student } from "./studentAPIServices";

export const mockStudent: Student = {
        id: "S001",
        name: "Nguyen Van A",
        dob: "2002-05-15",
        gender: "Male",
        faculty: "Information Technology",
        academicYear: 2020,
        program: "High-Quality",
        address: "123 Le Loi Street, District 1, Ho Chi Minh City",
        email: "nguyenvana@example.com",
        phone: "0123456789",
        status: "Studying"
    };

export const mockStudentsList: Student[] = [
    {
        id: "S001",
        name: "Nguyen Van A",
        dob: "2002-05-15",
        gender: "Male",
        faculty: "Information Technology",
        academicYear: 2020,
        program: "High-Quality",
        address: "123 Le Loi Street, District 1, Ho Chi Minh City",
        email: "nguyenvana@example.com",
        phone: "0123456789",
        status: "Studying"
    },
    {
        id: "S002",
        name: "Tran Thi B",
        dob: "2001-09-22",
        gender: "Female",
        faculty: "Physics",
        academicYear: 2019,
        program: "Project-Based",
        address: "456 Nguyen Trai Street, District 5, Ho Chi Minh City",
        email: "tranthib@example.com",
        phone: "0987654321",
        status: "Studying"
    },
    {
        id: "S003",
        name: "Le Van C",
        dob: "2003-03-10",
        gender: "Male",
        faculty: "Chemistry",
        academicYear: 2021,
        program: "Regular",
        address: "789 Dien Bien Phu Street, Binh Thanh District, Ho Chi Minh City",
        email: "levanc@example.com",
        phone: "0369852147",
        status: "Studying"
    },
    {
        id: "S004",
        name: "Pham Minh D",
        dob: "2000-12-05",
        gender: "Male",
        faculty: "Biology",
        academicYear: 2018,
        program: "High-Quality",
        address: "159 Vo Van Ngan Street, Thu Duc City, Ho Chi Minh City",
        email: "phamminhd@example.com",
        phone: "0945123789",
        status: "Graduated"
    },
    {
        id: "S005",
        name: "Hoang Thi E",
        dob: "2002-07-18",
        gender: "Female",
        faculty: "Mathematics and Informatics",
        academicYear: 2020,
        program: "Project-Based",
        address: "753 Hoang Van Thu Street, Tan Binh District, Ho Chi Minh City",
        email: "hoangthie@example.com",
        phone: "0978465123",
        status: "Studying"
    },
    {
        id: "S006",
        name: "Vu Minh F",
        dob: "1999-11-30",
        gender: "Male",
        faculty: "Physics",
        academicYear: 2017,
        program: "Regular",
        address: "234 Pasteur Street, District 3, Ho Chi Minh City",
        email: "vuminhf@example.com",
        phone: "0935124785",
        status: "Graduated"
    },
    {
        id: "S007",
        name: "Doan Thi G",
        dob: "2001-06-25",
        gender: "Female",
        faculty: "Chemistry",
        academicYear: 2019,
        program: "High-Quality",
        address: "678 Tran Hung Dao Street, District 1, Ho Chi Minh City",
        email: "doanthig@example.com",
        phone: "0903124879",
        status: "Studying"
    },
];

export const mockDataStatus: string[] = [
    "Studying",
    "Graduated",
    "Dropped Out"
];

export const mockDataFaculties: string[] = [
    "Physics",
    "Chemistry",
    "Information Technology",
    "Biology",
    "Mathematics and Informatics"
];

export const mockDataPrograms: string[] = [
    "High-Quality",
    "Project-Based",
    "Regular"
];