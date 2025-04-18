import axios from "axios";
import { Student } from "./studentAPIServices";

export type CourseData = {
  courseId: string;
  courseName: string;
  credits: number;
  grade?: number;
};

export interface AcademicTranscript {
  studentInfo: Student;
  courses: CourseData[];
  totalCredits: number;
  gpa: number;
  createdAt: Date;
}

export const API_BASE_URL = "http://localhost:3000/academic-transcript";

export class AcademicTranscriptAPIServices {
  constructor() {}

  getTranscript = async (studentId: string): Promise<AcademicTranscript> => {
    const response = await axios.get(`${API_BASE_URL}/${studentId}`);
    return response.data.metadata;
  };

  // exportTranscriptToJson = async (studentId: string): Promise<string | undefined> => {
  //   try {
  //     const transcript = await this.getTranscript(studentId);

  //     // Đặt tên file dựa vào student ID
  //     const fileName = `transcript_${studentId}.json`;
  //     const filePath = path.join(__dirname, fileName);

  //     // Ghi dữ liệu ra file
  //     fs.writeFileSync(filePath, JSON.stringify(transcript, null, 2), "utf-8");

  //     console.log(`Export thành công: ${filePath}`);
  //     return filePath; // Trả về đường dẫn file đã xuất
  //   } catch (error) {
  //     console.error("Lỗi khi export transcript:", error);
  //   }
    
  // };


  exportTranscriptToJson = async (studentId: string): Promise<string | void> => {
    try {
      const transcript = await this.getTranscript(studentId);

      // Chuyển transcript thành chuỗi JSON
      const json = JSON.stringify(transcript, null, 2);

      // Tạo Blob từ JSON
      const blob = new Blob([json], { type: "application/json" });

      // Tạo đường dẫn tạm thời cho blob
      const url = URL.createObjectURL(blob);

      // Tạo thẻ <a> ẩn để kích hoạt download
      const link = document.createElement("a");
      link.href = url;
      link.download = `transcript_${studentId}.json`; // Tên file khi lưu
      document.body.appendChild(link);
      link.click(); // Tự động click để tải
      document.body.removeChild(link); // Dọn dẹp
      URL.revokeObjectURL(url); // Giải phóng URL blob

      console.log("Export thành công!");




      return "success"; // Trả về đường dẫn file đã xuất
    } catch (error) {
      console.error("Lỗi khi export transcript:", error);
      return undefined; // Trả về undefined nếu có lỗi
    }
};
}
