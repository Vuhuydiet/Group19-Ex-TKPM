import './register_list.css';
import '../../../styles/board.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faSearch, faSort, faX } from '@fortawesome/free-solid-svg-icons'
import NothingDisplay from '../../../components/NothingDisplay/NothingDisplay';

import { CourseEnrollment, CourseEnrollmentAPIServices } from '../../../services/courseEnrollmentAPIServices';
import Register from '../Form/Register';
import { useNotification } from '../../../contexts/NotificationProvider';

function RegisterList() {
    const { notify } = useNotification();
    const [courseEnrollment, setCourseEnrollment] = useState<CourseEnrollment[]>([]);
    const [cloneCourseEnrollment, setCloneCourseEnrollment] = useState<CourseEnrollment[]>([]);
    //get all courseEnrollment
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);

    useEffect(() => {
        setCloneCourseEnrollment(courseEnrollment);
    }, [courseEnrollment]);

    // useEffect(() => {
    //     setCourseEnrollment(mockStudentsList);
    // }, []);
    const [page, setPage] = useState(1);
    const [_selectCourseEnrollment, setSelectCourseEnrollment] = useState<CourseEnrollment | undefined>(undefined);
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
    }, []);

    useEffect(() => {
        const courseEnrollmentServicesn = new CourseEnrollmentAPIServices();
        const fetchData = async () => {
            try {
                const response = await courseEnrollmentServicesn.getEnrollments();
                setCourseEnrollment(response);
            } catch (error) {
                console.error("Error fetching course enrollments:", error);
            }
        }

        fetchData();

    }, []);

    // function handleSearch(keySearch: string) {
    //     if (keySearch.trim() === "") {
    //         setPage(1);
    //         setCloneCourseEnrollment(courseEnrollment);
    //         return;
    //     }

    //     const regex = new RegExp(keySearch, "i");

    //     const filteredStudents = courseEnrollment.filter(item =>
    //         regex.test(item.id) || regex.test(item.name)
    //     );

    //     setCloneCourseEnrollment(filteredStudents);
    //     setPage(1);
    // }

    // function handleFilter() {
    //     const filteredStudents = courseEnrollment.filter(item => {
    //         item.faculty === faculty
    //     });

    //     let newStudentList = filteredStudents;
    //     if (search.trim() !== "") {
    //         const regex = new RegExp(search, "i");
    //         newStudentList = filteredStudents.filter(item =>
    //             regex.test(item.id) || regex.test(item.name)
    //         );
    //     }

    //     setCloneCourseEnrollment(newStudentList);
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
        if (page < Math.ceil(cloneCourseEnrollment.length / amountItem)) {
            setPage(page + 1);
        }
    }

    function decreasePage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const handleCancel = async (studentId: string, classId: string) => {
        const courseEnrollmentServices = new CourseEnrollmentAPIServices();
        try {
            await courseEnrollmentServices.cancelClass(studentId, classId);
            setCourseEnrollment(courseEnrollment.filter((item) => item.studentId !== studentId && item.classId !== classId));
            notify({ type: "success", msg: "Cancel course enrollment successfully!" });

        } catch (error) {
            console.error("Error canceling course enrollment:", error);
            notify({ type: "error", msg: "Cancel course enrollment failed!" });
        }
    }

    return (
        <>
            {isAddFormOpen && <Register setIsHide={setIsAddFormOpen} courseEnrollment={courseEnrollment} setCourseEnrollment={setCourseEnrollment} />}
            <div className="board board--course">
                <div className="board__feature">
                    <div className="board__feature__sortfilter">
                        <div className="board__feature__item">
                            <button onClick={() => setIsAddFormOpen(true)}>Add</button>

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
                            <span>STT</span>
                        </div>
                        <div className="board__table__attribute">
                            <span>Student</span>
                        </div>
                        <div className="board__table__attribute">
                            <span>Class</span>
                        </div>
                        <div className="board__table__attribute">
                            <span>Grade</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>Cancel</span>
                        </div>
                    </div>

                    <div className="board__table__data">
                        {cloneCourseEnrollment.length === 0 && <NothingDisplay />}
                        {cloneCourseEnrollment.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((item: CourseEnrollment, index: number) => (
                            <button
                                onClick={() => {
                                    setSelectCourseEnrollment(item)
                                }}
                                key={item.studentId + item.classId}
                                className="board__table__row">
                                <div className="board__table__attribute">{index + 1}</div>
                                <div className="board__table__attribute">{item.studentId}</div>
                                <div className="board__table__attribute">{item.classId}</div>
                                <div className="board__table__attribute">{item.grade ? item.grade : "None"}</div>
                                <div className="board__table__attribute">
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        handleCancel(item.studentId, item.classId);
                                    }
                                    }>
                                        <FontAwesomeIcon icon={faX} className='icon__check' />
                                    </button>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="board__table__footer">
                        <div className="board__table__selected">
                            <span>{courseEnrollment.length} course enrollment</span>

                        </div>

                        <div className="board__table__paging">
                            <div className="board__table__paging__page">
                                <span>{page}</span>|
                                <span>{Math.ceil(courseEnrollment.length / amountItem)}</span>
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

export default RegisterList;

