import { useEffect, useState } from "react";
import { useCategory } from "../../../contexts/CategoryProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowLeft, faLongArrowRight } from '@fortawesome/free-solid-svg-icons'
import "../styles/category.css"
import { useNotification } from "../../../contexts/NotificationProvider";
import { StudyStatus, StudyStatusAPIServices } from "../../../services/studentStatusAPIServices";
import { useTranslation } from "react-i18next";

const StatusComponent = () => {
    const { t } = useTranslation();
    const { notify } = useNotification();

    const { category, setCategory } = useCategory();
    const [newStatus, setNewStatus] = useState<StudyStatus>({
        id: "",
        name: "",
        description: null,
        createdAt: ""
    });
    const [editStatus, setEditStatus] = useState<StudyStatus | null>(null);
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
        if (screenHeight >= 900) return 8;
        if (screenHeight >= 750) return 7;
        if (screenHeight >= 600) return 6;
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
        if (page < Math.ceil(category.status.length / amountItem)) {
            setPage(page + 1);
        }
    }

    function decreasePage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    function handleCancel() {
        setEditStatus(null);
        setEditNewStatus({
            id: "",
            name: "",
            description: null,
            createdAt: ""
        });
    }

    async function handleAddStatus() {
        if (newStatus.name === "") {
            notify({ type: "error", msg: "status name cannot be empty" });
            return;
        }

        if (category.status.includes(newStatus)) {
            notify({ type: "warning", msg: "status name already exists" });
            return;
        }

        const studyStatusAPIServices = new StudyStatusAPIServices();
        const result = await studyStatusAPIServices.addStudyStatus(newStatus);

        if (!result) {
            notify({ type: "error", msg: "Failed to add status" });
            return;
        }

        const result1 = await studyStatusAPIServices.getStudyStatuses();
        if (!result1) {
            notify({ type: "error", msg: "Failed to fetch updated status list" });
            return;
        }

        setCategory({ ...category, status: [...result1] });
        setNewStatus({
            id: "",
            name: "",
            description: null,
            createdAt: ""
        });

        notify({ type: "success", msg: "Update status successfully" });
    }

    async function handleUpdateStatus() {
        if (!editStatus) {
            notify({ type: "error", msg: "No status selected for editing" });
            return;
        }

        if (editNewStatus.name === "") {
            notify({ type: "error", msg: "status name cannot be empty" });
            return;
        }

        if (category.status.includes(editNewStatus)) {
            notify({ type: "warning", msg: "status name already exists" });
            return;
        }

        if (editNewStatus === editStatus) {
            notify({ type: "warning", msg: "status name is the same" });
            return;
        }

        const studyStatusAPIServices = new StudyStatusAPIServices();
        const result = await studyStatusAPIServices.updateStudyStatus(editStatus.id, editNewStatus);
        if (!result) {
            notify({ type: "error", msg: "Failed to update status" });
            return;
        }
        const result1 = await studyStatusAPIServices.getStudyStatuses();
        if (!result1) {
            notify({ type: "error", msg: "Failed to fetch updated status list" });
            return;
        }

        setCategory({ ...category, status: [...result1] });
        handleCancel();

        notify({ type: "success", msg: "Update status successfully" });
    }

    function handleDeleteStatus() {
        // const index = status.indexOf(editStatus);
        // status.splice(index, 1);
        // setStatus([...status]);
        // setCategory({ ...category, status: [...status] });
        // setEditStatus({
        //     id: "",
        //     name: "",
        //     description: null,
        //     createdAt: ""
        // });
        // setEditNewStatus({
        //     id: "",
        //     name: "",
        //     description: null,
        //     createdAt: ""
        // });

        // notify({ type: "success", msg: "Delete status successfully" });

    }

    return (
        <>
            <div className="category">
                <div className="category__left">
                    {editStatus &&
                        <div className="category__dashboard">
                            <div className="category__dashboard__header">
                                <h3>{t('management.studyStatus.studyStatusManagement')}</h3>
                                <p>{t('management.studyStatus.studyStatusManagementDescription1')}</p>
                            </div>

                            <div className="category__dashboard__body">
                                <div className="dashboard__body__field">
                                    <span>
                                        {t('management.studyStatus.studyStatusOldName')}
                                    </span>
                                    <input
                                        type="text"
                                        value={editStatus.name}
                                        disabled
                                    />
                                </div>
                                <div className="dashboard__body__field">
                                    <span>
                                        {t('management.studyStatus.studyStatusOldId')}
                                    </span>
                                    <input
                                        type="text"
                                        value={editStatus.id}
                                        disabled
                                    />
                                </div>

                                <div className="dashboard__body__field">
                                    <span>
                                        {t('management.studyStatus.studyStatusNewName')}
                                    </span>
                                    <input
                                        type="text"
                                        value={editNewStatus.name}
                                        onChange={(e) => setEditNewStatus({ ...editNewStatus, name: e.target.value })}
                                        placeholder={t('management.studyStatus.studyStatusNewNamePlaceholder')}
                                    />
                                </div>
                            </div>

                            <div className="category__dashboard__footer">
                                <div className="dashboard__button">
                                    <button onClick={handleCancel}>
                                        {t('button.cancel')}
                                    </button>
                                    <button onClick={handleDeleteStatus}>
                                        {t('button.delete')}
                                    </button>
                                    <button onClick={handleUpdateStatus}>
                                        {t('button.update')}
                                    </button>
                                </div>
                            </div>

                        </div>
                    }

                    {!editStatus && <div className="category__dashboard">
                        <div className="category__dashboard__header">
                            <h3>
                                {t('management.studyStatus.studyStatusManagement')}
                            </h3>
                            <p>
                                {t('management.studyStatus.studyStatusManagementDescription2')}
                            </p>
                        </div>

                        <div className="category__dashboard__body">
                            <div className="dashboard__body__field">
                                <span>
                                    {t('management.studyStatus.studyStatusId')}
                                </span>
                                <input
                                    type="text"
                                    value={newStatus.id}
                                    onChange={(e) => setNewStatus({ ...newStatus, id: e.target.value })}
                                    placeholder={t('management.studyStatus.studyStatusIdPlaceholder')}
                                />
                            </div>
                            <div className="dashboard__body__field">
                                <span>
                                    {t('management.studyStatus.studyStatusName')}
                                </span>
                                <input
                                    type="text"
                                    value={newStatus.name}
                                    onChange={(e) => setNewStatus({ ...newStatus, name: e.target.value })}
                                    placeholder={t('management.studyStatus.studyStatusNamePlaceholder')}
                                />
                            </div>
                            <div className="dashboard__body__field">
                                <span>
                                    {t('management.studyStatus.studyStatusDescription')}
                                </span>
                                <input
                                    type="text"
                                    value={newStatus.description || ""}
                                    onChange={(e) => setNewStatus({ ...newStatus, description: e.target.value })}
                                    placeholder={t('management.studyStatus.studyStatusDescriptionPlaceholder')}
                                />
                            </div>
                        </div>

                        <div className="category__dashboard__footer">
                            <div className="dashboard__button">
                                <button onClick={handleAddStatus}>
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
                                    {t('management.studyStatus.studyStatusId')}
                                </span>
                            </div>

                            <div className="table__field">
                                <span>
                                    {t('management.studyStatus.studyStatusName')}
                                </span>
                            </div>
                        </div>

                        <div className="table__body">
                            {category.status && category.status.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((item, index) => (
                                <button
                                    onClick={() => {
                                        setEditStatus(item);

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
                                <span>{t('other.total')}: {category.status && category.status.length}</span>
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

export default StatusComponent;