import './student_list.css';
import '../../../styles/board.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faCartShopping, faSearch, faFilter, faSort } from '@fortawesome/free-solid-svg-icons'
import NothingDisplay from '../../../components/NothingDisplay/NothingDisplay';

import StudentItem from '../StudentItem/StudentItem';
import { Student, getStudents } from '../../../services/studentAPIServices';
import { mockDataStatus, mockStudentsList } from '../../../services/mockData';
import { exportStudentsJSON, importStudentsJSON, exportStudentsXML, importStudentsXML} from "../../../services/fileAPIServices";
// import { useLoading } from '../components/LoadingContext';


function student() {

    const [students, setStudents] = useState<Student[]>([]);
    const [cloneStudents, setCloneStudents] = useState<Student[]>([]);
    //get all students

    useEffect(() => {
        setCloneStudents(students);
    }, [students]);

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

    const [amountItem, setAmountItem] = useState(0);

    useEffect(() => {
        setAmountItem(calculateItemsPerPage());
    }, []);

    function handleSearch(keySearch: string) {
        if (keySearch.trim() === "") {
            setPage(1);
            setCloneStudents(students);
            return;
        }

        const regex = new RegExp(keySearch, "i");

        const filteredStudents = students.filter(student =>
            regex.test(student.id) || regex.test(student.name)
        );

        setCloneStudents(filteredStudents);
        setPage(1);
    }

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
        if (page < Math.ceil(cloneStudents.length / amountItem)) {
            setPage(page + 1);
        }
    }

    function decreasePage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

        // Handle Export JSON
    const handleExportJSON = async () => {
        const jsonBlob = await exportStudentsJSON();
        const url = window.URL.createObjectURL(new Blob([jsonBlob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "students.json");
        document.body.appendChild(link);
        link.click();
    };

    // Handle Import JSON (Giả sử có file input)
    const handleImportJSON = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
        if (e.target?.result) {
            const jsonData = JSON.parse(e.target.result as string);
            await importStudentsJSON(jsonData);
            alert("Import JSON thành công!");
        }
        };
        reader.readAsText(file);
    };

    // Handle Export XML
    const handleExportXML = async () => {
        const xmlBlob = await exportStudentsXML();
        const url = window.URL.createObjectURL(new Blob([xmlBlob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "students.xml");
        document.body.appendChild(link);
        link.click();
    };

    // Handle Import XML
    const handleImportXML = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
        if (e.target?.result) {
            await importStudentsXML(e.target.result as string);
            alert("Import XML thành công!");
        }
        };
        reader.readAsText(file);
    };

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
                        <button onClick={() => handleSearch(search)}>
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
                        {cloneStudents.length === 0 && <NothingDisplay />}
                        {cloneStudents.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((student: Student) => (
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
                            <button onClick={handleExportXML}>
                                Export XML
                            </button>
                            <button onClick={handleExportJSON}>
                                Export JSON
                            </button>

                            {/* <button>
                                Import XML
                            </button>

                            <button>
                                Import JSON
                            </button> */}

                            <label className="custom-file-upload">
                            Import XML
                            <input type="file" accept=".xml" onChange={handleImportXML} />
                            </label>

                            <label className="custom-file-upload">
                            Import JSON
                            <input type="file" accept=".json" onChange={handleImportJSON} />
                            </label>
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

