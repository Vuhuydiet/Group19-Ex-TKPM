import '../../../styles/board.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faSearch, faSort } from '@fortawesome/free-solid-svg-icons'
import NothingDisplay from '../../../components/NothingDisplay/NothingDisplay';
import { Class } from '../../../services/classAPIServices';
import ClassAdditionForm from '../Form/ClassAddition/ClassAddition';
import './class_list.css'
import { classAPIServices } from '../../../services/classAPIServices';
import { useTranslation } from 'react-i18next';

function ClassList() {
    const [t] = useTranslation();
    const [classes, setClasses] = useState<Class[]>([]);
    const [cloneClasses, setCloneClasses] = useState<Class[]>([]);

    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const classService = new classAPIServices();

    const [page, setPage] = useState(1);
    const [_selectedClass, setSelectedClass] = useState<Class | undefined>(undefined);
    const [sortBy, setSortBy] = useState("");
    const [search, setSearch] = useState("");
    function calculateItemsPerPage() {
        const screenHeight = window.innerHeight;
        if (screenHeight >= 900) return 14;
        if (screenHeight >= 750) return 12;
        if (screenHeight >= 600) return 10;
        return 7;
    }

    useEffect(() => {
        setCloneClasses(classes);
    }, [classes]);

    const [amountItem, setAmountItem] = useState(0);

    useEffect(() => {
        setAmountItem(calculateItemsPerPage());
        const fetchClasses = async () => {
            try {
                const data = await classService.getClasses();
                setClasses(data);
                setCloneClasses(data);
            } catch (error) {
                console.error("Failed to fetch classes", error);
            }
        };
        fetchClasses();
    }, []);

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
        if (page < Math.ceil(cloneClasses.length / amountItem)) {
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
            {/* {isAddFormOpen && <Register setIsHide={setIsAddFormOpen} />} */}
            {isAddFormOpen && <ClassAdditionForm setIsAddFormOpen={setIsAddFormOpen} setClasses={setClasses} classes={classes} />}
            <div className="board board--class">
                <div className="board__feature">
                    <div className="board__feature__sortfilter">
                        <div className="board__feature__item">
                            <button onClick={() => setIsAddFormOpen(true)}>
                                {t('button.add')}
                            </button>

                            <div className="board__feature__item__icon">
                                <FontAwesomeIcon icon={faSort} className='icon__check' />
                            </div>
                            <select
                                value={sortBy}
                                onChange={(e) => {
                                    setSortBy(e.target.value);
                                }}
                            >
                                <option value="" disabled>
                                    {t('filterHeading.sort')}
                                </option>
                                <option value="ID">ID</option>
                                <option value="Name">Name</option>
                                <option value="">None</option>
                            </select>
                        </div>
                    </div>
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
                                {t('tableHeading.courseId')}
                            </span>
                        </div>
                        <div className="board__table__attribute">
                            <span>
                                {t('tableHeading.capacity')}
                            </span>
                        </div>
                        <div className="board__table__attribute">
                            <span>
                                {t('tableHeading.professor')}
                            </span>
                        </div>

                        <div className="board__table__attribute">
                            <span>
                                {t('tableHeading.schedule')}
                            </span>
                        </div>

                        <div className="board__table__attribute">
                            <span>
                                {t('tableHeading.room')}
                            </span>
                        </div>
                    </div>

                    <div className="board__table__data">
                        {cloneClasses.length === 0 && <NothingDisplay desciption={t('other.noClasses') || ''} />}
                        {cloneClasses.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((item: Class) => (
                            <button
                                onClick={() => {
                                    setSelectedClass(item)
                                }}
                                key={item.id}
                                className="board__table__row">
                                <div className="board__table__attribute">{item.id}</div>
                                <div className="board__table__attribute">{item.courseId}</div>
                                <div className="board__table__attribute">{item.capacity}</div>
                                <div className="board__table__attribute">{item.professorName}</div>
                                <div className="board__table__attribute">{item.schedule}</div>
                                <div className="board__table__attribute">{item.room}</div>

                            </button>
                        ))}
                    </div>

                    <div className="board__table__footer">
                        <div className="board__table__selected">
                            <span>{classes.length} {t('other.courseEnrollment')}</span>

                        </div>

                        <div className="board__table__paging">
                            <div className="board__table__paging__page">
                                <span>{page}</span>|
                                <span>{Math.ceil(classes.length / amountItem)}</span>
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

export default ClassList;

