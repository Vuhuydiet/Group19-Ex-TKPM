import { useState } from "react";
import "../../../../styles/form.css";
import './class_addition.css'
import { Class } from "../../../../services/classAPIServices";


function ClassAdditionForm({ setIsAddFormOpen }: any) {
    const [theChosenClass, setTheChosenClass] = useState<Class>({
        id: "",
        courseId: "",
        year: new Date().getFullYear(),
        semester: -1,
        professorName: "",
        capacity: -1,
        schedule: "",
        room: ""
    });

    const handleClose = () => {
        setIsAddFormOpen(false);
    }

    return (
        <>
            {/* {isPrerequisiteModuleOpen && <PrerequisiteSelector setPrerequisite={(modules: string[]) => setTheChosenClass({ ...theChosenClass, prerequisiteModules: modules })} setIsHide={setIsPrerequisiteModuleOpen} />} */}
            <div className="virtual-background">
                <div className="form form--class">
                    <div className="form__header">
                        <div className="header__left">
                            <h1>Class Addition</h1>
                            <p>Import a new class information</p>
                        </div>
                    </div>

                    <div className="form__body">
                        <div className="form__field">
                            <span>ID</span>
                            <input
                                value={theChosenClass.id}
                                onChange={(e) => setTheChosenClass({ ...theChosenClass, id: e.target.value })}
                                type="text"
                                placeholder="Enter class ID" />
                        </div>

                        {/* Input Price */}
                        <div className="form__field">
                            <span>Name</span>
                            <input
                                value={theChosenClass.courseId}
                                onChange={(e) => setTheChosenClass({ ...theChosenClass, courseId: e.target.value })}

                                type="text"
                                placeholder="Enter class course id" />
                        </div>

                        <div className="form__field">
                            <span>Year</span>
                            <input
                                value={theChosenClass.year}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (!isNaN(value)) {
                                        setTheChosenClass({ ...theChosenClass, year: value });
                                    } else {
                                        setTheChosenClass({ ...theChosenClass, year: new Date().getFullYear() });
                                    }
                                }}
                                type="text"
                                placeholder="Enter class's year" />
                        </div>

                        <div className="form__field">
                            <span>Semester</span>
                            <input
                                value={theChosenClass.semester}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (!isNaN(value)) {
                                        setTheChosenClass({ ...theChosenClass, semester: value });
                                    } else {
                                        setTheChosenClass({ ...theChosenClass, semester: new Date().getFullYear() });
                                    }
                                }}
                                type="text"
                                placeholder="Enter class semester" />
                        </div>

                        <div className="form__field">
                            <span>Capacity</span>
                            <input
                                value={theChosenClass.capacity}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (!isNaN(value)) {
                                        setTheChosenClass({ ...theChosenClass, capacity: value });
                                    } else {
                                        setTheChosenClass({ ...theChosenClass, capacity: new Date().getFullYear() });
                                    }
                                }}
                                type="text"
                                placeholder="Enter class capacity" />
                        </div>

                        <div className="form__field">
                            <span>Professor Name</span>
                            <input
                                value={theChosenClass.professorName}
                                onChange={(e) => setTheChosenClass({ ...theChosenClass, professorName: e.target.value })}

                                type="text"
                                placeholder="Enter class professor name" />
                        </div>

                        <div className="form__field">
                            <span>Schedule</span>
                            <input
                                value={theChosenClass.schedule}
                                onChange={(e) => setTheChosenClass({ ...theChosenClass, schedule: e.target.value })}

                                type="text"
                                placeholder="Enter class schedule" />
                        </div>

                        <div className="form__field">
                            <span>Room</span>
                            <input
                                value={theChosenClass.room}
                                onChange={(e) => setTheChosenClass({ ...theChosenClass, room: e.target.value })}

                                type="text"
                                placeholder="Enter class room" />
                        </div>

                    </div>

                    <div className="form__footer">
                        <div className="form__button">
                            <button onClick={handleClose}>Close</button>
                            <button>Reset</button>
                            <button>Add</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default ClassAdditionForm;
