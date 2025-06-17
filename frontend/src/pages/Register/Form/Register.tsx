import { useEffect, useState } from 'react';
import './register.css'
import { Student, StudentAPIServices } from '../../../services/studentAPIServices';
import { Module } from '../../../services/moduleAPIServices';
import { CourseAPIServices } from '../../../services/courseAPIServices';
import { Class, classAPIServices } from '../../../services/classAPIServices';
import StudentItemList from '../Overlay/StudentItemList/StudentItemList';
import ClassItemList from '../Overlay/ClassItemList/ClassItemList';
import ModuleItemList from '../Overlay/ModuleItemList/ModuleItemList';
import { CourseEnrollment, CourseEnrollmentAPIServices } from '../../../services/courseEnrollmentAPIServices';
import { useNotification } from '../../../contexts/NotificationProvider';
import { useTranslation } from 'react-i18next';

interface RegisterProps {
    setIsHide: (isHide: boolean) => void;
    courseEnrollment: CourseEnrollment[];
    setCourseEnrollment: (courseEnrollment: CourseEnrollment[]) => void;
}

const Register = ({ setIsHide, courseEnrollment, setCourseEnrollment }: RegisterProps) => {
    const { t } = useTranslation();
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [selectedModule, setSelectedModule] = useState<Module | null>(null);
    const [selectedClass, setSelectedClass] = useState<Class | null>(null);

    const [studentInput, setStudentInput] = useState('');
    const [moduleInput, setModuleInput] = useState('');
    const [classInput, setClassInput] = useState('');

    const [isOpenOverlayForStudent, setIsOpenOverlayForStudent] = useState(false);
    const [isOpenOverlayForModule, setIsOpenOverlayForModule] = useState(false);
    const [isOpenOverlayForClass, setIsOpenOverlayForClass] = useState(false);

    const [students, setStudents] = useState<Student[]>([]);
    const [modules, setModules] = useState<Module[]>([]);
    const [classes, setClasses] = useState<Class[]>([]);

    const { notify } = useNotification();

    const handleCancel = () => {
        setIsHide(false);
    }

    useEffect(() => {
        const studentService = new StudentAPIServices();
        const courseService = new CourseAPIServices();

        const fetchData1 = async () => {
            try {
                const students = await studentService.getStudents();
                setStudents(students);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        }
        const fetchData2 = async () => {
            try {
                const modules = await courseService.getCourses();
                setModules(modules);
            } catch (error) {
                console.error("Error fetching modules:", error);
            }
        }
        fetchData1();
        fetchData2();
    }, []);

    useEffect(() => {
        const classService = new classAPIServices();
        const fetchData = async () => {
            try {
                const classes = await classService.getClassesByQuery({ courseId: selectedModule?.id });
                setClasses(classes);
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        }
        fetchData();
    }, [selectedModule]);

    const handleRegisterModule = () => {
        const studentId = selectedStudent?.id;
        const classId = selectedClass?.id;

        if (!studentId || !classId) {
            notify({ type: 'error', msg: 'Please select a student and a class.' });
            return;
        }
        const fetchData = async () => {
            try {
                const courseEnrollmentService = new CourseEnrollmentAPIServices();
                await courseEnrollmentService.createEnrollment({
                    studentId: studentId,
                    classId: classId,
                });
                notify({ type: 'success', msg: 'Module registered successfully!' });
                setCourseEnrollment([...courseEnrollment, { studentId, classId }]);

            } catch (error) {
                console.error("Error registering module:", error);
                notify({ type: 'error', msg: 'Failed to register module.' });
            } finally {
                setIsHide(false);
            }
        }

        fetchData();
    }

    return (
        <>
            {isOpenOverlayForStudent && (
                <StudentItemList
                    itemList={students}
                    setIsHide={setIsOpenOverlayForStudent}
                    setSelectedItem={setSelectedStudent}
                    setItemInput={setStudentInput}
                />
            )}

            {isOpenOverlayForModule && (
                <ModuleItemList
                    itemList={modules}
                    setIsHide={setIsOpenOverlayForModule}
                    setSelectedItem={setSelectedModule}
                    setItemInput={setModuleInput}
                />)}

            {isOpenOverlayForClass && (
                <ClassItemList
                    itemList={classes}
                    setIsHide={setIsOpenOverlayForClass}
                    setSelectedItem={setSelectedClass}
                    setItemInput={setClassInput}
                />)
            }

            <div className="virtual-background">
                <div className="register">
                    <div className="register__header">
                        <h1 className="register__title">
                            {t('addition.courseRegistration.courseRegistrationAddition')}
                        </h1>
                        <p className="register__description">
                            {t('addition.courseRegistration.courseRegistrationDescription')}
                        </p>
                    </div>

                    <div className="register__body">
                        <div className="body__item">
                            <div className="item__header">
                                <h1>
                                    {t('addition.courseRegistration.courseStudent')}
                                </h1>
                            </div>

                            <div className="item__body">
                                <div className="body__inputfield">
                                    <input
                                        value={studentInput}
                                        type="text"
                                        placeholder={t('addition.courseRegistration.courseStudentPlaceholder')}
                                        onChange={(e) => setStudentInput(e.target.value)}
                                        disabled
                                    />
                                    <button onClick={() => setIsOpenOverlayForStudent(true)}>
                                        {t('button.search')}
                                    </button>
                                </div>

                                <div className="body__info">
                                    {selectedStudent && (
                                        <div className="info__detail">
                                            <h2>{selectedStudent.name}</h2>
                                            <p>{selectedStudent.id}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="body__item">
                            <div className="item__header">
                                <h1>
                                    {t('addition.courseRegistration.courseCourse')}
                                </h1>
                            </div>

                            <div className="item__body">
                                <div className="body__inputfield">
                                    <input
                                        value={moduleInput}
                                        type="text"
                                        placeholder={t('addition.courseRegistration.courseCoursePlaceholder')}
                                        onChange={(e) => setModuleInput(e.target.value)}
                                        disabled
                                    />
                                    <button onClick={() => setIsOpenOverlayForModule(true)}>
                                        {t('button.search')}
                                    </button>
                                </div>

                                <div className="body__info">
                                    {selectedModule && (
                                        <div className="info__detail">
                                            <h2>{selectedModule.id}</h2>
                                            <p>{selectedModule.name}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {selectedModule && <div className="body__item">
                            <div className="item__header">
                                <h1>
                                    {t('addition.courseRegistration.courseClass')}
                                </h1>
                            </div>

                            <div className="item__body">
                                <div className="body__inputfield">
                                    <input
                                        value={classInput}
                                        type="text"
                                        placeholder={t('addition.courseRegistration.courseClassPlaceholder')}
                                        onChange={(e) => setModuleInput(e.target.value)}
                                        disabled
                                    />
                                    <button onClick={() => setIsOpenOverlayForClass(true)}>
                                        {t('button.search')}
                                    </button>
                                </div>

                                <div className="body__info">
                                    {selectedClass && (
                                        <div className="info__detail">
                                            <h2>{selectedClass.id}</h2>
                                            <p>{selectedClass.professorName}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>}
                    </div>

                    <div className="register__footer">
                        <button onClick={handleCancel}>
                            {t('button.cancel')}
                        </button>
                        <button>
                            {t('button.reset')}
                        </button>
                        <button onClick={handleRegisterModule}>
                            {t('button.register')}
                        </button>
                    </div>
                </div>
            </div>

        </>
    )

}

export default Register;