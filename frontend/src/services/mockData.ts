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
        data: {}
    },
    phone: "0123456789",
    status: "Đang học"
};

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
      data: {}
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
      type: "OldIdentityCard",
      data: {}
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
      type: "Passport",
      data: {}
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
      type: "NewIdentityCard",
      data: {}
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