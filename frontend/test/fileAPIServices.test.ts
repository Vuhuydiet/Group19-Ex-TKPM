import axios from "axios";
import { 
  exportStudentsJSON, 
  importStudentsJSON, 
  exportStudentsXML, 
  importStudentsXML 
} from "../src/services/fileAPIServices";
import {mockStudentsList} from "../src/services/mockData";


jest.mock("axios");

describe("File Import/Export API Services", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call API to export students as JSON", async () => {
    const mockBlob = new Blob(["[{id: '1', name: 'Test'}]"], { type: "application/json" });
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockBlob });

    const data = await exportStudentsJSON();

    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/utils/json", { responseType: "blob" });
    expect(data).toBe(mockBlob);
  });

  it("should call API to import students as JSON", async () => {
    // const mockStudents = [{ id: "1", name: "Test Student", email: "test@example.com" }];
    // (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue({ status: 200 });

    // await importStudentsJSON(mockStudents);
    await importStudentsJSON(mockStudentsList);

    expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/utils/json", {
      students: JSON.stringify(mockStudentsList),
    });
  });

  it("should call API to export students as XML", async () => {
    const mockBlob = new Blob(["<students><student>...</student></students>"], { type: "application/xml" });
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValue({ data: mockBlob });

    const data = await exportStudentsXML();

    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/utils/xml", { responseType: "blob" });
    expect(data).toBe(mockBlob);
  });

  it("should call API to import students as XML", async () => {
    const xmlData = `<students><student><id>1</id><name>Test Student</name></student></students>`;
    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValue({ status: 200 });

    await importStudentsXML(xmlData);

    expect(axios.post).toHaveBeenCalledWith("http://localhost:3000/utils/xml", {
      students: xmlData,
    });
  });
});
