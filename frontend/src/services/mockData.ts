import { Module } from "./moduleAPIServices";
import { Student } from "./studentAPIServices";

export const mockStudent: Student = {
  id: "SV001",
  name: "Nguyễn Văn A",
  dob: "2002-05-15",
  gender: "Nam",
  faculty: "Khoa Luật",
  academicYear: 2020,
  program: "Chất lượng cao",
  permanentAddress: {
    city: "TP.HCM",
    district: "Quận 1",
    ward: "Bến Nghé",
    street: "123 Lê Lợi"
  },
  temporaryAddress: {
    city: "TP.HCM",
    district: "Quận 1",
    ward: "Bến Thành",
    street: "456 Nguyễn Huệ"
  },
  nationality: "Việt Nam",
  email: "nguyenvana@example.com",
  identityDocument: {
    type: "NewIdentityCard",
    data: {
      id: "079403029299",
      issuedDate: "2021-12-21",
      issuedPlace: "Ho Chi Minh",
      expiredDate: "2029-12-01",
      hasChip: true
    }
  },
  phone: "0123456789",
  status: "Đang học"
}

export const mockStudentsList: Student[] = [
  {
    id: "SV001",
    name: "Nguyễn Văn A",
    dob: "2002-05-15",
    gender: "Nam",
    faculty: "Khoa Luật",
    academicYear: 2020,
    program: "Chất lượng cao",
    permanentAddress: {
      city: "TP.HCM",
      district: "Quận 1",
      ward: "Bến Nghé",
      street: "123 Lê Lợi"
    },
    temporaryAddress: {
      city: "TP.HCM",
      district: "Quận 1",
      ward: "Bến Thành",
      street: "456 Nguyễn Huệ"
    },
    nationality: "Việt Nam",
    email: "nguyenvana@example.com",
    identityDocument: {
      type: "NewIdentityCard",
      data: {
        id: "079403029299",
        issuedDate: "2021-12-21",
        issuedPlace: "Ho Chi Minh",
        expiredDate: "2029-12-01",
        hasChip: true
      }
    },
    phone: "0123456789",
    status: "Đang học"
  },
  {
    id: "SV002",
    name: "Trần Thị B",
    dob: "2001-09-22",
    gender: "Nữ",
    faculty: "Khoa Tiếng Anh thương mại",
    academicYear: 2019,
    program: "Đề án",
    permanentAddress: {
      city: "TP.HCM",
      district: "Quận 5",
      ward: "Phường 5",
      street: "456 Nguyễn Trãi"
    },
    temporaryAddress: {
      city: "TP.HCM",
      district: "Quận 5",
      ward: "Phường 7",
      street: "789 Trần Hưng Đạo"
    },
    nationality: "Việt Nam",
    email: "tranthib@example.com",
    identityDocument: {
      type: "NewIdentityCard",
      data: {
        id: "079403029300",
        issuedDate: "2021-11-15",
        issuedPlace: "Ho Chi Minh",
        expiredDate: "2029-11-15",
        hasChip: true
      }
    },
    phone: "0987654321",
    status: "Đang học"
  },
  {
    id: "SV003",
    name: "Lê Văn C",
    dob: "2003-03-10",
    gender: "Nam",
    faculty: "Khoa Tiếng Nhật",
    academicYear: 2021,
    program: "Chính quy",
    permanentAddress: {
      city: "TP.HCM",
      district: "Bình Thạnh",
      ward: "Phường 1",
      street: "789 Điện Biên Phủ"
    },
    temporaryAddress: {
      city: "TP.HCM",
      district: "Bình Thạnh",
      ward: "Phường 2",
      street: "159 Nguyễn Xí"
    },
    nationality: "Việt Nam",
    email: "levanc@example.com",
    identityDocument: {
      type: "OldIdentityCard",
      data: {
        id: "079403029301",
        issuedDate: "2015-07-20",
        issuedPlace: "Ho Chi Minh",
        expiredDate: "2025-07-20"
      }
    },
    phone: "0369852147",
    status: "Đang học"
  },
  {
    id: "SV004",
    name: "Phạm Minh D",
    dob: "2000-12-05",
    gender: "Nam",
    faculty: "Khoa Tiếng Pháp",
    academicYear: 2018,
    program: "Chất lượng cao",
    permanentAddress: {
      city: "TP.HCM",
      district: "Thủ Đức",
      ward: "Linh Trung",
      street: "159 Võ Văn Ngân"
    },
    temporaryAddress: {
      city: "TP.HCM",
      district: "Thủ Đức",
      ward: "Linh Chiểu",
      street: "200 Kha Vạn Cân"
    },
    nationality: "Việt Nam",
    email: "phamminhd@example.com",
    identityDocument: {
      type: "Passport",
      data: {
        passportNumber: "C1234567",
        issuedDate: "2018-04-10",
        issuedPlace: "Ho Chi Minh",
        expiredDate: "2028-04-10",
        issuedCountry: "Vietnam",
        note: "Hộ chiếu phổ thông"
      }
    },
    phone: "0945123789",
    status: "Đã tốt nghiệp"
  }
];


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