
export interface Program {
    id: string;
    name: string;
    description: string;
    createdAt: string;

}

export const mockDataPrograms: Program[] = [
    {
        id: "1",
        name: "Chất lượng cao",
        description: "Chương trình chất lượng cao dành cho sinh viên xuất sắc.",
        createdAt: "2023-01-01T00:00:00Z"
    },
    {
        id: "2",
        name: "Đề án",
        description: "Chương trình đề án dành cho sinh viên có dự án nghiên cứu.",
        createdAt: "2023-01-02T00:00:00Z"
    },
    {
        id: "3",
        name: "Chính quy",
        description: "Chương trình chính quy dành cho tất cả sinh viên.",
        createdAt: "2023-01-03T00:00:00Z"
    }
];