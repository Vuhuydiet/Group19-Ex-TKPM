import { useEffect, useState } from "react";
import "./student_import_form.css";
import { addStudent, Student } from "../../../../services/studentAPIServices";
import { useNotification } from "../../../../contexts/NotificationProvider";
// import { useConfirmPrompt } from "../components/ConfirmPromptContext";
import StudentAddress from "../StudentAddress/StudentAddress";
import "../../../../styles/form.css";
import StudentIdentity from "../StudentIdentity/StudentIdentity";
import { useCategory } from "../../../../contexts/CategoryProvider";

interface identityDocument {
    type: "OldIdentityCard" | "NewIdentityCard" | "Passport" | "";
    data: any;
}

function StudentImportForm() {
    // const { setIsLoading } = useLoading();
    // const { setIsConfirmPrompt, setConfirmPromptData } = useConfirmPrompt();
    const { notify } = useNotification();
    const { category } = useCategory();

    const [isHidePermanentAddress, setIsHidePermanentAddress] = useState(true);
    const [isHideTemporaryAddress, setIsHideTemporaryAddress] = useState(true);
    const [isHideIdentity, setIsHideIdentity] = useState(true);
    const [student, setStudent] = useState<Student>({
        id: "",
        name: "",
        dob: "",
        gender: "",
        program: "",
        academicYear: new Date().getFullYear(),
        faculty: "",
        permanentAddress: {
            city: "",
            district: "",
            ward: "",
            street: ""
        },
        temporaryAddress: {
            city: "",
            district: "",
            ward: "",
            street: ""
        },
        nationality: "",
        identityDocument: {
            type: "",
            data: null
        },
        email: "",
        phone: "",
        status: "Đang học",
    });

    function isValidEmail(email: string, allowedDomain: string = "student.university.edu.vn"): boolean {
        const escapedDomain = allowedDomain.replace(/\./g, '\\.');

        const emailRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.${escapedDomain}$`);

        return emailRegex.test(email);
    }

    function isValidPhone(phone: string, country: string = "VN"): boolean {
        let phoneRegex;
        switch (country) {
            case "VN":
                phoneRegex = /^(\+84|0)(3[2-9]|5[6-9]|7[0-9]|8[1-9]|9[0-9])[0-9]{7}$/;
                break;
            default:
                return false;
        }
        return phoneRegex.test(phone);
    }



    async function handleAddStudent() {
        if (student.id === ""
            || student.name === ""
            || student.dob === ""
            || student.email === ""
            || student.phone === ""
            || student.gender === ""
            || student.faculty === ""
            || student.program === ""
            || student.permanentAddress.city === ""
            || student.permanentAddress.district === ""
            || student.permanentAddress.ward === ""
            || student.permanentAddress.street === ""
            || student.identityDocument.type === ""
        ) {
            // notify("Please fill in all fields", "error");
            notify({ type: "error", msg: "Please fill in all fields" });
            return;
        }

        const email = student.email;
        if (!isValidEmail(email)) {
            notify({ type: "error", msg: "Invalid email format" });
            return;
        }

        const phone = student.phone;
        if (!isValidPhone(phone)) {
            notify({ type: "error", msg: "Invalid phone number format" });
            return;
        }


        try {
            const response = await addStudent(student);
            setStudent({
                id: "",
                name: "",
                dob: "",
                gender: "",
                program: "",
                academicYear: new Date().getFullYear(),
                faculty: "",
                permanentAddress: {
                    city: "",
                    district: "",
                    ward: "",
                    street: ""
                },
                temporaryAddress: {
                    city: "",
                    district: "",
                    ward: "",
                    street: ""
                },
                nationality: "",
                identityDocument: {
                    type: "",
                    data: null
                },
                email: "",
                phone: "",
                status: "Đang học",
            });

            console.log(response);
            notify({ type: "success", msg: "Add student successfully" });

        } catch {
            notify({ type: "error", msg: "Add student failed" });
        }
    }

    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://restcountries.com/v3.1/all");
                const data = await response.json();
                setCountries(data.map((country: any) => country.name.common));
            } catch (error) {
                console.error("Fetch data error", error);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            {!isHidePermanentAddress && <StudentAddress title="Permanent Address" description="Enter student's permanent address" setAddress={(address: any) => setStudent({ ...student, permanentAddress: address })} setIsHide={setIsHidePermanentAddress} />}
            {!isHideTemporaryAddress && <StudentAddress title="Temporary Address" description="Enter student's temporary address" setAddress={(address: any) => setStudent({ ...student, temporaryAddress: address })} setIsHide={setIsHideTemporaryAddress} />}
            {!isHideIdentity && <StudentIdentity setStudentIdentity={(identityDocument: identityDocument) => setStudent({ ...student, identityDocument: identityDocument })} setIsHide={setIsHideIdentity} />}
            <div className="form">
                <div className="form__header">
                    <div className="header__left">
                        <h1>Student Addition</h1>
                        <p>Import a new student information</p>
                    </div>
                    {/* <div className="productimport__right">
                        <input
                            value={student.academicYear === "" ? new Date().getFullYear().toString() : student.academicYear.slice(0, 4)}
                            onChange={(e) => setStudent({ ...student, academicYear: e.target.value })}
                            type="month" id="yearPicker" />

                    </div> */}
                </div>

                <div className="form__body">
                    <div className="form__field">
                        <span>ID</span>
                        <input
                            value={student.id}
                            onChange={(e) => setStudent({ ...student, id: e.target.value })}
                            type="text"
                            placeholder="Enter student's ID" />
                    </div>

                    {/* Input Price */}
                    <div className="form__field">
                        <span>Name</span>
                        <input
                            value={student.name}
                            onChange={(e) => setStudent({ ...student, name: e.target.value })}

                            type="text"
                            placeholder="Enter student's name   " />
                    </div>

                    <div className="form__field">
                        <span>Date of birth</span>
                        <input
                            value={student.dob}
                            onChange={(e) => setStudent({ ...student, dob: e.target.value })}
                            type="date"
                            placeholder="Enter student's date of birth" />
                    </div>

                    <div className="form__field">
                        <span>Gender</span>
                        <select
                            value={student.gender}
                            onChange={(e) => setStudent({ ...student, gender: e.target.value })}
                        >
                            <option value="" disabled>
                                Choose student's gender
                            </option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>

                        </select>

                    </div>

                    <div className="form__field">
                        <span>Faculty</span>
                        <select
                            value={student.faculty}
                            onChange={(e) => setStudent({ ...student, faculty: e.target.value })}
                        >
                            <option value="" disabled>
                                Choose student's faculty
                            </option>
                            {category.faculty.map((faculty, index) => (
                                <option key={index} value={faculty}>
                                    {faculty}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div className="form__field">
                        <span>Program</span>
                        <select
                            value={student.program}
                            onChange={(e) => setStudent({ ...student, program: e.target.value })}
                        >
                            <option value="" disabled>
                                Choose student's program
                            </option>
                            {category.programs.map((program, index) => (
                                <option key={index} value={program}>
                                    {program}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div className="form__field">
                        <span>Permanent Address</span>
                        <button onClick={
                            () => setIsHidePermanentAddress(false)
                        }>{student.permanentAddress.city === "" ? "Enter student's permanent address" :
                            student.permanentAddress.street + ", " + student.permanentAddress.ward + ", " + student.permanentAddress.district + ", " + student.permanentAddress.city
                            }</button>
                    </div>

                    <div className="form__field">
                        <span>Email</span>
                        <input
                            value={student.email}
                            type="text"
                            onChange={(e) => {
                                setStudent({ ...student, email: e.target.value });
                            }
                            }
                            placeholder="Enter student's email" />
                    </div>

                    <div className="form__field">
                        <span>Phone</span>
                        <input
                            value={student.phone}
                            type="text"
                            onChange={(e) => {
                                setStudent({ ...student, phone: e.target.value });
                            }
                            }
                            placeholder="Enter student's phone number" />
                    </div>

                    <div className="form__field">
                        <span>Temporary Address</span>
                        <button onClick={
                            () => setIsHideTemporaryAddress(false)
                        }>Enter student's temporary address</button>
                    </div>

                    <div className="form__field">
                        <span>Nationality</span>
                        <select
                            value={student.nationality}
                            onChange={(e) => setStudent({ ...student, nationality: e.target.value })}
                        >
                            <option value="" disabled> Choose student's nationlity </option>
                            {countries.map((country, index) => (
                                <option key={index} value={country}>
                                    {country}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* <div className="form__field">
                        <span>Identity</span>
                        <button onClick={
                            () => setIsHideIdentity(false)
                        }>{student.identityDocument.type === "" ? "Choose student's identity" :
                            student.identityDocument.type + " - " + (student.identityDocument.data.ID ? student.identityDocument.data.ID : "")
                            }</button>
                    </div> */}
                    <div className="form__field">
                        <span>Identity</span>
                        <button onClick={() => setIsHideIdentity(false)}>
                            {student.identityDocument.type === "" ? "Choose student's identity" :
                                `${student.identityDocument.type} - ${student.identityDocument.data
                                    ? ('id' in student.identityDocument.data
                                        ? student.identityDocument.data.id
                                        : student.identityDocument.data.passportNumber)
                                    : ""
                                }`
                            }
                        </button>
                    </div>

                </div>

                <div className="form__footer">
                    <div className="form__button">
                        <button>Reset</button>
                        <button onClick={handleAddStudent}>Add</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentImportForm;
