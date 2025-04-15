import axios from "axios";
import { getStudyStatuses} from "../src/services/studentStatusAPIServices";
import { StudyStatus, addStudyStatus, updateStudyStatus } from "../src/services/studentStatusAPIServices"; // Import the StudyStatus interface

jest.mock("axios"); // Mock axios
describe("Student Status API Service Tests", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mock calls before each test
    });

    // Test getStudyStatuses()
    // Test getStudyStatuses()
    it("should fetch all study statuses", async () => {
        const mockResponse = {
            domainCode: "999",
            message: "Study statuses found",
            metadata: {
                statuses: [
                    {
                        id: "DH",
                        name: "Đang học",
                        description: null,
                        createdAt: "2025-03-28T13:23:10.305Z"
                    },
                    {
                        id: "TN",
                        name: "Đã tốt nghiệp",
                        description: null,
                        createdAt: "2025-03-28T13:23:10.305Z"
                    },
                    {
                        id: "TH",
                        name: "Đã thôi học",
                        description: null,
                        createdAt: "2025-03-28T13:23:10.305Z"
                    },
                    {
                        id: "TD",
                        name: "Tạm dừng học",
                        description: null,
                        createdAt: "2025-03-28T13:23:10.305Z"
                    },
                    {
                        id: "VB",
                        name: "Vỹ Buồi",
                        description: "Bùi Đình Gia Vỹ",
                        createdAt: "2025-04-15T14:20:08.564Z"
                    }
                ]
            }
        };

        const mockResult: StudyStatus[] = mockResponse.metadata.statuses;

        (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockResponse });

        const statuses = await getStudyStatuses();

        expect(statuses).toEqual(mockResult);
        expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/study-status");
    });

    // Test addStudyStatus()
    it("should add a new study status", async () => {
        const newStatus: StudyStatus = {
            id: "NEWSTATUS",
            name: "New Status",
            description: "hehe",
            createdAt: "2025-04-15T14:42:21.010Z"
        };

        const mockResponse = {
            domainCode: "999",
            message: "Study status added successfully",
            metadata: {
                studyStatus: {
                    id: "NEWSTATUS",
                    name: "New Status",
                    description: "hehe",
                    createdAt: "2025-04-15T14:42:21.010Z"
                }
            }
        };

        (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue({ data: mockResponse });

        const status = await addStudyStatus(newStatus);

        expect(status).toEqual(newStatus);
        expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/study-status", newStatus);
    });

    // Test updateStudyStatus()
    it("should update a study status", async () => {
        const updatedStatus: StudyStatus = {
            id: "VB",
            name: "Vỹ Bùi",
            description: "Vỹ Khôi Thịnh Long Văn",
            createdAt: "2025-04-15T14:20:08.564Z"
        };

        const mockResponse = {
            domainCode: "999",
            message: "Study status updated successfully",
            metadata: {
                studyStatus: {
                    id: "VB",
                    name: "Vỹ Bùi",
                    description: "Vỹ Khôi Thịnh Long Văn",
                    createdAt: "2025-04-15T14:20:08.564Z"
                }
            }
        };

        (axios.patch as jest.MockedFunction<typeof axios.patch>).mockResolvedValue({ data: mockResponse });

        const status = await updateStudyStatus("NEWSTATUS", updatedStatus);

        expect(status).toEqual(mockResponse.metadata.studyStatus);
        expect(axios.patch).toHaveBeenCalledWith("http://localhost:3000/study-status/NEWSTATUS", updatedStatus);
    });
});