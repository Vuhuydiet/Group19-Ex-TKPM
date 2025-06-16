import { useEffect, useState } from "react";
import { useCategory } from "../../../contexts/CategoryProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowLeft, faLongArrowRight } from '@fortawesome/free-solid-svg-icons'
import "../styles/category.css"
import { useNotification } from "../../../contexts/NotificationProvider";
import { Faculty, FacultyAPIServices } from "../../../services/facultyAPIServices";
import * as e from "express";

const FacultyComponent = () => {
    const { notify } = useNotification();

    const { category, setCategory } = useCategory();
    const [faculty, setFaculty] = useState<Faculty[]>([]);
    const [newFaculty, setNewFaculty] = useState<Faculty>({
        id: "",
        name: "",
        description: "",
        createdAt: "",
    });
    const [editFaculty, setEditFaculty] = useState<Faculty>({
        id: "",
        name: "",
        description: "",
        createdAt: "",
    });
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


    useEffect(() => {
        setFaculty(category.faculty);
    }, []);

    function increasePage() {
        if (page < Math.ceil(faculty.length / amountItem)) {
            setPage(page + 1);
        }
    }

    function decreasePage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    function handleCancel() {
        setEditFaculty({
            id: "",
            name: "",
            description: "",
            createdAt: "",
        });
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

        if (faculty.includes(newFaculty)) {
            notify({ type: "warning", msg: "Faculty name already exists" });
            return;
        }

        const facultyAPIServices = new FacultyAPIServices();
        const result = await facultyAPIServices.addFaculty(newFaculty);

        if (result === null) {
            notify({ type: "error", msg: "Add faculty failed" });
            return;
        }

        setFaculty([...faculty, newFaculty]);
        setCategory({ ...category, faculty: [...faculty, newFaculty] });
        setNewFaculty({
            id: "",
            name: "",
            description: "",
            createdAt: "",
        });

        notify({ type: "success", msg: "Update faculty successfully" });
    }

    async function handleUpdateFaculty() {
        if (editNewFaculty.name === "") {
            notify({ type: "error", msg: "Faculty name cannot be empty" });
            return;
        }

        if (faculty.includes(editNewFaculty)) {
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

        setFaculty(result1);
        setCategory({ ...category, faculty: [...result1] });
        setEditFaculty({
            id: "",
            name: "",
            description: "",
            createdAt: "",
        });
        setEditNewFaculty({
            id: "",
            name: "",
            description: "",
            createdAt: "",
        });

        notify({ type: "success", msg: "Update faculty successfully" });
    }

    async function handleDeleteFaculty() {
        const facultyAPIServices = new FacultyAPIServices();
        const result = await facultyAPIServices.deleteFaculty(editFaculty.id);

        if (result === null) {
            notify({ type: "error", msg: "Delete faculty failed" });
            return;
        }

        const result1 = await facultyAPIServices.getFaculties();
        if (result1 === null) {
            notify({ type: "error", msg: "Get faculties failed" });
            return;
        }

        setFaculty([...result1]);
        setCategory({ ...category, faculty: [...result1] });
        setEditFaculty({
            id: "",
            name: "",
            description: "",
            createdAt: "",
        });
        setEditNewFaculty({
            id: "",
            name: "",
            description: "",
            createdAt: "",
        });

        notify({ type: "success", msg: "Delete faculty successfully" });

    }

    return (
        <>
            <div className="category">
                <div className="category__left">
                    {editFaculty.name !== "" &&
                        <div className="category__dashboard">
                            <div className="category__dashboard__header">
                                <h3>Faculty Management</h3>
                                <p>Edit specific faculty</p>
                            </div>

                            <div className="category__dashboard__body">
                                <div className="dashboard__body__field">
                                    <span>Old Name Faculty</span>
                                    <input
                                        type="text"
                                        value={editFaculty.name}
                                        disabled
                                    />
                                </div>

                                <div className="dashboard__body__field">
                                    <span>New Name Faculty</span>
                                    <input
                                        type="text"
                                        value={editNewFaculty.name}
                                        onChange={(e) => setEditNewFaculty({ ...editNewFaculty, name: e.target.value })}
                                        placeholder="Enter new faculty name"
                                    />
                                </div>
                            </div>

                            <div className="category__dashboard__footer">
                                <div className="dashboard__button">
                                    <button onClick={handleCancel}>Cancel</button>
                                    <button onClick={handleDeleteFaculty}>Delete</button>
                                    <button onClick={handleUpdateFaculty}>Update</button>
                                </div>
                            </div>

                        </div>
                    }

                    {editFaculty.name === "" && <div className="category__dashboard">
                        <div className="category__dashboard__header">
                            <h3>Faculty Management</h3>
                            <p>Add more faculties</p>
                        </div>

                        <div className="category__dashboard__body">
                            <div className="dashboard__body__field">
                                <span>ID Faculty</span>
                                <input
                                    type="text"
                                    value={newFaculty.id}
                                    onChange={(e) => setNewFaculty({ ...newFaculty, id: e.target.value })}
                                    placeholder="Enter faculty id"
                                />
                            </div>
                            <div className="dashboard__body__field">
                                <span>Name Faculty</span>
                                <input
                                    type="text"
                                    value={newFaculty.name}
                                    onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                                    placeholder="Enter faculty name"
                                />
                            </div>
                            <div className="dashboard__body__field">
                                <span>Description Faculty</span>
                                <input
                                    type="text"
                                    value={newFaculty.name}
                                    onChange={(e) => setNewFaculty({ ...newFaculty, description: e.target.value })}
                                    placeholder="Enter faculty description"
                                />
                            </div>
                        </div>

                        <div className="category__dashboard__footer">
                            <div className="dashboard__button">
                                <button onClick={handleAddFaculty}>Add</button>
                            </div>
                        </div>

                    </div>}
                </div>

                <div className="category__right">
                    <div className="table">
                        <div className="table__header">
                            <div className="table__field">
                                <span>STT</span>
                            </div>

                            <div className="table__field">
                                <span>Faculty</span>
                            </div>
                        </div>

                        <div className="table__body">
                            {faculty && faculty.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((item, index) => (
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
                                <span>Total: {faculty && faculty.length}</span>
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