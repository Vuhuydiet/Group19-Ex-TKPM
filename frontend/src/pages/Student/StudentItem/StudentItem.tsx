import './student_item.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMarsStroke, faVenus } from '@fortawesome/free-solid-svg-icons'
import { Student } from '../../../services/classes/Student';
import { StudentAPIServices } from '../../../services/studentAPIServices';
import { useNotification } from '../../../contexts/NotificationProvider';
import { useCategory } from '../../../contexts/CategoryProvider';
import StudentAddress from '../Form/StudentAddress/StudentAddress';
import StudentIdentity from '../Form/StudentIdentity/StudentIdentity';
import { dateFormatterInput } from '../../../utils/DateFormater';
import { useTranslation } from 'react-i18next';
import IdentityDocument, { OldIdentityCard, NewIdentityCard, Passport } from "../../../services/classes/IdentityDocument";

// import { set } from 'lodash';
// import { useLoading } from "./LoadingContext";
// import { useConfirmPrompt } from './ConfirmPromptContext'

type StudentItemProps = {
    selectedStudent: Student;
    setSelectedStudent: any;
    students: any;
    setStudents: any;
}



function StudentItem({ selectedStudent, setSelectedStudent, students, setStudents }: StudentItemProps) {
    const { t } = useTranslation();
    const [isHidePermanentAddress, setIsHidePermanentAddress] = useState(true);
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
            notify({ type: "error", msg: "Please fill in all fields" });
            return;
        }

        try {
            const { id, ...studentData } = studentInfo;
            const studentAPIServices = new StudentAPIServices();
            const response = await studentAPIServices.updateStudent(studentInfo.id, studentData);
            if (response) {
                notify({ type: "success", msg: "Student updated successfully" });
                setStudents(students.map((student: Student) => student.id === response.id ? response : student));
                setSelectedStudent(undefined);
            } else {
                notify({ type: "error", msg: "Update student failed" });
            }
        } catch {
            notify({ type: "error", msg: "Update student failed" });
        }
    }

    async function handleDelete() {
        if (!window.confirm("Are you sure you want to delete this student?")) return;

        try {

            const studentAPIServices = new StudentAPIServices();
            await studentAPIServices.removeStudent(studentInfo.id);

            // await removeStudent(studentInfo.id); // Gọi API xóa sinh viên

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
            {!isHidePermanentAddress && <StudentAddress title={t('other.permanentAddress')} description={t('other.permanentAddressDescription')} setAddress={(address: any) => setStudentInfo(studentInfo.withUpdated({permanentAddress: address }))} setIsHide={setIsHidePermanentAddress} />}
            {!isHideTemporaryAddress && <StudentAddress title={t('other.temporaryAddress')} description={t('other.temporaryAddressDescription')} setAddress={(address: any) => setStudentInfo(studentInfo.withUpdated({ ...studentInfo, temporaryAddress: address }))} setIsHide={setIsHideTemporaryAddress} />}
            {!isHideIdentity && <StudentIdentity
                setStudentIdentity={(identityDoc: IdentityDocument) => {
                    // Thêm ép kiểu 'as' ở đây
                    setStudentInfo(studentInfo.withUpdated({
                        identityDocument: identityDoc as OldIdentityCard | NewIdentityCard | Passport
                    }));
                }}
                setIsHide={setIsHideIdentity}
            />}
            
            <div className="virtual-background">
                <div className="studentitem">
                    <div className="studentitem__header">
                        <span>
                            {t('other.studentInfo')}
                        </span>
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
                                        onChange={(e) => setStudentInfo(studentInfo.withUpdated({name: e.target.value }))}
                                        disabled={!isEdit} />

                                </div>

                                <div className="studentitem__field">
                                    <input
                                        value={studentInfo.id}
                                        type="text"
                                        onChange={(e) => setStudentInfo(studentInfo.withUpdated({ id: e.target.value }))}
                                        disabled={!isEdit} />

                                    <input
                                        value={studentInfo.academicYear}
                                        type="text"
                                        onChange={(e) => setStudentInfo(studentInfo.withUpdated({ academicYear: Number(e.target.value) }))}
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
                                        if (!isEdit) return;
                                        setIsHideIdentity(false);
                                    }}
                                >
                                    {studentInfo.identityDocument
                                        ? studentInfo.identityDocument.getDisplayInfo() // Sử dụng getDisplayInfo
                                        : t('other.chooseIdentityDocument')
                                    }
                                </button>

                            </div>
                        </div>

                        <div className="studentitem__right">
                            <div className="studentitem__info">
                                <div className="studentitem__info__item">
                                    <span>
                                        {t('tableHeading.dob')}
                                    </span>
                                    <input
                                        value={studentInfo.dob ? dateFormatterInput(studentInfo.dob) : ""}
                                        type="date"
                                        onChange={(e) => setStudentInfo(studentInfo.withUpdated({ ...studentInfo, dob: e.target.value }))}
                                        disabled={!isEdit} />
                                </div>

                                <div className="studentitem__info__item">
                                    <span>
                                        {t('tableHeading.email')}
                                    </span>
                                    <input
                                        value={studentInfo.email}
                                        type="text"
                                        onChange={(e) => setStudentInfo(studentInfo.withUpdated({ ...studentInfo, email: e.target.value }))}
                                        disabled={!isEdit} />
                                </div>

                                <div className="studentitem__info__item">
                                    <span>
                                        {t('tableHeading.permanent')}
                                    </span>
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
                                                setIsHidePermanentAddress(false);
                                            }
                                        }
                                    >{studentInfo.permanentAddress.street}, {studentInfo.permanentAddress.ward}, {studentInfo.permanentAddress.district}, {studentInfo.permanentAddress.city}</button>
                                </div>

                                <div className="studentitem__info__item">
                                    <span>
                                        {t('tableHeading.temporary')}
                                    </span>
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
                                    >{
                                            studentInfo.temporaryAddress && studentInfo.temporaryAddress.city !== ""
                                                ? `${studentInfo.temporaryAddress.street}, ${studentInfo.temporaryAddress.ward}, ${studentInfo.temporaryAddress.district}, ${studentInfo.temporaryAddress.city}`
                                                : "None"
                                        }
                                    </button>
                                </div>

                                <div className="studentitem__info__item">
                                    <span>
                                        {t('tableHeading.phone')}
                                    </span>
                                    <input
                                        value={studentInfo.phone}
                                        type="text"
                                        onChange={(e) => setStudentInfo(studentInfo.withUpdated({  phone: e.target.value }))}
                                        disabled={!isEdit} />
                                </div>

                                <div className="studentitem__info__item">
                                    <span>
                                        {t('tableHeading.faculty')}
                                    </span>
                                    <select
                                        value={studentInfo.faculty}
                                        onChange={(e) => setStudentInfo(studentInfo.withUpdated({ faculty: e.target.value }))}
                                        disabled={!isEdit} >
                                        {category.faculty.map((faculty, index) => (
                                            <option key={index} value={faculty.id}>{faculty.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="studentitem__info__item">
                                    <span>
                                        {t('tableHeading.program')}
                                    </span>
                                    <select
                                        value={studentInfo.program}
                                        onChange={(e) => setStudentInfo(studentInfo.withUpdated({  program: e.target.value }))}
                                        disabled={!isEdit} >
                                        {category.programs.map((program, index) => (

                                            <option key={index} value={program.id}>{program.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="studentitem__info__item">
                                    <span>
                                        {t('tableHeading.status')}
                                    </span>
                                    <select
                                        value={studentInfo.status}
                                        onChange={(e) => setStudentInfo(studentInfo.withUpdated({ ...studentInfo, status: e.target.value }))}
                                        disabled={!isEdit} >
                                        {category.status.map((status, index) => (
                                            <option key={index} value={status.id}>{status.name}</option>
                                        ))}
                                    </select>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="studentitem__footer">
                        <div className="studentitem__button">
                            <button onClick={() => setSelectedStudent(undefined)}>
                                {t('button.cancel')}
                            </button>
                            {/* <button>Delete</button> */}
                            <button onClick={handleDelete}>
                                {t('button.delete')}
                            </button>
                            <button onClick={() => setIsEdit(!isEdit)}>
                                {isEdit ? t('button.back') : t('button.edit')}
                            </button>
                            <button onClick={handleSave}
                            >
                                {t('button.update')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentItem;