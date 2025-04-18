import { useEffect, useState } from 'react';
import './register.css'
import { Student, StudentAPIServices } from '../../../services/studentAPIServices';
import { Module } from '../../../services/moduleAPIServices';
import ItemList from '../Overlay/ItemList';
import { use } from 'passport';
import { CourseAPIServices } from '../../../services/courseAPIServices';

interface RegisterProps {
    setIsHide: (isHide: boolean) => void;
}

const Register = ({ setIsHide }: RegisterProps) => {
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [selectedModule, setSelectedModule] = useState<Module | null>(null);

    const [studentInput, setStudentInput] = useState('');
    const [moduleInput, setModuleInput] = useState('');

    const [isOpenOverlayForStudent, setIsOpenOverlayForStudent] = useState(false);
    const [isOpenOverlayForModule, setIsOpenOverlayForModule] = useState(false);

    const [students, setStudents] = useState<Student[]>([]);
    const [modules, setModules] = useState<Module[]>([]);

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

    return (
        <>
            {isOpenOverlayForStudent && (
                <ItemList
                    itemList={students}
                    setIsHide={setIsOpenOverlayForStudent}
                    setSelectedItems={setSelectedStudent}
                />
            )}

            {isOpenOverlayForModule && (
                <ItemList
                    itemList={modules}
                    setIsHide={setIsOpenOverlayForModule}
                    setSelectedItems={setSelectedModule}
                />)}

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
                                        <div className="info__student">
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
                                        <div className="info__module">
                                            <h2>{selectedModule.name}</h2>
                                            <p>{selectedModule.id}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
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