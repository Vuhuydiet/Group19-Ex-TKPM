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
        id: "SV001",
        name: "Nguyễn Văn A",
        dob: "2002-05-15",
        gender: "Nam",
        faculty: "Khoa Luật",
        academicYear: 2020,
        program: "Chất lượng cao",
        address: "123 Lê Lợi, Quận 1, TP.HCM",
        email: "nguyenvana@example.com",
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
        address: "456 Nguyễn Trãi, Quận 5, TP.HCM",
        email: "tranthib@example.com",
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
        address: "789 Điện Biên Phủ, Bình Thạnh, TP.HCM",
        email: "levanc@example.com",
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
        address: "159 Võ Văn Ngân, TP. Thủ Đức, TP.HCM",
        email: "phamminhd@example.com",
        phone: "0945123789",
        status: "Đã tốt nghiệp"
    },
    {
        id: "SV005",
        name: "Hoàng Thị E",
        dob: "2002-07-18",
        gender: "Nữ",
        faculty: "Khoa Tiếng Anh thương mại",
        academicYear: 2020,
        program: "Đề án",
        address: "753 Hoàng Văn Thụ, Tân Bình, TP.HCM",
        email: "hoangthie@example.com",
        phone: "0978465123",
        status: "Đang học"
    },
    {
        id: "SV006",
        name: "Vũ Minh F",
        dob: "1999-11-30",
        gender: "Nam",
        faculty: "Khoa Tiếng Nhật",
        academicYear: 2017,
        program: "Chính quy",
        address: "234 Pasteur, Quận 3, TP.HCM",
        email: "vuminhf@example.com",
        phone: "0935124785",
        status: "Đã tốt nghiệp"
    },
    {
        id: "SV007",
        name: "Đoàn Thị G",
        dob: "2001-06-25",
        gender: "Nữ",
        faculty: "Khoa Tiếng Pháp",
        academicYear: 2019,
        program: "Chất lượng cao",
        address: "678 Trần Hưng Đạo, Quận 1, TP.HCM",
        email: "doanthig@example.com",
        phone: "0903124879",
        status: "Đang học"
    },
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