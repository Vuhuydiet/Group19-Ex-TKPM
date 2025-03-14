import { useState } from "react";
import "./student_import_form.css";
import { mockDataFaculties, mockDataPrograms } from '../../../services/mockData';
import { addStudent, Student } from "../../../services/studentAPIServices";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPencil } from '@fortawesome/free-solid-svg-icons'
// import { useLoading } from '../components/LoadingContext';
import { useNotification } from "../../../contexts/NotificationProvider";
// import { useConfirmPrompt } from "../components/ConfirmPromptContext";

function StudentImportForm() {
    // const { setIsLoading } = useLoading();
    // const { setIsConfirmPrompt, setConfirmPromptData } = useConfirmPrompt();
    const { notify } = useNotification();

    const [student, setStudent] = useState<Student>({
        id: "",
        name: "",
        dob: "",
        gender: "",
        program: "",
        academicYear: new Date().getFullYear(),
        faculty: "",
        address: "",
        email: "",
        phone: "",
        status: "",
    });

    async function handleAddStudent() {
        if (student.id === "" || student.name === "" || student.dob === "" || student.email === "" || student.address === "" || student.phone === "") {
            // notify("Please fill in all fields", "error");
            notify({ type: "error", msg: "Please fill in all fields" });
            return;
        }

        const email = student.email;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            notify({ type: "error", msg: "Invalid email format" });
            return;
        }

        const phone = student.phone;
        const phoneRegex = /^(0\d{9})$/;
        if (!phoneRegex.test(phone)) {
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
                address: "",
                email: "",
                phone: "",
                status: "",
            });

            console.log(response);
            notify({ type: "success", msg: "Add student successfully" });

        } catch {
            notify({ type: "error", msg: "Add student failed" });
        }
    }

    return (
        <>
            <div className="productimport">
                <div className="productimport__header">
                    <div className="productimport__left">
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

                <div className="productimport__form">
                    <div className="productimport__form__item">
                        <span>ID</span>
                        <input
                            value={student.id}
                            onChange={(e) => setStudent({ ...student, id: e.target.value })}
                            type="text"
                            placeholder="Enter student's ID" />
                    </div>

                    {/* Input Price */}
                    <div className="productimport__form__item">
                        <span>Name</span>
                        <input
                            value={student.name}
                            onChange={(e) => setStudent({ ...student, name: e.target.value })}

                            type="text"
                            placeholder="Enter student's name   " />
                    </div>

                    <div className="productimport__form__item">
                        <span>Date of birth</span>
                        <input
                            value={student.dob}
                            onChange={(e) => setStudent({ ...student, dob: e.target.value })}
                            type="date"
                            placeholder="Enter student's date of birth" />
                    </div>

                    <div className="productimport__form__item">
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

                    <div className="productimport__form__item">
                        <span>Faculty</span>
                        <select
                            value={student.faculty}
                            onChange={(e) => setStudent({ ...student, faculty: e.target.value })}
                        >
                            <option value="" disabled>
                                Choose student's faculty
                            </option>
                            {mockDataFaculties.map((faculty, index) => (
                                <option key={index} value={faculty}>
                                    {faculty}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div className="productimport__form__item">
                        <span>Program</span>
                        <select
                            value={student.program}
                            onChange={(e) => setStudent({ ...student, program: e.target.value })}
                        >
                            <option value="" disabled>
                                Choose student's program
                            </option>
                            {mockDataPrograms.map((program, index) => (
                                <option key={index} value={program}>
                                    {program}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div className="productimport__form__item">
                        <span>Address</span>
                        <input
                            value={student.address}
                            type="text"
                            onChange={(e) => setStudent({ ...student, address: e.target.value })}
                            placeholder="Enter student's address" />
                    </div>

                    <div className="productimport__form__item">
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

                    <div className="productimport__form__item">
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

                </div>

                <div className="productimport__form__footer">
                    <div className="productimport__form__button">
                        <button>Reset</button>
                        <button onClick={handleAddStudent}>Add</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentImportForm;
