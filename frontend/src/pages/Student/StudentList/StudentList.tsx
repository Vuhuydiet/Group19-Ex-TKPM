import './student_list.css';
import '../../../styles/board.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faSearch, faFilter, faSort } from '@fortawesome/free-solid-svg-icons'
import NothingDisplay from '../../../components/NothingDisplay/NothingDisplay';

import StudentItem from '../StudentItem/StudentItem';
import { Student } from '../../../services/classes/Student';
import { StudentAPIServices } from '../../../services/studentAPIServices';
import { FileAPIServices } from "../../../services/fileAPIServices";
import { useCategory } from '../../../contexts/CategoryProvider';
import { useNotification } from '../../../contexts/NotificationProvider';
import { dateFormatter } from '../../../utils/DateFormater';
import StudentImportForm from '../Form/StudentImportForm/StudentImportForm';
import { useTranslation } from 'react-i18next';
// import { useLoading } from '../components/LoadingContext';


function StudentList() {
    const { t } = useTranslation();
    const [students, setStudents] = useState<Student[]>([]);
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const [cloneStudents, setCloneStudents] = useState<Student[]>([]);
    const { category } = useCategory();
    const { notify } = useNotification();
    //get all students

    useEffect(() => {
        setCloneStudents(students);
    }, [students]);

    useEffect(() => {
        const studentService = new StudentAPIServices();
        studentService.getStudents().then((students) => {
            setStudents(students);
        });
    }, []);
    // useEffect(() => {
    //     setStudents(mockStudentsList);
    // }, []);
    const [page, setPage] = useState(1);
    const [selectedStudent, setSelectedStudent] = useState<Student | undefined>(undefined);
    const [gender, setGender] = useState("");
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

    function handleFilter() {
        const filteredStudents = students.filter(student => {
            student.faculty === faculty
        });

        let newStudentList = filteredStudents;
        if (search.trim() !== "") {
            const regex = new RegExp(search, "i");
            newStudentList = filteredStudents.filter(student =>
                regex.test(student.id) || regex.test(student.name)
            );
        }

        setCloneStudents(newStudentList);
        setPage(1);
    }

    useEffect(() => {
        handleFilter();
    }, [faculty]);

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
        const fileService = new FileAPIServices();
        const jsonBlob = await fileService.exportStudentsJSON();
        // const jsonBlob = await exportStudentsJSON();
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
                const fileService = new FileAPIServices();
                await fileService.importStudentsJSON(jsonData);
                notify({ type: "success", msg: "Import JSON file successfully!" });
            }
        };
        reader.readAsText(file);
    };

    // Handle Export XML
    const handleExportXML = async () => {
        const fileService = new FileAPIServices();
        const xmlBlob = await fileService.exportStudentsXML();
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
                const fileService = new FileAPIServices();
                await fileService.importStudentsXML(e.target.result as string);
                alert("Import XML thành công!");
            }
        };
        reader.readAsText(file);
    };

    return (
        <>
            {selectedStudent && <StudentItem selectedStudent={selectedStudent} setSelectedStudent={setSelectedStudent} students={students} setStudents={setStudents} />}
            {isAddFormOpen && <StudentImportForm setIsAddFormOpen={setIsAddFormOpen} setStudents={setStudents} />}
            <div className="board board--student">
                <div className="board__feature">
                    <div className="board__feature__sortfilter">
                        <button onClick={() => setIsAddFormOpen(true)}>
                            {t('button.add')}
                        </button>
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
                                <option value="" disabled>{t('filterHeading.sort')}</option>
                                <option value="ID">{t('tableHeading.id')}</option>
                                <option value="Name">{t('tableHeading.name')}</option>
                                <option value="">{t('filterValue.none')}</option>
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
                                <option value="" disabled>{t('filterHeading.gender')}</option>
                                <option value="Male">Nam</option>
                                <option value="Female">Nữ</option>
                                <option value="">{t('filterValue.none')}</option>
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
                                <option value="" disabled>{t('filterHeading.faculty')}</option>
                                {category.faculty.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))}
                                <option value="">{t('filterValue.none')}</option>
                            </select>
                        </div>
                    </div>
                    <div className="board__feature__search">
                        <input
                            value={search}
                            onChange={(e) => { setSearch(e.target.value) }}
                            type="text"
                            placeholder={t('other.searching')} />
                        <button onClick={() => handleSearch(search)}>
                            <FontAwesomeIcon icon={faSearch} className='icon__search' />
                        </button>
                    </div>
                </div>

                <div className="board__table">
                    <div className="board__table__header">
                        <div className="board__table__attribute">
                            <span>{t('tableHeading.id')}</span>
                        </div>
                        <div className="board__table__attribute">
                            <span>{t('tableHeading.name')}</span>
                        </div>
                        <div className="board__table__attribute">
                            <span>{t('tableHeading.dob')}</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>{t('tableHeading.gender')}</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>{t('tableHeading.program')}</span>
                        </div>

                        <div className="board__table__attribute">
                            <span>{t('tableHeading.academicYear')}</span>
                        </div>

                        <div className="board__table__attribute">
                            <div className="board__table__status"></div>
                        </div>
                    </div>

                    <div className="board__table__data">
                        {cloneStudents.length === 0 && <NothingDisplay desciption={t('other.noStudent') || ''} />}
                        {cloneStudents.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((student: Student) => (
                            <button
                                onClick={() => {
                                    setSelectedStudent(student)
                                }}
                                key={student.id}
                                className="board__table__row">
                                <div className="board__table__attribute">{student.id}</div>
                                <div className="board__table__attribute">{student.name}</div>
                                <div className="board__table__attribute">{dateFormatter(student.dob)}</div>
                                <div className="board__table__attribute">{student.gender ? t(`gender.${student.gender.toLowerCase()}`) : ''}</div>
                                <div className="board__table__attribute">{student.program}</div>
                                <div className="board__table__attribute">{student.academicYear}</div>
                                <div className="board__table__attribute">
                                    <div
                                        style={{ backgroundColor: student.faculty === "Graduated" ? "green" : (student.faculty === "Studying" ? "yellow" : "red") }}
                                        className="board__table__status"></div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="board__table__footer">
                        <div className="board__table__selected">
                            <span>{students.length} {t('other.student')}</span>
                            <button onClick={handleExportXML}>
                                {t('button.exportXML')}
                            </button>
                            <button onClick={handleExportJSON}>
                                {t('button.exportJSON')}
                            </button>

                            {/* <button>
                                Import XML
                            </button>

                            <button>
                                Import JSON
                            </button> */}

                            <label className="custom-file-upload">
                                {t('button.importXML')}
                                <input type="file" accept=".xml" onChange={handleImportXML} />
                            </label>

                            <label className="custom-file-upload">
                                {t('button.importJSON')}
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

export default StudentList;

