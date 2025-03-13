import './student_list.css';
import '../../../styles/board.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faCartShopping, faSearch, faFilter, faSort } from '@fortawesome/free-solid-svg-icons'
import NothingDisplay from '../../../components/NothingDisplay/NothingDisplay';

import StudentItem from '../StudentItem/StudentItem';
import { mockDataStatus, mockDataStudents, Student } from '../Student.constant';
// import { useLoading } from '../components/LoadingContext';
// import NothingDisplay from '../components/NothingDisplay';

function student() {
    // const { setIsLoading } = useLoading();
    const [students, setStudents] = useState(mockDataStudents);
    const [page, setPage] = useState(1);
    const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(undefined);
    const [gender, setGender] = useState("");
    const [status, setStatus] = useState("");
    const [sortBy, setSortBy] = useState("");
    // const [brands, setBrands] = useState([]);
    // const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState("");
    function calculateItemsPerPage() {
        const screenHeight = window.innerHeight;
        if (screenHeight >= 900) return 14;
        if (screenHeight >= 750) return 12;
        if (screenHeight >= 600) return 10;
        return 7;
    }

    const [amountItem, setAmountItem] = useState(calculateItemsPerPage());

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const loadingRef = setTimeout(() => { setIsLoading(true); }, 500);
    //         try {
    //             const res = await fetch('http://localhost:5000/api/student');
    //             const data = await res.json();
    //             console.log(data);
    //             if (data.status !== 'success') {
    //                 console.log('Error fetching data');
    //                 return;
    //             }
    //             setStudents(data.data);

    //             const resBrand = await fetch('http://localhost:5000/api/brand');
    //             const dataBrand = await resBrand.json();
    //             if (dataBrand.status !== 'success') {
    //                 console.log('Error fetching data');
    //                 return;
    //             }
    //             setBrands(dataBrand.data);

    //             const resCategory = await fetch('http://localhost:5000/api/category');
    //             const dataCategory = await resCategory.json();
    //             if (dataCategory.status !== 'success') {
    //                 console.log('Error fetching data');
    //                 return;
    //             }
    //             setCategories(dataCategory.data);
    //         } catch (error) {
    //             console.log(error);
    //         } finally {
    //             setIsLoading(false);
    //             clearTimeout(loadingRef);
    //         }
    //     }

    //     fetchData();
    // }, []);

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
        if (page < Math.ceil(students.length / amountItem)) {
            setPage(page + 1);
        }
    }

    function decreasePage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    // async function handleFilter() {
    //     setIsLoading(true);
    //     try {
    //         const query = {
    //             brands: theChosenBrand,
    //             categories: theChosenCategory,
    //             sortBy: sortBy === "creation-time" ? "productUpdatedDateTime" : sortBy === "price" ? "productPrice" : sortBy === "total-purchase" ? "productTotalPurchase" : "",
    //             sortType: "asc",
    //             keySearch: search
    //         };

    //         const res = await fetch(`http://localhost:5000/api/student/filter?brands=${query.brands}&categories=${query.categories}&sortBy=${query.sortBy}&sortType=${query.sortType}&keySearch=${query.keySearch}`);
    //         const data = await res.json();
    //         if (data.status !== 'success') {
    //             console.log('Error fetching data');
    //             return;
    //         }
    //         setStudents(data.data);
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }

    // useEffect(() => {
    //     handleFilter();
    // }, [theChosenBrand, theChosenCategory, sortBy]);

    return (
        <>
            {selectedStudent && <StudentItem selectedStudent={selectedStudent} setSelectedStudent={setSelectedStudent} students={students} setStudents={setStudents} />}
            <div className="board board--student">
                <div className="board__feature">
                    <div className="board__feature__sortfilter">
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
                                value={gender}
                                onChange={(e) => {
                                    setGender(e.target.value);
                                }}
                            >
                                <option value="" disabled>Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="">None</option>
                            </select>
                        </div>

                        <div className="board__feature__item">
                            <div className="board__feature__item__icon">
                                <FontAwesomeIcon icon={faFilter} className='icon__check' />
                            </div>
                            <select
                                value={status}
                                onChange={(e) => {
                                    setStatus(e.target.value);
                                }}
                            >
                                <option value="" disabled>Status</option>
                                {mockDataStatus.map((status, index) => (
                                    <option key={index} value={status}>{status}</option>
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
                            <span>DOB</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>Gender</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>Program</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>AcademicYear</span>
                        </div>

                        <div className="board__table__attribute">
                            <div className="board__table__status"></div>
                        </div>
                    </div>

                    <div className="board__table__data">
                        {students.length === 0 && <NothingDisplay />}
                        {students.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((student: Student, index: number) => (
                            <button
                                onClick={() => {
                                    setSelectedStudent(student)
                                }}
                                key={student.ID}
                                className="board__table__row">
                                <div className="board__table__attribute">{student.ID}</div>
                                <div className="board__table__attribute">{student.name}</div>
                                <div className="board__table__attribute">{student.dateOfBirth}</div>
                                <div className="board__table__attribute">{student.gender}</div>
                                <div className="board__table__attribute">{student.program}</div>
                                <div className="board__table__attribute">{student.academicYear}</div>
                                <div className="board__table__attribute">
                                    <div
                                        style={{ backgroundColor: student.status === "Graduated" ? "green" : (student.status === "Studying" ? "yellow" : "red") }}
                                        className="board__table__status"></div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="board__table__footer">
                        <div className="board__table__selected">
                            <span>{students.length} students</span>
                            <button>
                                <FontAwesomeIcon icon={faCartShopping} className='icon__deleted' />
                            </button>
                        </div>

                        <div className="board__table__paging">
                            <div className="board__table__paging__page">
                                <span>{page}</span>|
                                <span>{Math.ceil(students.length / amountItem)}</span>
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

export default student; 