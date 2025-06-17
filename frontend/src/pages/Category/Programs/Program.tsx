import { useEffect, useState } from "react";
import { useCategory } from "../../../contexts/CategoryProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowLeft, faLongArrowRight } from '@fortawesome/free-solid-svg-icons'
import "../styles/category.css"
import { useNotification } from "../../../contexts/NotificationProvider";
import { useTranslation } from "react-i18next";
import { Program } from "../../../services/programAPIServices";

const ProgramComponent = () => {
    const { notify } = useNotification();
    const { t } = useTranslation();
    const { category, setCategory } = useCategory();
    const [newProgram, setNewProgram] = useState<Program>({
        id: "",
        name: "",
        description: "",
        createdAt: "",
    });
    const [editProgram, setEditProgram] = useState<Program | null>(null);
    const [editNewProgram, setEditNewProgram] = useState<Program>({
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
        if (page < Math.ceil(category.programs.length / amountItem)) {
            setPage(page + 1);
        }
    }

    function decreasePage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    function handleCancel() {
        setEditProgram(null);
        setEditNewProgram({
            id: "",
            name: "",
            description: "",
            createdAt: "",
        });
    }

    function handleAddProgram() {
        // if (newProgram === "") {
        //     notify({ type: "error", msg: "program name cannot be empty" });
        //     return;
        // }

        // if (category.programs.includes(newProgram)) {
        //     notify({ type: "warning", msg: "program name already exists" });
        //     return;
        // }


        // setCategory({ ...category, programs: [...category.programs] });
        // setNewProgram("");

        // notify({ type: "success", msg: "Update program successfully" });
    }

    function handleUpdateProgram() {
        if (editNewProgram.name === "") {
            notify({ type: "error", msg: "Program name cannot be empty" });
            return;
        }

        if (category.programs.includes(editNewProgram)) {
            notify({ type: "warning", msg: "Program already exists" });
            return;
        }

        if (editProgram && editNewProgram.name === editProgram.name) {
            notify({ type: "warning", msg: "Program name is the same" });
            return;
        }

        // const index = program.indexOf(editProgram);
        // program[index] = editNewProgram;
        // setProgram([...program]);
        // setCategory({ ...category, programs: [...program] });
        // setEditProgram("");
        // setEditNewProgram("");

        notify({ type: "success", msg: "Update program successfully" });
    }

    function handleDeleteProgram() {
        // const index = program.indexOf(editProgram);
        // program.splice(index, 1);
        // setProgram([...program]);
        // setCategory({ ...category, programs: [...program] });
        // setEditProgram("");
        // setEditNewProgram("");

        notify({ type: "success", msg: "Delete program successfully" });

    }

    return (
        <>
            <div className="category">
                <div className="category__left">
                    {editProgram &&
                        <div className="category__dashboard">
                            <div className="category__dashboard__header">
                                <h3>
                                    {t("management.program.programManagement")}
                                </h3>
                                <p>
                                    {t("management.program.programManagementDescription1")}
                                </p>
                            </div>

                            <div className="category__dashboard__body">


                                <div className="dashboard__body__field">
                                    <span>
                                        {t("management.program.programOldName")}
                                    </span>
                                    <input
                                        type="text"
                                        value={editProgram.name}
                                        disabled
                                    />
                                </div>

                                <div className="dashboard__body__field">
                                    <span>
                                        {t("management.program.programOldId")}
                                    </span>
                                    <input
                                        type="text"
                                        value={editProgram.id}
                                        disabled
                                    />
                                </div>

                                <div className="dashboard__body__field">
                                    <span>
                                        {t("management.program.programNewName")}
                                    </span>
                                    <input
                                        type="text"
                                        value={editNewProgram.name}
                                        onChange={(e) => setEditNewProgram({ ...editNewProgram, name: e.target.value })}
                                        placeholder={t("management.program.programNewNamePlaceholder")}
                                    />
                                </div>
                            </div>

                            <div className="category__dashboard__footer">
                                <div className="dashboard__button">
                                    <button onClick={handleCancel}>
                                        {t("button.cancel")}
                                    </button>
                                    <button onClick={handleDeleteProgram}>
                                        {t("button.delete")}
                                    </button>
                                    <button onClick={handleUpdateProgram}>
                                        {t("button.update")}
                                    </button>
                                </div>
                            </div>

                        </div>
                    }

                    {!editProgram && <div className="category__dashboard">
                        <div className="category__dashboard__header">
                            <h3>
                                {t("management.program.programManagement")}
                            </h3>
                            <p>
                                {t("management.program.programManagementDescription2")}
                            </p>
                        </div>

                        <div className="category__dashboard__body">
                            <div className="dashboard__body__field">
                                <span>
                                    {t("management.program.programId")}
                                </span>
                                <input
                                    type="text"
                                    value={newProgram.id}
                                    onChange={(e) => setNewProgram({ ...newProgram, id: e.target.value })}
                                    placeholder={t("management.program.programIdPlaceholder")}
                                />
                            </div>

                            <div className="dashboard__body__field">
                                <span>
                                    {t("management.program.programName")}
                                </span>
                                <input
                                    type="text"
                                    value={newProgram.name}
                                    onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })}
                                    placeholder={t("management.program.programNamePlaceholder")}
                                />
                            </div>

                            <div className="dashboard__body__field">
                                <span>
                                    {t("management.program.programDescription")}
                                </span>
                                <input
                                    type="text"
                                    value={newProgram.description}
                                    onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                                    placeholder={t("management.program.programDescriptionPlaceholder")}
                                />
                            </div>
                        </div>

                        <div className="category__dashboard__footer">
                            <div className="dashboard__button">
                                <button onClick={handleAddProgram}>
                                    {t("button.add")}
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
                                    {t("management.program.programId")}
                                </span>
                            </div>

                            <div className="table__field">
                                <span>
                                    {t("management.program.programName")}
                                </span>
                            </div>
                        </div>

                        <div className="table__body">
                            {category.programs && category.programs.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((item, index) => (
                                <button
                                    onClick={() => {
                                        setEditProgram(item);
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
                                <span>{t('other.total')}: {category.programs && category.programs.length}</span>
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

export default ProgramComponent;