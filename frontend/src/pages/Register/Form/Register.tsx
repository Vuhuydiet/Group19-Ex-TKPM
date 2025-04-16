import { useState } from 'react';
import './register.css'
import { Student } from '../../../services/studentAPIServices';
import { Module } from '../../../services/moduleAPIServices';
import ItemList from '../Overlay/ItemList';

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

    const handleCancel = () => {
        setIsHide(false);
    }

    return (
        <>
            {isOpenOverlayForStudent && (
                <ItemList
                    itemList={[{

                    }]}
                    setIsHide={setIsOpenOverlayForStudent}
                    setSelectedItems={setSelectedStudent}
                />
            )}

            {isOpenOverlayForModule && (
                <ItemList
                    itemList={[{

                    }]}
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
                                    <button>Search</button>
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