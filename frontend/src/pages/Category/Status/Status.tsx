import { useEffect, useState } from "react";
import { useCategory } from "../../../contexts/CategoryProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowLeft, faLongArrowRight } from '@fortawesome/free-solid-svg-icons'
import "../styles/category.css"
import { useNotification } from "../../../contexts/NotificationProvider";
import { StudyStatus } from "../../../services/studentStatusAPIServices";

const Status = () => {
    const { notify } = useNotification();

    const { category, setCategory } = useCategory();
    const [status, setStatus] = useState<StudyStatus[]>([]);
    const [newStatus, setNewStatus] = useState<StudyStatus>({
        id: "",
        name: "",
        description: null,
        createdAt: ""
    });
    const [editStatus, setEditStatus] = useState<StudyStatus>({
        id: "",
        name: "",
        description: null,
        createdAt: ""
    });
    const [editNewStatus, setEditNewStatus] = useState<StudyStatus>({
        id: "",
        name: "",
        description: null,
        createdAt: ""
    });
    const [page, setPage] = useState(1);

    const [amountItem, setAmountItem] = useState(0);

    function calculateItemsPerPage() {
        const screenHeight = window.innerHeight;
        if (screenHeight >= 900) return 7;
        if (screenHeight >= 750) return 6;
        if (screenHeight >= 600) return 5;
        return 4;
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
        setStatus(category.status);
    }, []);



    function increasePage() {
        if (page < Math.ceil(status.length / amountItem)) {
            setPage(page + 1);
        }
    }

    function decreasePage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    function handleCancel() {
        setEditStatus({
            id: "",
            name: "",
            description: null,
            createdAt: ""
        });
        setEditNewStatus({
            id: "",
            name: "",
            description: null,
            createdAt: ""
        });
    }

    function handleAddStatus() {
        if (newStatus.name === "") {
            notify({ type: "error", msg: "status name cannot be empty" });
            return;
        }

        if (status.includes(newStatus)) {
            notify({ type: "warning", msg: "status name already exists" });
            return;
        }

        setStatus([...status, newStatus]);
        setCategory({ ...category, status: [...status, newStatus] });
        setNewStatus({
            id: "",
            name: "",
            description: null,
            createdAt: ""
        });

        notify({ type: "success", msg: "Update status successfully" });
    }

    function handleUpdateStatus() {
        if (editNewStatus.name === "") {
            notify({ type: "error", msg: "status name cannot be empty" });
            return;
        }

        if (status.includes(editNewStatus)) {
            notify({ type: "warning", msg: "status name already exists" });
            return;
        }

        if (editNewStatus === editStatus) {
            notify({ type: "warning", msg: "status name is the same" });
            return;
        }

        const index = status.indexOf(editStatus);
        status[index] = editNewStatus;
        setStatus([...status]);
        setCategory({ ...category, status: [...status] });
        setEditStatus({
            id: "",
            name: "",
            description: null,
            createdAt: ""
        });
        setEditNewStatus({
            id: "",
            name: "",
            description: null,
            createdAt: ""
        });

        notify({ type: "success", msg: "Update status successfully" });
    }

    function handleDeleteStatus() {
        const index = status.indexOf(editStatus);
        status.splice(index, 1);
        setStatus([...status]);
        setCategory({ ...category, status: [...status] });
        setEditStatus({
            id: "",
            name: "",
            description: null,
            createdAt: ""
        });
        setEditNewStatus({
            id: "",
            name: "",
            description: null,
            createdAt: ""
        });

        notify({ type: "success", msg: "Delete status successfully" });

    }

    return (
        <>
            <div className="category">
                <div className="category__left">
                    {editStatus.name !== "" &&
                        <div className="category__dashboard">
                            <div className="category__dashboard__header">
                                <h3>Status Management</h3>
                                <p>Edit specific status</p>
                            </div>

                            <div className="category__dashboard__body">
                                <div className="dashboard__body__field">
                                    <span>Old Name status</span>
                                    <input
                                        type="text"
                                        value={editStatus.name}
                                        disabled
                                    />
                                </div>
                                <div className="dashboard__body__field">
                                    <span>Old Name ID</span>
                                    <input
                                        type="text"
                                        value={editStatus.id}
                                        disabled
                                    />
                                </div>

                                <div className="dashboard__body__field">
                                    <span>New Name status</span>
                                    <input
                                        type="text"
                                        value={editNewStatus.name}
                                        onChange={(e) => setEditNewStatus({ ...editNewStatus, name: e.target.value })}
                                        placeholder="Enter new status name"
                                    />
                                </div>
                            </div>

                            <div className="category__dashboard__footer">
                                <div className="dashboard__button">
                                    <button onClick={handleCancel}>Cancel</button>
                                    <button onClick={handleDeleteStatus}>Delete</button>
                                    <button onClick={handleUpdateStatus}>Update</button>
                                </div>
                            </div>

                        </div>
                    }

                    {editStatus.name === "" && <div className="category__dashboard">
                        <div className="category__dashboard__header">
                            <h3>Status Management</h3>
                            <p>Add more status</p>
                        </div>

                        <div className="category__dashboard__body">
                            <div className="dashboard__body__field">
                                <span>ID status</span>
                                <input
                                    type="text"
                                    value={newStatus.id}
                                    onChange={(e) => setNewStatus({...newStatus, id: e.target.value })}
                                    placeholder="Enter status name"
                                />
                            </div>
                            <div className="dashboard__body__field">
                                <span>Name status</span>
                                <input
                                    type="text"
                                    value={newStatus.name}
                                    onChange={(e) => setNewStatus({...newStatus, name: e.target.value })}
                                    placeholder="Enter status name"
                                />
                            </div>
                            <div className="dashboard__body__field">
                                <span>Description status</span>
                                <input
                                    type="text"
                                    value={newStatus.name}
                                    onChange={(e) => setNewStatus({...newStatus, description: e.target.value })}
                                    placeholder="Enter status name"
                                />
                            </div>
                        </div>

                        <div className="category__dashboard__footer">
                            <div className="dashboard__button">
                                <button onClick={handleAddStatus}>Add</button>
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
                                <span>status</span>
                            </div>
                        </div>

                        <div className="table__body">
                            {status && status.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((item, index) => (
                                <button
                                    onClick={() => {
                                        setEditStatus(item);

                                    }
                                    }
                                    className="table__row" key={index}>
                                    <div className="table__field">
                                        <span>{item.name}</span>
                                    </div>

                                    <div className="table__field">
                                        <span>{item.name}</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="table__footer">
                            <div className="table__left">
                                <span>Total: {status && status.length}</span>
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

export default Status;