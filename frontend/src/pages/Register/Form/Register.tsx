import { useEffect, useState } from 'react';
import './register.css'
import { Student, StudentAPIServices } from '../../../services/studentAPIServices';
import { Module } from '../../../services/moduleAPIServices';
import { CourseAPIServices } from '../../../services/courseAPIServices';
import { Class, classAPIServices } from '../../../services/classAPIServices';
import StudentItemList from '../Overlay/StudentItemList/StudentItemList';
import ClassItemList from '../Overlay/ClassItemList/ClassItemList';
import ModuleItemList from '../Overlay/ModuleItemList/ModuleItemList';

interface RegisterProps {
    setIsHide: (isHide: boolean) => void;
}

const Register = ({ setIsHide }: RegisterProps) => {
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

    const handleCancel = () => {
        setIsHide(false);
    }

    useEffect(() => {
        const studentService = new StudentAPIServices();
        const courseService = new CourseAPIServices();
        const classService = new classAPIServices();

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
        const fetchData3 = async () => {
            try {
                const classes = await classService.getClasses();
                setClasses(classes);
            }
            catch (error) {
                console.error("Error fetching classes:", error);
            }
        }

        fetchData1();
        fetchData2();
    }, []);

    useEffect(() => {
        const classService = new classAPIServices();
        const fetchData = async () => {
            try {
                const classes = await classService.getClasses();
                setClasses(classes);
            } catch (error) {
                console.error("Error fetching classes:", error);
            }
        }
        fetchData();
    }, [selectedModule]);

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
                        <h1 className="register__title">Register</h1>
                        <p className="register__description">Register modules for students</p>
                    </div>

                    <div className="register__body">
                        <div className="body__item">
                            <div className="item__header">
                                <h1>Student Selector</h1>
                            </div>

                            <div className="item__body">
                                <div className="body__inputfield">
                                    <input
                                        value={studentInput}
                                        type="text"
                                        placeholder="Please enter student ID"
                                        onChange={(e) => setStudentInput(e.target.value)}
                                    />
                                    <button>Check</button>
                                    <button onClick={() => setIsOpenOverlayForStudent(true)}>Search</button>
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
                                <h1>Module Selector</h1>
                            </div>

                            <div className="item__body">
                                <div className="body__inputfield">
                                    <input
                                        value={moduleInput}
                                        type="text"
                                        placeholder="Please enter module ID"
                                        onChange={(e) => setModuleInput(e.target.value)}
                                    />
                                    <button>Check</button>
                                    <button onClick={() => setIsOpenOverlayForModule(true)}>Search</button>
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
                                <h1>Class Selector</h1>
                            </div>

                            <div className="item__body">
                                <div className="body__inputfield">
                                    <input
                                        value={classInput}
                                        type="text"
                                        placeholder="Please enter class ID"
                                        onChange={(e) => setModuleInput(e.target.value)}
                                    />
                                    <button>Check</button>
                                    <button onClick={() => setIsOpenOverlayForClass(true)}>Search</button>
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
                        <button onClick={handleCancel}>Cancel</button>
                        <button>Reset</button>
                        <button>Register</button>
                    </div>
                </div>
            </div>

        </>
    )

}

export default Register;