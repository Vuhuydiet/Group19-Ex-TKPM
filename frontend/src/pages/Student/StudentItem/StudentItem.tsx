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
    
        // 1. Tạo một object rỗng để chứa các thay đổi
        const changes: Partial<Student> = {};
    
        // 2. So sánh từng trường giữa state hiện tại (studentInfo) và state gốc (selectedStudent)
        // --- So sánh các trường đơn giản ---
        if (studentInfo.name !== selectedStudent.name) changes.name = studentInfo.name;
        if (studentInfo.dob !== selectedStudent.dob) changes.dob = studentInfo.dob;
        if (studentInfo.gender !== selectedStudent.gender) changes.gender = studentInfo.gender;
        if (studentInfo.academicYear !== selectedStudent.academicYear) changes.academicYear = studentInfo.academicYear;
        if (studentInfo.email !== selectedStudent.email) changes.email = studentInfo.email;
        if (studentInfo.phone !== selectedStudent.phone) changes.phone = studentInfo.phone;
        if (studentInfo.nationality !== selectedStudent.nationality) changes.nationality = studentInfo.nationality;
        
        // --- So sánh các trường quan hệ (quan trọng!) ---
        // Lấy ID của status hiện tại (có thể là string hoặc object)
        const currentStatusId = (typeof studentInfo.status === 'object' && studentInfo.status?.id) ? studentInfo.status.id : studentInfo.status;
        const originalStatusId = (typeof selectedStudent.status === 'object' && selectedStudent.status?.id) ? selectedStudent.status.id : selectedStudent.status;
        
        if (currentStatusId !== originalStatusId) {
            changes.status = currentStatusId; // Chỉ thêm vào payload nếu status thay đổi
        }
    
        // Tương tự cho faculty
        const currentFacultyId = (typeof studentInfo.faculty === 'object' && studentInfo.faculty?.id) ? studentInfo.faculty.id : studentInfo.faculty;
        const originalFacultyId = (typeof selectedStudent.faculty === 'object' && selectedStudent.faculty?.id) ? selectedStudent.faculty.id : selectedStudent.faculty;
    
        if (currentFacultyId !== originalFacultyId) {
            changes.faculty = currentFacultyId;
        }
        
        // So sánh programId
        if (studentInfo.programId !== selectedStudent.programId) {
            changes.programId = studentInfo.programId;
        }
        
        // So sánh các object phức tạp như địa chỉ và giấy tờ tùy thân
        // Cách đơn giản nhất là so sánh chuỗi JSON của chúng
        if (JSON.stringify(studentInfo.permanentAddress) !== JSON.stringify(selectedStudent.permanentAddress)) {
            changes.permanentAddress = studentInfo.permanentAddress;
        }
        if (JSON.stringify(studentInfo.temporaryAddress) !== JSON.stringify(selectedStudent.temporaryAddress)) {
            changes.temporaryAddress = studentInfo.temporaryAddress;
        }
        if (JSON.stringify(studentInfo.identityDocument) !== JSON.stringify(selectedStudent.identityDocument)) {
            changes.identityDocument = studentInfo.identityDocument;
        }
        
        // 3. Kiểm tra xem có thay đổi nào không. Nếu không, không cần gọi API
        if (Object.keys(changes).length === 0) {
            notify({ type: "info", msg: "No changes to update." });
            setSelectedStudent(undefined); // Đóng form
            return;
        }
    
        // 4. Gọi API chỉ với những dữ liệu đã thay đổi
        try {
            const studentAPIServices = new StudentAPIServices();
            const response = await studentAPIServices.updateStudent(studentInfo.id, changes);
    
            notify({ type: "success", msg: "Student updated successfully" });
            if (response) {
                setStudents(students.map((student: Student) => (student.id === response.id ? response : student)));
            }
            setSelectedStudent(undefined);
        } catch (error) {
            console.error("Update student failed:", error);
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
                                        value={typeof studentInfo.faculty === 'object' ? studentInfo.faculty.id : studentInfo.faculty}
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
                                        value={studentInfo.programId}
                                        onChange={(e) => setStudentInfo(studentInfo.withUpdated({  programId: e.target.value }))}
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
                                        value={typeof studentInfo.status === 'object' ? studentInfo.status.id : studentInfo.status}
                                        onChange={(e) => setStudentInfo(studentInfo.withUpdated({ status: e.target.value }))}
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