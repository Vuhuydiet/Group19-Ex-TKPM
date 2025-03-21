import axios from "axios";
import { Student } from "./studentAPIServices"; // Import interface

const API_BASE_URL = "http://localhost:3000/utils";

// Export students as JSON
export const exportStudentsJSON = async () => {
  const response = await axios.get(`${API_BASE_URL}/json`, {
    responseType: "blob", 
  });
  return response.data;
};

// Import students from JSON
export const importStudentsJSON = async (students: Student[]) => {
  return await axios.post(`${API_BASE_URL}/json`, {
    students: JSON.stringify(students),
  });
};

// Export students as XML
export const exportStudentsXML = async () => {
  const response = await axios.get(`${API_BASE_URL}/xml`, {
    responseType: "blob",
  });
  return response.data;
};

// Import students from XML
export const importStudentsXML = async (xmlString: string) => {
  return await axios.post(`${API_BASE_URL}/xml`, {
    students: xmlString,
  });
};
