import { useEffect, useState } from "react";
import { useCategory } from "../../../contexts/CategoryProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowLeft, faLongArrowRight } from '@fortawesome/free-solid-svg-icons'
import "../styles/category.css"
import { useNotification } from "../../../contexts/NotificationProvider";
import { Faculty, FacultyAPIServices } from "../../../services/facultyAPIServices";
import { useTranslation } from "react-i18next";

const FacultyComponent = () => {
    const { t } = useTranslation();
    const { notify } = useNotification();

    const { category, setCategory } = useCategory();
    const [newFaculty, setNewFaculty] = useState<Faculty>({
        id: "",
        name: "",
        description: "",
        createdAt: "",
    });
    const [editFaculty, setEditFaculty] = useState<Faculty | null>(null);
    const [editNewFaculty, setEditNewFaculty] = useState<Faculty>({
        id: "",
        name: "",
        description: "",
        createdAt: "",
    });
    const [page, setPage] = useState(1);

    const [amountItem, setAmountItem] = useState(0);

    function calculateItemsPerPage() {
        const screenHeight = window.innerHeight;
        if (screenHeight >= 900) return 11;
        if (screenHeight >= 750) return 9;
        if (screenHeight >= 600) return 7;
        return 5;
    }

    useEffect(() => {
        setAmountItem(calculateItemsPerPage());
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
        if (page < Math.ceil(category.faculty.length / amountItem)) {
            setPage(page + 1);
        }
    }

    function decreasePage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    function handleCancel() {
        setEditFaculty(null);
        setEditNewFaculty({
            id: "",
            name: "",
            description: "",
            createdAt: "",
        });
    }

    async function handleAddFaculty() {
        if (newFaculty.name === "") {
            notify({ type: "error", msg: "Faculty name cannot be empty" });
            return;
        }

        if (category.faculty.includes(newFaculty)) {
            notify({ type: "warning", msg: "Faculty name already exists" });
            return;
        }

        const facultyAPIServices = new FacultyAPIServices();
        const result = await facultyAPIServices.addFaculty(newFaculty);

        if (result === null) {
            notify({ type: "error", msg: "Add faculty failed" });
            return;
        }

        setCategory({ ...category, faculty: [...category.faculty, newFaculty] });
        setNewFaculty({
            id: "",
            name: "",
            description: "",
            createdAt: "",
        });

        notify({ type: "success", msg: "Update faculty successfully" });
    }

    async function handleUpdateFaculty() {
        if (!editFaculty) {
            notify({ type: "error", msg: "No faculty selected for update" });
            return;
        }
        if (editNewFaculty.name === "") {
            notify({ type: "error", msg: "Faculty name cannot be empty" });
            return;
        }

        if (category.faculty.includes(editNewFaculty)) {
            notify({ type: "warning", msg: "Faculty name already exists" });
            return;
        }

        if (editNewFaculty.name === editFaculty.name) {
            notify({ type: "warning", msg: "Faculty name is the same" });
            return;
        }

        const facultyAPIServices = new FacultyAPIServices();
        console.log(editFaculty.id, editNewFaculty);
        const result = await facultyAPIServices.updateFaculty(editFaculty.id, editNewFaculty);

        console.log(result);

        if (result === null) {
            notify({ type: "error", msg: "Update faculty failed" });
            return;
        }



        const result1 = await facultyAPIServices.getFaculties();
        if (result1 === null) {
            notify({ type: "error", msg: "Get faculties failed" });
            return;
        }


        setCategory({ ...category, faculty: [...result1] });
        handleCancel();
        notify({ type: "success", msg: "Update faculty successfully" });
    }

    async function handleDeleteFaculty() {
        // const facultyAPIServices = new FacultyAPIServices();
        // const result = await facultyAPIServices.deleteFaculty(editFaculty.id);

        // if (result === null) {
        //     notify({ type: "error", msg: "Delete faculty failed" });
        //     return;
        // }

        // const result1 = await facultyAPIServices.getFaculties();
        // if (result1 === null) {
        //     notify({ type: "error", msg: "Get faculties failed" });
        //     return;
        // }


        // setCategory({ ...category, faculty: [...result1] });
        // setEditFaculty({
        //     id: "",
        //     name: "",
        //     description: "",
        //     createdAt: "",
        // });
        // setEditNewFaculty({
        //     id: "",
        //     name: "",
        //     description: "",
        //     createdAt: "",
        // });

        // notify({ type: "success", msg: "Delete faculty successfully" });

    }

    return (
        <>
            <div className="category">
                <div className="category__left">
                    {editFaculty &&
                        <div className="category__dashboard">
                            <div className="category__dashboard__header">
                                <h3>
                                    {t('management.faculty.facultyManagement')}
                                </h3>
                                <p>
                                    {t('management.faculty.facultyManagementDescription1')}
                                </p>
                            </div>

                            <div className="category__dashboard__body">
                                <div className="dashboard__body__field">
                                    <span>
                                        {t('management.faculty.facultyOldName')}
                                    </span>
                                    <input
                                        type="text"
                                        value={editFaculty.name}
                                        disabled
                                    />
                                </div>

                                <div className="dashboard__body__field">
                                    <span>
                                        {t('management.faculty.facultyOldId')}
                                    </span>
                                    <input
                                        type="text"
                                        value={editFaculty.id}
                                        disabled
                                    />
                                </div>

                                <div className="dashboard__body__field">
                                    <span>
                                        {t('management.faculty.facultyNewName')}
                                    </span>
                                    <input
                                        type="text"
                                        value={editNewFaculty.name}
                                        onChange={(e) => setEditNewFaculty({ ...editNewFaculty, name: e.target.value })}
                                        placeholder={t('management.faculty.facultyNewNamePlaceholder')}
                                    />
                                </div>
                            </div>

                            <div className="category__dashboard__footer">
                                <div className="dashboard__button">
                                    <button onClick={handleCancel}>
                                        {t('button.cancel')}
                                    </button>
                                    <button onClick={handleDeleteFaculty}>
                                        {t('button.delete')}
                                    </button>
                                    <button onClick={handleUpdateFaculty}>
                                        {t('button.update')}
                                    </button>
                                </div>
                            </div>

                        </div>
                    }

                    {!editFaculty && <div className="category__dashboard">
                        <div className="category__dashboard__header">
                            <h3>
                                {t('management.faculty.facultyManagement')}
                            </h3>
                            <p>
                                {t('management.faculty.facultyManagementDescription2')}
                            </p>
                        </div>

                        <div className="category__dashboard__body">
                            <div className="dashboard__body__field">
                                <span>
                                    {t('management.faculty.facultyId')}
                                </span>
                                <input
                                    type="text"
                                    value={newFaculty.id}
                                    onChange={(e) => setNewFaculty({ ...newFaculty, id: e.target.value })}
                                    placeholder={t('management.faculty.facultyIdPlaceholder')}
                                />
                            </div>
                            <div className="dashboard__body__field">
                                <span>
                                    {t('management.faculty.facultyName')}
                                </span>
                                <input
                                    type="text"
                                    value={newFaculty.name}
                                    onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                                    placeholder={t('management.faculty.facultyNamePlaceholder')}
                                />
                            </div>
                            <div className="dashboard__body__field">
                                <span>
                                    {t('management.faculty.facultyDescription')}
                                </span>
                                <input
                                    type="text"
                                    value={newFaculty.name}
                                    onChange={(e) => setNewFaculty({ ...newFaculty, description: e.target.value })}
                                    placeholder={t('management.faculty.facultyDescriptionPlaceholder')}
                                />
                            </div>
                        </div>

                        <div className="category__dashboard__footer">
                            <div className="dashboard__button">
                                <button onClick={handleAddFaculty}>
                                    {t('button.add')}
                                </button>
                            </div>
                        </div>

                    </div>}
                </div>

                <div className="category__right">
                    <div className="table">
                        <div className="table__header">
                            <div className="table__field">
                                <span>
                                    {t('management.faculty.facultyId')}
                                </span>
                            </div>

                            <div className="table__field">
                                <span>
                                    {t('management.faculty.facultyName')}
                                </span>
                            </div>
                        </div>

                        <div className="table__body">
                            {category.faculty && category.faculty.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((item, index) => (
                                <button
                                    onClick={() => {

                                        setEditFaculty(item);

                                    }
                                    }
                                    className="table__row" key={index}>
                                    <div className="table__field">
                                        <span>{item.id}</span>
                                    </div>

                                    <div className="table__field">
                                        <span>{item.name}</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="table__footer">
                            <div className="table__left">
                                <span>{t('other.total')}: {category.faculty && category.faculty.length}</span>
                            </div>

                            <div className="table__right">
                                <div className="table__paging">
                                    <button onClick={decreasePage}>
                                        <FontAwesomeIcon icon={faLongArrowLeft} />
                                    </button>
                                    <button onClick={increasePage}>
                                        <FontAwesomeIcon icon={faLongArrowRight} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FacultyComponent