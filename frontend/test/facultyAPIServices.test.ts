import axios from "axios";
import { getFaculties, getFacultyById, addFaculty, updateFaculty } from "../src/services/facultyAPIServices";

import { mockFaculties } from "../src/services/mockData"; // Import mock data
jest.mock("axios"); // Mock axios


describe("Faculty API Service Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mock calls before each test
    });
    
    // Test getFaculties()
    it("should fetch all faculties", async () => {
        const mockResponse = { metadata: mockFaculties };
    
        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockResponse });
    
        const faculties = await getFaculties();
        expect(faculties).toEqual(mockFaculties);
        expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/faculties");
    });

    // Test getFacultyById()
    it("should fetch a faculty by ID", async () => {
        const mockResponse = { metadata: mockFaculties[0] };
    
        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockResponse });
    
        const faculty = await getFacultyById("1");
        expect(faculty).toEqual(mockFaculties[0]);
        expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/faculties/1");
    });

    // Test addFaculty()
    it("should add a new faculty", async () => {
        const mockResponse = { metadata: mockFaculties[0] };
    
        (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue({ data: mockResponse });
    
        const newFaculty = await addFaculty(mockFaculties[0]);
        expect(newFaculty).toEqual(mockFaculties[0]);
        expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/faculties", mockFaculties[0]);
    });

    // Test updateFaculty()
    it("should update a faculty", async () => {
        const updatedData = {
            id: "1",
            name: "Mới cập nhật tên nè",
            description: "Mới cập nhật mô tả nè",
            createdAt: "2023-10-01T00:00:00Z",
        };

        const updatedFaculty = { 
            id: "1",
            name: "Mới cập nhật tên nè",
            description: "Mới cập nhật mô tả nè",
            createdAt: "2023-10-01T00:00:00Z",
         };
    
        (axios.patch as jest.MockedFunction<typeof axios.patch>).mockResolvedValue({
            data: {
                metadata: updatedFaculty,
            }
        });
    
        const result = await updateFaculty("1", updatedData);
        expect(result).toEqual(updatedFaculty);
        expect(axios.patch).toHaveBeenCalledWith("http://localhost:3000/faculties/1", updatedData);
    });
});
    

