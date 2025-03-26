import './student_item.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMarsStroke, faVenus } from '@fortawesome/free-solid-svg-icons'
import { Student, updateStudent, removeStudent } from '../../../services/studentAPIServices';
import { useNotification } from '../../../contexts/NotificationProvider';
import { useCategory } from '../../../contexts/CategoryProvider';
import StudentAddress from '../Form/StudentAddress/StudentAddress';
import StudentIdentity from '../Form/StudentIdentity/StudentIdentity';
// import { set } from 'lodash';
// import { useLoading } from "./LoadingContext";
// import { useConfirmPrompt } from './ConfirmPromptContext'

type StudentItemProps = {
    selectedStudent: Student;
    setSelectedStudent: any;
    students: any;
    setStudents: any;
}

interface identityDocument {
    type: "OldIdentityCard" | "NewIdentityCard" | "Passport" | "";
    data: any;
}


function StudentItem({ selectedStudent, setSelectedStudent, students, setStudents }: StudentItemProps) {
    const [isHidePernamentAddress, setIsHidePernamentAddress] = useState(true);
    const [isHideTemporaryAddress, setIsHideTemporaryAddress] = useState(true);
    const [isHideIdentity, setIsHideIdentity] = useState(true);
    // const { setIsLoading } = useLoading();
    // const { setIsConfirmPrompt, setConfirmPromptData } = useConfirmPrompt();
    const { category } = useCategory();

    const { notify } = useNotification();
    const [studentInfo, setStudentInfo] = useState<Student>(selectedStudent);
    const [isEdit, setIsEdit] = useState(false);

    async function handleSave() {
        if (studentInfo.id === "" || studentInfo.name === "" || studentInfo.dob === "" || studentInfo.email === "" || studentInfo.phone === "") {
            // notify("Please fill in all fields", "error");
            notify({ type: "error", msg: "Please fill in all fields" });
            return;
        }

        try {
            // Bỏ thuộc tính id trước khi gửi request (do bên BE không có setter cho ID -> không thể update ID) //ducnhat24
            const { id, ...studentData } = studentInfo;
            // const response = await updateStudent(studentInfo.id, studentInfo);
            const response = await updateStudent(studentInfo.id, studentData);
            notify({ type: "success", msg: "Student updated successfully" });
            setStudents(students.map((student: Student) => student.id === response.id ? response : student));
            setSelectedStudent(undefined);
        } catch {
            // notify("Update student failed", "error");
            notify({ type: "error", msg: "Update student failed" });
        }
    }

    async function handleDelete() {
        if (!window.confirm("Are you sure you want to delete this student?")) return;

        try {
            await removeStudent(studentInfo.id); // Gọi API xóa sinh viên

            // Cập nhật danh sách sinh viên sau khi xóa
            setStudents(students.filter((student: Student) => student.id !== studentInfo.id));
            setSelectedStudent(undefined);

            notify({ type: "success", msg: "Student deleted successfully" });
        } catch {
            notify({ type: "error", msg: "Delete student failed" });
        }
    }


    return (
        <>
            {!isHidePernamentAddress && <StudentAddress title="Pernament Address" description="Enter student's pernament address" setAddress={(address: any) => setStudentInfo({ ...studentInfo, permanentAddress: address })} setIsHide={setIsHidePernamentAddress} />}
            {!isHideTemporaryAddress && <StudentAddress title="Temporary Address" description="Enter student's temporary address" setAddress={(address: any) => setStudentInfo({ ...studentInfo, temporaryAddress: address })} setIsHide={setIsHideTemporaryAddress} />}
            {!isHideIdentity && <StudentIdentity setStudentIdentity={(identityDocument: identityDocument) => setStudentInfo({ ...studentInfo, identityDocument: identityDocument })} setIsHide={setIsHideIdentity} />}
            <div className="virtual-background">
                <div className="studentitem">
                    <div className="studentitem__header">
                        <span>Student Information</span>
                    </div>

                    <div className="studentitem__body">

                        <div className="studentitem__left">
                            <div className="studentitem__avatar">
                                {selectedStudent.gender === "Male" ? <FontAwesomeIcon icon={faMarsStroke} className="icon" /> : <FontAwesomeIcon icon={faVenus} className="icon" />}
                            </div>
                            <div className="studentitem__general">
                                <div className="studentitem__general__header">
                                    <input
                                        value={studentInfo.name}
                                        type="text"
                                        onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                                        disabled={!isEdit} />

                                </div>

                                <div className="studentitem__field">
                                    <input
                                        value={studentInfo.id}
                                        type="text"
                                        onChange={(e) => setStudentInfo({ ...studentInfo, id: e.target.value })}
                                        disabled={!isEdit} />

                                    <input
                                        value={studentInfo.academicYear}
                                        type="text"
                                        onChange={(e) => setStudentInfo({ ...studentInfo, academicYear: Number(e.target.value) })}
                                        disabled={!isEdit} />
                                </div>
{/* 
                                <button
                                    onClick={() => {
                                        if (!isEdit) {
                                            return;
                                        }
                                        setIsHideIdentity(false);
                                    }}
                                >{studentInfo.identityDocument.type + " - " + studentInfo.identityDocument.data?.ID}</button> */}
                                <button
                                    onClick={() => {
                                        if (!isEdit) {
                                            return;
                                        }
                                        setIsHideIdentity(false);
                                    }}
                                >
                                    {studentInfo.identityDocument.type === "" 
                                        ? "Choose student's identity" 
                                        : `${studentInfo.identityDocument.type} - ${
                                            studentInfo.identityDocument.data 
                                            ? ('id' in studentInfo.identityDocument.data 
                                                ? studentInfo.identityDocument.data.id 
                                                : studentInfo.identityDocument.data.passportNumber)
                                            : ""
                                        }`}
                                </button>

                            </div>
                        </div>

                        <div className="studentitem__right">
                            <div className="studentitem__info">
                                <div className="studentitem__info__item">
                                    <span>DOB</span>
                                    <input
                                        value={studentInfo.dob}
                                        type="date"
                                        onChange={(e) => setStudentInfo({ ...studentInfo, dob: e.target.value })}
                                        disabled={!isEdit} />
                                </div>

                                <div className="studentitem__info__item">
                                    <span>Email</span>
                                    <input
                                        value={studentInfo.email}
                                        type="text"
                                        onChange={(e) => setStudentInfo({ ...studentInfo, email: e.target.value })}
                                        disabled={!isEdit} />
                                </div>

                                <div className="studentitem__info__item">
                                    <span>Pernament</span>
                                    <button
                                        style={{
                                            backgroundColor: isEdit ? "var(--main-color)" : "transparent",
                                            color: isEdit ? "var(--text-in-background-color)" : "var(--text-color)"
                                        }}

                                        onClick={
                                            () => {
                                                if (!isEdit) {
                                                    return;
                                                }
                                                setIsHidePernamentAddress(false);
                                            }
                                        }
                                    >{studentInfo.permanentAddress.street}, {studentInfo.permanentAddress.ward}, {studentInfo.permanentAddress.district}, {studentInfo.permanentAddress.city}</button>
                                </div>

                                <div className="studentitem__info__item">
                                    <span>Temporary</span>
                                    <button
                                        style={{
                                            backgroundColor: isEdit ? "var(--main-color)" : "transparent",
                                            color: isEdit ? "var(--text-in-background-color)" : "var(--text-color)"
                                        }}
                                        onClick={
                                            () => {
                                                if (!isEdit) {
                                                    return;
                                                }
                                                setIsHideTemporaryAddress(false);
                                            }
                                        }
                                    >{studentInfo.temporaryAddress.city !== "" ? (studentInfo.temporaryAddress.street +
                                        ', ' + studentInfo.temporaryAddress.ward +
                                        ',' + studentInfo.temporaryAddress.district +
                                        ',' + studentInfo.temporaryAddress.city) : "None"}</button>
                                </div>

                                <div className="studentitem__info__item">
                                    <span>Phone</span>
                                    <input
                                        value={studentInfo.phone}
                                        type="text"
                                        onChange={(e) => setStudentInfo({ ...studentInfo, phone: e.target.value })}
                                        disabled={!isEdit} />
                                </div>

                                <div className="studentitem__info__item">
                                    <span>Falcuty</span>
                                    <select
                                        value={studentInfo.faculty}
                                        onChange={(e) => setStudentInfo({ ...studentInfo, faculty: e.target.value })}
                                        disabled={!isEdit} >
                                        {category.faculty.map((faculty, index) => (
                                            <option key={index} value={faculty}>{faculty}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="studentitem__info__item">
                                    <span>Program</span>
                                    <select
                                        value={studentInfo.program}
                                        onChange={(e) => setStudentInfo({ ...studentInfo, program: e.target.value })}
                                        disabled={!isEdit} >
                                        {category.programs.map((program, index) => (

                                            <option key={index} value={program}>{program}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="studentitem__info__item">
                                    <span>Status</span>
                                    <select
                                        value={studentInfo.status}
                                        onChange={(e) => setStudentInfo({ ...studentInfo, status: e.target.value })}
                                        disabled={!isEdit} >
                                        {category.status.map((status, index) => (
                                            <option key={index} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="studentitem__footer">
                        <div className="studentitem__button">
                            <button onClick={() => setSelectedStudent(undefined)}>Back</button>
                            {/* <button>Delete</button> */}
                            <button onClick={handleDelete}>Delete</button>
                            <button onClick={() => setIsEdit(!isEdit)}>
                                {isEdit ? "Cancel" : "Edit"}
                            </button>
                            <button onClick={handleSave}
                            >Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentItem;