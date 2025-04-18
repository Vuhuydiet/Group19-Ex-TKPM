import { useEffect, useState } from "react";
import { Module } from "../../../services/moduleAPIServices";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCubes, faPen } from '@fortawesome/free-solid-svg-icons'
import { useCategory } from "../../../contexts/CategoryProvider";
import './module_item.css'
import { CourseAPIServices } from "../../../services/courseAPIServices";
import { useNotification } from "../../../contexts/NotificationProvider";

interface ModuleItemProps {
    selectedModule: Module;
    setSelectedModule: (module: any) => void;
    setModules: (modules: Module[]) => void;
    modules: Module[];
}

const ModuleItem = ({ selectedModule, setSelectedModule, setModules, modules }: ModuleItemProps) => {
    const [module, setModule] = useState<Module | null>(null);
    const { category } = useCategory();
    const [isEdit, setIsEdit] = useState(false);
    const { notify } = useNotification();

    useEffect(() => {
        setModule(selectedModule);
    }, [])

    const handleClose = () => {
        setSelectedModule(null);
    }

    const handleSave = () => {
        if (!module) return;

        const courseService = new CourseAPIServices();
        const fetchData = async () => {
            try {
                const response = await courseService.updateCourse(selectedModule.id, module!);
                notify({ type: "success", msg: "Update module successfully!" });
                const newModules = modules.map((mod) => {
                    if (mod.id === response.id) {
                        return response;
                    }
                    return mod;
                })
                setModules(newModules);

            } catch (error) {
                console.error("Error updating module:", error);
            }
        }
        fetchData();
    }

    return (
        <>
            <div className="virtual-background">
                <div className="item">
                    <div className="item__header">
                        <h1>Module - {module?.id}</h1>
                    </div>

                    <div className="item__body">
                        <div className="body__left">
                            <div className="body__icon__container">
                                <FontAwesomeIcon icon={faCubes} className='icon__item' />
                            </div>
                        </div>
                        <div className="body__right">
                            <div className="body__item">
                                <div className="body__item__label">
                                    <span>Name</span>
                                </div>
                                <input
                                    type="text"
                                    value={module?.name}
                                    onChange={(e) => setModule({ ...module!, name: e.target.value })}
                                    className="body__item__input"
                                    disabled={!isEdit}
                                />
                            </div>

                            <div className="body__item">
                                <div className="body__item__label">
                                    <span>Credits</span>
                                </div>
                                <input
                                    type="text"
                                    value={module?.numOfCredits}
                                    onChange={(e) => setModule({ ...module!, numOfCredits: Number(e.target.value) })}
                                    className="body__item__input"
                                    disabled={!isEdit}
                                />
                            </div>

                            <div className="body__item">
                                <div className="body__item__label">
                                    <span>Description</span>
                                </div>
                                <input
                                    type="text"
                                    value={module?.description}
                                    onChange={(e) => setModule({ ...module!, description: e.target.value })}
                                    className="body__item__input"
                                    disabled={!isEdit}
                                />
                            </div>

                            <div className="body__item">
                                <div className="body__item__label">
                                    <span>Faculty</span>
                                </div>

                                <select
                                    value={module?.faculty}
                                    disabled={!isEdit}
                                >
                                    {category.faculty.map((fac) => (
                                        <option value={fac.id} key={fac.id}>{fac.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="item__footer">
                        <button onClick={() => setIsEdit(!isEdit)}>
                            <FontAwesomeIcon icon={faPen} className='icon__edit' />
                        </button>
                        <button>Delete</button>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={handleClose}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModuleItem;