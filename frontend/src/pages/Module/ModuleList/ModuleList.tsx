// import '../../../styles/board.css';
// import './module_list.css'
// import { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faArrowLeft, faArrowRight, faSearch, faFilter, faSort } from '@fortawesome/free-solid-svg-icons'
// import NothingDisplay from '../../../components/NothingDisplay/NothingDisplay';

// import { useCategory } from '../../../contexts/CategoryProvider';
// import { Module } from '../../../services/moduleAPIServices';
// // import { mockDataModules } from '../../../services/mockData';
// import { CourseAPIServices } from '../../../services/courseAPIServices';
// import ModuleAdditionForm from '../Form/ModuleAddition/ModuleAddition';
// import ModuleItem from '../ModuleItem/ModuleItem';
// import { useTranslation } from 'react-i18next';
// // import { useLoading } from '../components/LoadingContext';


// function ModuleList() {
//     const { t } = useTranslation();
//     const [modules, setModules] = useState<Module[]>([]);
//     const [cloneModule, setCloneModules] = useState<Module[]>([]);
//     const [isAddFormOpen, setIsAddFormOpen] = useState(false);
//     const { category } = useCategory();
//     const courseService = new CourseAPIServices();

//     useEffect(() => {
//         setCloneModules(modules);
//     }, [modules]);

//     const [page, setPage] = useState(1);
//     const [selectedModule, setSelectedModule] = useState<Module | undefined>(undefined);
//     const [faculty, setFaculty] = useState("");
//     const [sortBy, setSortBy] = useState("");
//     const [search, setSearch] = useState("");
//     function calculateItemsPerPage() {
//         const screenHeight = window.innerHeight;
//         if (screenHeight >= 900) return 14;
//         if (screenHeight >= 750) return 12;
//         if (screenHeight >= 600) return 10;
//         return 7;
//     }

//     const [amountItem, setAmountItem] = useState(0);

//     useEffect(() => {
//         setAmountItem(calculateItemsPerPage());

//         const fetchAPI = async () => {
//             try {
//                 const modules = await courseService.getCourses();
//                 setModules(modules);
//             } catch (error) {
//                 console.error("Error fetching modules:", error);
//             }
//         }

//         fetchAPI();

//         const handleResize = () => {
//             setAmountItem(calculateItemsPerPage());
//             setPage(1);
//         };

//         window.addEventListener("resize", handleResize);

//         return () => {
//             window.removeEventListener("resize", handleResize);
//         };
//     }, []);

//     function increasePage() {
//         if (page < Math.ceil(cloneModule.length / amountItem)) {
//             setPage(page + 1);
//         }
//     }

//     function decreasePage() {
//         if (page > 1) {
//             setPage(page - 1);
//         }
//     }

//     return (
//         <>
//             {/* {selectedModule && <StudentItem selectedModule={selectedModule} setSelectedModule={setSelectedModule} modules={modules} setModules={setModules} />} */}
//             {selectedModule && <ModuleItem selectedModule={selectedModule} setSelectedModule={setSelectedModule} setModules={setModules} modules={modules} />}
//             {isAddFormOpen && <ModuleAdditionForm setIsAddFormOpen={setIsAddFormOpen} setModules={setModules} />}
//             <div className="board board--module">
//                 <div className="board__feature">
//                     <div className="board__feature__sortfilter">
//                         <button onClick={() => setIsAddFormOpen(true)}>
//                             {t('button.add')}
//                         </button>
//                         <div className="board__feature__item">
//                             <div className="board__feature__item__icon">
//                                 <FontAwesomeIcon icon={faSort} className='icon__check' />
//                             </div>
//                             <select
//                                 value={sortBy}
//                                 onChange={(e) => {
//                                     setSortBy(e.target.value);
//                                 }}
//                             >
//                                 <option value="" disabled>
//                                     {t('filterHeading.sort')}
//                                 </option>
//                                 <option value="ID">
//                                     ID
//                                 </option>
//                                 <option value="Name">Name</option>
//                                 <option value="">None</option>
//                             </select>
//                         </div>

//                         <div className="board__feature__item">
//                             <div className="board__feature__item__icon">
//                                 <FontAwesomeIcon icon={faFilter} className='icon__check' />
//                             </div>
//                             <select
//                                 value={faculty}
//                                 onChange={(e) => {
//                                     setFaculty(e.target.value);
//                                 }}
//                             >
//                                 <option value="" disabled>
//                                     {t('filterHeading.faculty')}
//                                 </option>
//                                 {category.faculty.map((item, index) => (
//                                     <option key={index} value={item.id}>{item.name}</option>
//                                 ))}
//                                 <option value="">None</option>
//                             </select>
//                         </div>
//                     </div>
//                     <div className="board__feature__search">
//                         <input
//                             value={search}
//                             onChange={(e) => { setSearch(e.target.value) }}
//                             type="text"
//                             placeholder={t('other.searching')} />
//                         <button>
//                             <FontAwesomeIcon icon={faSearch} className='icon__search' />
//                         </button>
//                     </div>
//                 </div>

//                 <div className="board__table">
                    

//                     <div className="board__table__data">
//                         {cloneModule.length === 0 && <NothingDisplay desciption={null} />}
//                         {cloneModule.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((theChosen: Module) => (
//                             <button
//                                 onClick={() => {
//                                     setSelectedModule(theChosen)
//                                 }}
//                                 key={theChosen.id}
//                                 className="board__table__row">
//                                 <div className="board__table__attribute">{theChosen.id}</div>
//                                 <div className="board__table__attribute">{theChosen.name}</div>
//                                 <div className="board__table__attribute">{theChosen.numOfCredits}</div>
//                                 <div className="board__table__attribute">{theChosen.faculty}</div>
//                                 <div className="board__table__attribute">{theChosen.description}</div>
//                                 <div className="board__table__attribute">
//                                     <div
//                                         style={{ backgroundColor: theChosen.prerequisiteModules.length !== 0 ? "green" : "red" }}
//                                         className="board__table__status"></div>
//                                 </div>
//                             </button>
//                         ))}
//                     </div>

                    
//                 </div>
//             </div>

//         </>
//     );
// }

// export default ModuleList;



                        // {/* Faculty Dropdown */}
                        // <div className="board__feature__item">
                        //     <div className="board__feature__item__icon">
                        //         <FontAwesomeIcon icon={faFilter} className='icon__check' />
                        //     </div>
                        //     <select value={faculty} onChange={(e) => setFaculty(e.target.value)}>
                        //         <option value="" disabled>{t('filterHeading.faculty')}</option>
                        //         {category.faculty.map((item, index) => (
                        //             <option key={index} value={item.id}>{item.name}</option>
                        //         ))}
                        //         <option value="">None</option>
                        //     </select>
                        // </div>



import './module_list.css';
import '../../../styles/board.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faSearch, faSort } from '@fortawesome/free-solid-svg-icons'
import NothingDisplay from '../../../components/NothingDisplay/NothingDisplay';

import { useCategory } from '../../../contexts/CategoryProvider';
import { Module } from '../../../services/moduleAPIServices';
import { CourseAPIServices } from '../../../services/courseAPIServices';
import ModuleAdditionForm from '../Form/ModuleAddition/ModuleAddition';
import ModuleItem from '../ModuleItem/ModuleItem';
import { useTranslation } from 'react-i18next';

function ModuleList() {
    const { t } = useTranslation();
    const [modules, setModules] = useState<Module[]>([]);
    const [cloneModule, setCloneModules] = useState<Module[]>([]);
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const { category } = useCategory();
    const courseService = new CourseAPIServices();

    // State cho các bộ lọc và sắp xếp
    const [page, setPage] = useState(1);
    const [selectedModule, setSelectedModule] = useState<Module | undefined>(undefined);
    const [faculty] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [search, setSearch] = useState("");
    const [amountItem, setAmountItem] = useState(0);

    // Lấy dữ liệu ban đầu
    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const modulesData = await courseService.getCourses();
                setModules(modulesData);
            } catch (error) {
                console.error("Error fetching modules:", error);
            }
        }
        fetchAPI();
    }, []);

    // --- LOGIC LỌC VÀ SẮP XẾP TRUNG TÂM ---
    useEffect(() => {
        let processedModules = [...modules];

        // 1. Lọc theo tìm kiếm (search)
        if (search.trim() !== "") {
            const regex = new RegExp(search, "i");
            processedModules = processedModules.filter(module =>
                regex.test(module.id) || regex.test(module.name)
            );
        }

        // // 2. Lọc theo khoa (faculty)
        // if (faculty) {
        //     // Tìm tên khoa tương ứng với ID đã chọn
        //     const selectedFaculty = category.faculty.find(f => f.id === faculty);
        //     if (selectedFaculty) {
        //         // Lọc các môn học có tên khoa khớp với tên khoa đã tìm được
        //         processedModules = processedModules.filter(module => module.faculty === selectedFaculty.name);
        //     }
        // }

        // 3. Sắp xếp (sort)
        if (sortBy === "ID") {
            processedModules.sort((a, b) => a.id.localeCompare(b.id));
        } else if (sortBy === "Name") {
            processedModules.sort((a, b) => a.name.localeCompare(b.name));
        }

        setCloneModules(processedModules);
        setPage(1); // Reset về trang 1 mỗi khi lọc/sắp xếp

    }, [modules, search, faculty, sortBy, category.faculty]); // useEffect chạy lại khi một trong các giá trị này thay đổi

    
    // --- CÁC HÀM CƠ BẢN KHÁC (GIỮ NGUYÊN) ---
    function calculateItemsPerPage() {
        const screenHeight = window.innerHeight;
        if (screenHeight >= 900) return 14;
        if (screenHeight >= 750) return 12;
        if (screenHeight >= 600) return 10;
        return 7;
    }
    useEffect(() => { setAmountItem(calculateItemsPerPage()); }, []);
    useEffect(() => {
        const handleResize = () => { setAmountItem(calculateItemsPerPage()); setPage(1); };
        window.addEventListener("resize", handleResize);
        return () => { window.removeEventListener("resize", handleResize); };
    }, [amountItem]);

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

    // --- PHẦN RENDER JSX ---
    return (
        <>
            {selectedModule && <ModuleItem selectedModule={selectedModule} setSelectedModule={setSelectedModule} setModules={setModules} modules={modules} />}
            {isAddFormOpen && <ModuleAdditionForm setIsAddFormOpen={setIsAddFormOpen} setModules={setModules} />}
            <div className="board board--module">
                <div className="board__feature">
                    <div className="board__feature__sortfilter">
                        <button onClick={() => setIsAddFormOpen(true)}>
                            {t('button.add')}
                        </button>
                        {/* Sort Dropdown */}
                        <div className="board__feature__item">
                            <div className="board__feature__item__icon">
                                <FontAwesomeIcon icon={faSort} className='icon__check' />
                            </div>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                <option value="" disabled>{t('filterHeading.sort')}</option>
                                <option value="ID">ID</option>
                                <option value="Name">Name</option>
                                <option value="">None</option>
                            </select>
                        </div>

                    </div>
                    {/* Search Input */}
                    <div className="board__feature__search">
                        <input
                            value={search}
                            onChange={(e) => { setSearch(e.target.value) }}
                            type="text"
                            placeholder={t('other.searching')} />
                        <button>
                            <FontAwesomeIcon icon={faSearch} className='icon__search' />
                        </button>
                    </div>
                </div>

                <div className="board__table">

                    <div className="board__table__header">
                        <div className="board__table__attribute">
                            <span>
                                {t('tableHeading.id')}
                            </span>
                        </div>
                        <div className="board__table__attribute">
                            <span>
                                {t('tableHeading.name')}
                            </span>
                        </div>
                        <div className="board__table__attribute">
                            <span>
                                {t('tableHeading.credits')}
                            </span>
                        </div>

                        <div className="board__table__attribute">
                            <span>
                                {t('tableHeading.faculty')}
                            </span>
                        </div>

                        <div className="board__table__attribute">
                            <span>
                                {t('tableHeading.description')}
                            </span>
                        </div>

                        <div className="board__table__attribute">
                            <div className="board__table__status"></div>
                        </div>

                    </div>

                    <div className="board__table__data">
                         {cloneModule.length === 0 && <NothingDisplay desciption={t('other.noModule') || ''} />}
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
                            <span>{modules.length} {t('other.course')}</span>

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