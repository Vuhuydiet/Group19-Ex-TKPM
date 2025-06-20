import { useEffect, useState } from "react";
import "../../../../styles/form.css";
import './class_addition.css'
import { Class } from "../../../../services/classAPIServices";
import { classAPIServices } from "../../../../services/classAPIServices";
import { Module } from "../../../../services/moduleAPIServices";
import { CourseAPIServices } from "../../../../services/courseAPIServices";
import { useNotification } from "../../../../contexts/NotificationProvider";
import { useTranslation } from "react-i18next";

function ClassAdditionForm({ setIsAddFormOpen, setClasses, classes }: any) {
    const { t } = useTranslation();
    const { notify } = useNotification();
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

    const [modules, setModules] = useState<Module[]>([]);
    useEffect(() => {
        const courseService = new CourseAPIServices();
        const fetchData = async () => {
            try {
                const modules = await courseService.getCourses();
                setModules(modules);
            } catch (error) {
                console.error("Error fetching students:", error);
            }
        }
        fetchData();
    }, []);

    const handleClose = () => {
        setIsAddFormOpen(false);
    }

    const classService = new classAPIServices();

    function handleAdd() {
        if (theChosenClass.id === "" || theChosenClass.courseId === "" || theChosenClass.professorName === "" || theChosenClass.schedule === "" || theChosenClass.room === "") {
            notify({ type: "error", msg: "Please fill all the fields!" });
            return;
        }

        const fetchData = async () => {
            try {
                const response = await classService.createClass(theChosenClass);
                notify({ type: "success", msg: "Add class successfully!" });

                const newClasses = [...classes, response];
                setClasses(newClasses);

            } catch (error) {
                console.error("Error adding class:", error);
                notify({ type: "error", msg: "Add class failed!" });
            } finally {
                setIsAddFormOpen(false);
            }
        }

        fetchData();

    }


    return (
        <>
            {/* {isPrerequisiteModuleOpen && <PrerequisiteSelector setPrerequisite={(modules: string[]) => setTheChosenClass({ ...theChosenClass, prerequisiteModules: modules })} setIsHide={setIsPrerequisiteModuleOpen} />} */}
            <div className="virtual-background">
                <div className="form form--class">
                    <div className="form__header">
                        <div className="header__left">
                            <h1>
                                {t('addition.class.classAddition')}
                            </h1>
                            <p>
                                {t('addition.class.classAdditionDescription')}
                            </p>
                        </div>
                    </div>

                    <div className="form__body">
                        <div className="form__field">
                            <span>
                                {t('addition.class.classId')}
                            </span>
                            <input
                                value={theChosenClass.id}
                                onChange={(e) => setTheChosenClass({ ...theChosenClass, id: e.target.value })}
                                type="text"
                                placeholder={t('addition.class.classIdPlaceholder')} />
                        </div>

                        {/* Input Price */}
                        <div className="form__field">
                            <span>
                                {t('addition.class.classCourseId')}
                            </span>
                            <select
                                value={theChosenClass.courseId}
                                onChange={(e) => setTheChosenClass({ ...theChosenClass, courseId: e.target.value })}
                            >
                                <option value="" disabled>
                                    {t('addition.class.classCourseIdPlaceholder')}
                                </option>
                                {modules.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))}
                                <option value="">None</option>
                            </select>
                        </div>

                        <div className="form__field">
                            <span>
                                {t('addition.class.classYear')}
                            </span>
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
                                placeholder={t('addition.class.classYearPlaceholder')} />
                        </div>

                        <div className="form__field">
                            <span>
                                {t('addition.class.classSemester')}
                            </span>
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
                                placeholder={t('addition.class.classSemesterPlaceholder')} />
                        </div>

                        <div className="form__field">
                            <span>
                                {t('addition.class.classCapacity')}
                            </span>
                            <input
                                value={theChosenClass.capacity}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (!isNaN(value)) {
                                        setTheChosenClass({ ...theChosenClass, capacity: value });
                                    } else {
                                        setTheChosenClass({ ...theChosenClass, capacity: 0 });
                                    }
                                }}
                                type="text"
                                placeholder={t('addition.class.classCapacityPlaceholder')} />
                        </div>

                        <div className="form__field">
                            <span>
                                {t('addition.class.classProfessor')}
                            </span>
                            <input
                                value={theChosenClass.professorName}
                                onChange={(e) => setTheChosenClass({ ...theChosenClass, professorName: e.target.value })}

                                type="text"
                                placeholder={t('addition.class.classProfessorPlaceholder')} />
                        </div>

                        <div className="form__field">
                            <span>
                                {t('addition.class.classSchedule')}
                            </span>
                            <input
                                value={theChosenClass.schedule}
                                onChange={(e) => setTheChosenClass({ ...theChosenClass, schedule: e.target.value })}

                                type="text"
                                placeholder={t('addition.class.classSchedulePlaceholder')} />
                        </div>

                        <div className="form__field">
                            <span>
                                {t('addition.class.classRoom')}
                            </span>
                            <input
                                value={theChosenClass.room}
                                onChange={(e) => setTheChosenClass({ ...theChosenClass, room: e.target.value })}

                                type="text"
                                placeholder={t('addition.class.classRoomPlaceholder')} />
                        </div>

                    </div>

                    <div className="form__footer">
                        <div className="form__button">
                            <button onClick={handleClose}>
                                {t('button.cancel')}
                            </button>
                            <button>
                                {t('button.reset')}
                            </button>
                            <button onClick={handleAdd}>
                                {t('button.add')}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default ClassAdditionForm;
