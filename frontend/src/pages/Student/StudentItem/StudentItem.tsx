import './student_item.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMarsStroke, faVenus } from '@fortawesome/free-solid-svg-icons'
import { mockDataFaculties, mockDataPrograms, mockDataStatus, Student } from '../Student.constant';
// import { useNotification } from './NotificationContext';
// import { useLoading } from "./LoadingContext";
// import { useConfirmPrompt } from './ConfirmPromptContext'

type StudentItemProps = {
    selectedStudent: Student;
    setSelectedStudent: any;
    students: any;
    setStudents: any;
}

function StudentItem({ selectedStudent, setSelectedStudent, students, setStudents }: StudentItemProps) {
    // const { setIsLoading } = useLoading();
    // const { setIsConfirmPrompt, setConfirmPromptData } = useConfirmPrompt();
    // const { notify } = useNotification();
    const [studentInfo, setStudentInfo] = useState(selectedStudent);
    const [isEdit, setIsEdit] = useState(false);

    return (
        <>
            <div className="item-wrapper">
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
                                        value={studentInfo.ID}
                                        type="text"
                                        onChange={(e) => setStudentInfo({ ...studentInfo, ID: e.target.value })}
                                        disabled={!isEdit} />
                                    -
                                    <input
                                        value={studentInfo.academicYear}
                                        type="text"
                                        onChange={(e) => setStudentInfo({ ...studentInfo, academicYear: e.target.value })}
                                        disabled={!isEdit} />
                                </div>
                            </div>
                        </div>

                        <div className="studentitem__right">
                            <div className="studentitem__info">
                                <div className="studentitem__info__item">
                                    <span>DOB</span>
                                    <input
                                        value={studentInfo.dateOfBirth}
                                        type="date"
                                        onChange={(e) => setStudentInfo({ ...studentInfo, dateOfBirth: e.target.value })}
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
                                    <span>Address</span>
                                    <input
                                        value={studentInfo.address}
                                        type="text"
                                        onChange={(e) => setStudentInfo({ ...studentInfo, address: e.target.value })}
                                        disabled={!isEdit} />
                                </div>

                                <div className="studentitem__info__item">
                                    <span>Phone</span>
                                    <input
                                        value={studentInfo.phoneNumber}
                                        type="text"
                                        onChange={(e) => setStudentInfo({ ...studentInfo, phoneNumber: e.target.value })}
                                        disabled={!isEdit} />
                                </div>

                                <div className="studentitem__info__item">
                                    <span>Falcuty</span>
                                    <select
                                        value={studentInfo.faculty}
                                        onChange={(e) => setStudentInfo({ ...studentInfo, faculty: e.target.value })}
                                        disabled={!isEdit} >
                                        {mockDataFaculties.map((faculty, index) => (
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
                                        {mockDataPrograms.map((program, index) => (

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
                                        {mockDataStatus.map((status, index) => (
                                            <option key={index} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="studentitem__footer">
                        <div className="studentitem__button">
                            <button onClick={() => setSelectedStudent(undefined)}>Cancel</button>
                            <button >Delete</button>
                            <button
                            >Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentItem;