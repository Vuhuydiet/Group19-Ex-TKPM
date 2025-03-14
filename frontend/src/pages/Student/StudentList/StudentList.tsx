import './student_list.css';
import '../../../styles/board.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faCartShopping, faSearch, faFilter, faSort } from '@fortawesome/free-solid-svg-icons'
import NothingDisplay from '../../../components/NothingDisplay/NothingDisplay';

import StudentItem from '../StudentItem/StudentItem';
import { Student, getStudents } from '../../../services/studentAPIServices';
import { mockDataStatus } from '../../../services/mockData';
// import { useLoading } from '../components/LoadingContext';
// import NothingDisplay from '../components/NothingDisplay';

// import { mockStudentsList } from "../../../services/mockData"; // Đảm bảo import đúng đường dẫn




function student() {

    const [students, setStudents] = useState<Student[]>([]);
    //get all students
    useEffect(() => {
        getStudents().then((students) => {
            setStudents(students);
        });
    }, []);
    // useEffect(() => {
    //     setStudents(mockStudentsList);
    // }, []);
    const [page, setPage] = useState(1);
    const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(undefined);
    const [gender, setGender] = useState("");
    const [status, setStatus] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [search, setSearch] = useState("");
    function calculateItemsPerPage() {
        const screenHeight = window.innerHeight;
        if (screenHeight >= 900) return 14;
        if (screenHeight >= 750) return 12;
        if (screenHeight >= 600) return 10;
        return 7;
    }

    const [amountItem, setAmountItem] = useState(calculateItemsPerPage());

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
                        {students.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((student: Student) => (
                            <button
                                onClick={() => {
                                    setSelectedStudent(student)
                                }}
                                key={student.id}
                                className="board__table__row">
                                <div className="board__table__attribute">{student.id}</div>
                                <div className="board__table__attribute">{student.name}</div>
                                <div className="board__table__attribute">{student.dob}</div>
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

