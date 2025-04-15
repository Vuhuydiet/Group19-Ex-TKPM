import '../../../styles/board.css';
import './module_list.css'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faSearch, faFilter, faSort } from '@fortawesome/free-solid-svg-icons'
import NothingDisplay from '../../../components/NothingDisplay/NothingDisplay';

import { useCategory } from '../../../contexts/CategoryProvider';
import { Module } from '../../../services/moduleAPIServices';
import { mockDataModules } from '../../../services/mockData';
import ModuleAdditionForm from '../Form/ModuleAddition/ModuleAddition';
// import { useLoading } from '../components/LoadingContext';


function ModuleList() {

    const [modules, setModules] = useState<Module[]>([]);
    const [cloneModule, setCloneModules] = useState<Module[]>([]);
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const { category } = useCategory();
    //get all modules

    useEffect(() => {
        setCloneModules(modules);
    }, [modules]);

    // useEffect(() => {
    //     getStudents().then((modules) => {
    //         setModules(modules);
    //     });
    // }, []);
    // useEffect(() => {
    //     setModules(mockStudentsList);
    // }, []);

    const [page, setPage] = useState(1);
    const [selectedModule, setSelectedModule] = useState<Module | undefined>(undefined);
    const [faculty, setFaculty] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [search, setSearch] = useState("");
    function calculateItemsPerPage() {
        const screenHeight = window.innerHeight;
        if (screenHeight >= 900) return 14;
        if (screenHeight >= 750) return 12;
        if (screenHeight >= 600) return 10;
        return 7;
    }

    const [amountItem, setAmountItem] = useState(0);

    useEffect(() => {
        setAmountItem(calculateItemsPerPage());
        setModules(mockDataModules);
    }, []);

    // function handleSearch(keySearch: string) {
    //     if (keySearch.trim() === "") {
    //         setPage(1);
    //         setCloneModules(modules);
    //         return;
    //     }

    //     const regex = new RegExp(keySearch, "i");

    //     const filteredStudents = modules.filter(module =>
    //         regex.test(module.id) || regex.test(module.name)
    //     );

    //     setCloneModules(filteredStudents);
    //     setPage(1);
    // }

    // function handleFilter() {
    //     const filteredStudents = modules.filter(module => {
    //         module.faculty === faculty
    //     });

    //     let newStudentList = filteredStudents;
    //     if (search.trim() !== "") {
    //         const regex = new RegExp(search, "i");
    //         newStudentList = filteredStudents.filter(module =>
    //             regex.test(module.id) || regex.test(module.name)
    //         );
    //     }

    //     setCloneModules(newStudentList);
    //     setPage(1);
    // }

    // useEffect(() => {
    //     handleFilter();
    // }, [faculty]);

    useEffect(() => {
        const handleResize = () => {
            setAmountItem(calculateItemsPerPage());
            setPage(1);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    function increasePage() {
        if (page < Math.ceil(cloneModule.length / amountItem)) {
            setPage(page + 1);
        }
    }

    function decreasePage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }


    return (
        <>
            {/* {selectedModule && <StudentItem selectedModule={selectedModule} setSelectedModule={setSelectedModule} modules={modules} setModules={setModules} />} */}
            {isAddFormOpen && <ModuleAdditionForm setIsAddFormOpen={setIsAddFormOpen} />}
            <div className="board board--module">
                <div className="board__feature">
                    <div className="board__feature__sortfilter">
                        <button onClick={() => setIsAddFormOpen(true)}>Add</button>
                        <div className="board__feature__item">
                            <div className="board__feature__item__icon">
                                <FontAwesomeIcon icon={faSort} className='icon__check' />
                            </div>
                            <select
                                value={sortBy}
                                onChange={(e) => {
                                    setSortBy(e.target.value);
                                }}
                            >
                                <option value="" disabled>Sort</option>
                                <option value="ID">ID</option>
                                <option value="Name">Name</option>
                                <option value="">None</option>
                            </select>
                        </div>

                        <div className="board__feature__item">
                            <div className="board__feature__item__icon">
                                <FontAwesomeIcon icon={faFilter} className='icon__check' />
                            </div>
                            <select
                                value={faculty}
                                onChange={(e) => {
                                    setFaculty(e.target.value);
                                }}
                            >
                                <option value="" disabled>Faculty</option>
                                {category.faculty.map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))}
                                <option value="">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="board__feature__search">
                        <input
                            value={search}
                            onChange={(e) => { setSearch(e.target.value) }}
                            type="text"
                            placeholder="Search..." />
                        <button>
                            <FontAwesomeIcon icon={faSearch} className='icon__search' />
                        </button>
                    </div>
                </div>

                <div className="board__table">
                    <div className="board__table__header">
                        <div className="board__table__attribute">
                            <span>ID</span>
                        </div>
                        <div className="board__table__attribute">
                            <span>Name</span>
                        </div>
                        <div className="board__table__attribute">
                            <span>Credits</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>Faculty</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>Description</span>
                        </div>

                        <div className="board__table__attribute">
                            <div className="board__table__status"></div>
                        </div>

                    </div>

                    <div className="board__table__data">
                        {cloneModule.length === 0 && <NothingDisplay />}
                        {cloneModule.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((theChosen: Module) => (
                            <button
                                onClick={() => {
                                    setSelectedModule(theChosen)
                                }}
                                key={theChosen.id}
                                className="board__table__row">
                                <div className="board__table__attribute">{theChosen.id}</div>
                                <div className="board__table__attribute">{theChosen.name}</div>
                                <div className="board__table__attribute">{theChosen.numOfCredits}</div>
                                <div className="board__table__attribute">{theChosen.faculty}</div>
                                <div className="board__table__attribute">{theChosen.description}</div>
                                <div className="board__table__attribute">
                                    <div
                                        style={{ backgroundColor: theChosen.prerequisiteModules.length !== 0 ? "green" : "red" }}
                                        className="board__table__status"></div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="board__table__footer">
                        <div className="board__table__selected">
                            <span>{modules.length} modules</span>

                        </div>

                        <div className="board__table__paging">
                            <div className="board__table__paging__page">
                                <span>{page}</span>|
                                <span>{Math.ceil(modules.length / amountItem)}</span>
                            </div>

                            <div className="board__table__paging__button">
                                <button onClick={decreasePage}>
                                    <FontAwesomeIcon icon={faArrowLeft} className='icon__paging' />
                                </button>
                                <button onClick={increasePage}>
                                    <FontAwesomeIcon icon={faArrowRight} className='icon__paging' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ModuleList;

