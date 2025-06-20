// Sửa lại import
import { Module } from "./moduleAPIServices";
import { Student, Address } from "./classes/Student"; // Import class Student và Address
import { Faculty } from "./facultyAPIServices";
import { NewIdentityCard } from './classes/IdentityDocument';

// SỬA LẠI HOÀN TOÀN MOCK DATA
const permanentAddressMock = new Address("TP.HCM", "Quận 1", "Bến Nghé", "123 Lê Lợi");
const temporaryAddressMock = new Address("TP.HCM", "Quận 1", "Bến Thành", "456 Nguyễn Huệ");
const identityDocumentMock = new NewIdentityCard("079403029299", new Date("2021-12-21"), "Ho Chi Minh", new Date("2029-12-01"), true);

export const mockStudent: Student = new Student(
  "SV001",              // id
  "Nguyễn Văn A",       // name
  "2002-05-15",         // dob
  "Male",               // gender
  "L",                  // faculty (chỉ là ID)
  2020,                 // academicYear
  "CLC",                // programId
  permanentAddressMock, // permanentAddress
  temporaryAddressMock, // temporaryAddress
  "VN",                 // nationality
  "nguyenvana@example.com", // email
  identityDocumentMock, // identityDocument
  "0123456789",         // phone
  "DH"                  // status (chỉ là ID)
);

// mockStudentsList cũng có thể được tạo tương tự nếu cần
export const mockStudentsList: Student[] = [mockStudent];
export const mockDataStatus: string[] = [
  "Đang học",
  "Đã tốt nghiệp",
  "Đã thôi học",
  "Tạm dừng học"
];

export const mockDataFaculties: string[] = [
  "Khoa Luật",
  "Khoa Tiếng Anh thương mại",
  "Khoa Tiếng Nhật",
  "Khoa Tiếng Pháp",
];

export const mockDataPrograms: string[] = [
    "Chất lượng cao",
    "Đề án",
    "Chính quy"
];

export const mockFaculties: Faculty[] = [
  {
    id: "L",
    name: "Khoa Luật",
    description: "Khoa Luật chuyên đào tạo các chuyên ngành về luật pháp và chính trị.",
    createdAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "TA",
    name: "Khoa Tiếng Anh thương mại",
    description: "Khoa Tiếng Anh thương mại chuyên đào tạo các chuyên ngành về tiếng Anh và thương mại.",
    createdAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "TN",
    name: "Khoa Tiếng Nhật",
    description: "Khoa Tiếng Nhật chuyên đào tạo các chuyên ngành về tiếng Nhật và văn hóa Nhật Bản.",
    createdAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "TP",
    name: "Khoa Tiếng Pháp",
    description: "Khoa Tiếng Pháp chuyên đào tạo các chuyên ngành về tiếng Pháp và văn hóa Pháp.",
    createdAt: "2023-01-01T00:00:00Z",
  }
];


export const mockDataModules: Module[] = [
  {
    id: 'M001',
    name: 'Data Structures',
    numOfCredits: 3,
    faculty: 'Computer Science',
    description: 'Introduction to data structures and their applications.',
    prerequisiteModules: []
  },
  {
    id: 'M002',
    name: 'Algorithms',
    numOfCredits: 3,
    faculty: 'Computer Science',
    description: 'Design and analysis of algorithms.',
    prerequisiteModules: ['M001']
  },
  {
    id: 'M003',
    name: 'Operating Systems',
    numOfCredits: 4,
    faculty: 'Computer Science',
    description: 'Study of operating system principles.',
    prerequisiteModules: ['M001']
  },
  {
    id: 'M004',
    name: 'Calculus I',
    numOfCredits: 3,
    faculty: 'Mathematics',
    description: 'Differential and integral calculus.',
    prerequisiteModules: []
  },
  {
    id: 'M005',
    name: 'Linear Algebra',
    numOfCredits: 3,
    faculty: 'Mathematics',
    description: 'Vectors, matrices, and linear transformations.',
    prerequisiteModules: []
  },
  {
    id: 'M006',
    name: 'Computer Networks',
    numOfCredits: 3,
    faculty: 'Computer Science',
    description: 'Network models and protocols.',
    prerequisiteModules: ['M003']
  },
  {
    id: 'M007',
    name: 'Database Systems',
    numOfCredits: 3,
    faculty: 'Information Technology',
    description: 'Relational databases and SQL.',
    prerequisiteModules: ['M001']
  },
  {
    id: 'M008',
    name: 'Artificial Intelligence',
    numOfCredits: 3,
    faculty: 'Computer Science',
    description: 'Foundations of AI and problem-solving techniques.',
    prerequisiteModules: ['M002']
  },
  {
    id: 'M009',
    name: 'Software Engineering',
    numOfCredits: 3,
    faculty: 'Information Technology',
    description: 'Software development lifecycle and practices.',
    prerequisiteModules: ['M002']
  },
  {
    id: 'M010',
    name: 'Probability and Statistics',
    numOfCredits: 3,
    faculty: 'Mathematics',
    description: 'Basic probability theory and statistical inference.',
    prerequisiteModules: ['M004']
  }
];