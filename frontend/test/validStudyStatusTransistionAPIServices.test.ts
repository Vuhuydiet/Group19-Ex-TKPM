import axios from "axios";
import { addValidStudyStatusTransition, removeValidStudyStatusTransition } from "../src/services/validStudyStatusTransitionAPIServices";

jest.mock("axios"); // Mock axios

describe("Valid Study Status Transition API Service Tests", () => {
    beforeAll(() => {
        jest.clearAllMocks(); // Clear any previous mock calls
    });

    // Test addValidStudyStatusTransition()
    it("should add a valid study status transition", async () => {
        const mockResponse = {
            domainCode: "999",
            message: "Valid study status transition added successfully",
            metadata:
            {
                transition: {
                    from: "TD",
                    to: "TN"
                }
            }
        };

        const mockValidStudyStatusTransition = {
            from: "TD",
            to: "TN"
        };

        (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue({ data: mockResponse });

        const transition = await addValidStudyStatusTransition(mockValidStudyStatusTransition);
        expect(transition).toEqual(mockValidStudyStatusTransition);
        expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/study-status-transition", mockValidStudyStatusTransition);
    });

    // Test removeValidStudyStatusTransition()
    it("should remove a valid study status transition", async () => {
        const mockResponse = {
            domainCode: "999",
            message: "Valid study status transition removed successfully",
            metadata: {
                "transition": {
                    "from": "TD",
                    "to": "TN"
                }
            }
        };

        const mockValidStudyStatusTransition = {
            from: "TD",
            to: "TN"
        };

        (axios.delete as jest.MockedFunction<typeof axios.delete>).mockResolvedValue({ data: mockResponse });

        const transition = await removeValidStudyStatusTransition(mockValidStudyStatusTransition);
        expect(transition).toEqual(mockValidStudyStatusTransition);
        expect(axios.delete).toHaveBeenCalledWith("http://localhost:3000/study-status-transition", { data: mockValidStudyStatusTransition });
    });
});
        
    
