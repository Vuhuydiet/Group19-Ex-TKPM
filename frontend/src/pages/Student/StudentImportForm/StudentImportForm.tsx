import { useState } from "react";
import "./student_import_form.css";
import { mockDataFaculties, mockDataPrograms, Student } from "../Student.constant";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPencil } from '@fortawesome/free-solid-svg-icons'
// import { useLoading } from '../components/LoadingContext';
// import { useNotification } from "../components/NotificationContext";
// import { useConfirmPrompt } from "../components/ConfirmPromptContext";

function StudentImportForm() {
    // const { setIsLoading } = useLoading();
    // const { setIsConfirmPrompt, setConfirmPromptData } = useConfirmPrompt();
    // const { notify } = useNotification();

    const [student, setStudent] = useState<Student>({
        ID: "",
        name: "",
        dateOfBirth: "",
        gender: "",
        program: "",
        academicYear: "",
        faculty: "",
        address: "",
        email: "",
        phoneNumber: "",
        status: "",
    });

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
                            value={student.ID}
                            onChange={(e) => setStudent({ ...student, ID: e.target.value })}
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
                            value={student.dateOfBirth}
                            onChange={(e) => setStudent({ ...student, dateOfBirth: e.target.value })}
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
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>

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
                            onChange={(e) => setStudent({ ...student, email: e.target.value })}
                            placeholder="Enter student's email" />
                    </div>

                    <div className="productimport__form__item">
                        <span>Phone</span>
                        <input
                            value={student.phoneNumber}
                            type="text"
                            onChange={(e) => setStudent({ ...student, phoneNumber: e.target.value })}
                            placeholder="Enter student's phone number" />
                    </div>

                </div>

                <div className="productimport__form__footer">
                    <div className="productimport__form__button">
                        <button>Reset</button>
                        <button>Import</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentImportForm;
