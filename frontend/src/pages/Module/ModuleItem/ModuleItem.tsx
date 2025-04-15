import { useEffect, useState } from "react";
import { Module } from "../../../services/moduleAPIServices";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCubes } from '@fortawesome/free-solid-svg-icons'
import { useCategory } from "../../../contexts/CategoryProvider";
import './module_item.css'

interface ModuleItemProps {
    selectedModule: Module;
    setSelectedModule: (module: any) => void;
}

const ModuleItem = ({ selectedModule, setSelectedModule }: ModuleItemProps) => {
    const [module, setModule] = useState<Module | null>(null);
    const { category } = useCategory();

    useEffect(() => {
        setModule(selectedModule);
    }, [])

    const handleClose = () => {
        setSelectedModule(null);
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
                                />
                            </div>

                            <div className="body__item">
                                <div className="body__item__label">
                                    <span>Faculty</span>
                                </div>

                                <select
                                    value={module?.faculty}
                                >
                                    {category.faculty.map((fac) => (
                                        <option value={fac} key={fac}>{fac}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="item__footer">
                        <button>Delete</button>
                        <button>Save</button>
                        <button onClick={handleClose}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModuleItem;