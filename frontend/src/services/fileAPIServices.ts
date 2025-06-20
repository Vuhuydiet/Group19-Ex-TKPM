import axios from "axios";
import { Student } from "./studentAPIServices"; // Import interface

const API_BASE_URL = "http://localhost:3000/utils/students";

export class FileAPIServices {
  constructor() {
    // Constructor logic if needed
  }

  // Export students as JSON
  exportStudentsJSON = async () => {
    const response = await axios.get(`${API_BASE_URL}/json`, {
      responseType: "blob",
    });
    return response.data;
  };

  // Import students from JSON
  importStudentsJSON = async (students: Student[]) => {
    return await axios.post(`${API_BASE_URL}/json`, {
      students: JSON.stringify(students),
    });
  };

  // Export students as XML
  exportStudentsXML = async () => {
    const response = await axios.get(`${API_BASE_URL}/xml`, {
      responseType: "blob",
    });
    return response.data;
  };

  // Import students from XML
  importStudentsXML = async (xmlString: string) => {
    return await axios.post(`${API_BASE_URL}/xml`, {
      students: xmlString,
    });
  };
}

