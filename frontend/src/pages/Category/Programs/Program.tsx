import { useEffect, useState } from "react";
import { useCategory } from "../../../contexts/CategoryProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowLeft, faLongArrowRight } from '@fortawesome/free-solid-svg-icons'
import "../styles/category.css"
import { useNotification } from "../../../contexts/NotificationProvider";

const Program = () => {
    const { notify } = useNotification();

    const { category, setCategory } = useCategory();
    const [program, setProgram] = useState<string[]>([]);
    const [newProgram, setNewProgram] = useState<string>("");
    const [editProgram, setEditProgram] = useState<string>("");
    const [editNewProgram, setEditNewProgram] = useState<string>("");
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
        setProgram(category.programs);
    }, []);



    function increasePage() {
        if (page < Math.ceil(program.length / amountItem)) {
            setPage(page + 1);
        }
    }

    function decreasePage() {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    function handleCancel() {
        setEditProgram("");
        setEditNewProgram("");
    }

    function handleAddProgram() {
        if (newProgram === "") {
            notify({ type: "error", msg: "program name cannot be empty" });
            return;
        }

        if (program.includes(newProgram)) {
            notify({ type: "warning", msg: "program name already exists" });
            return;
        }

        setProgram([...program, newProgram]);
        setCategory({ ...category, programs: [...program, newProgram] });
        setNewProgram("");

        notify({ type: "success", msg: "Update program successfully" });
    }

    function handleUpdateProgram() {
        if (editNewProgram === "") {
            notify({ type: "error", msg: "program name cannot be empty" });
            return;
        }

        if (program.includes(editNewProgram)) {
            notify({ type: "warning", msg: "program name already exists" });
            return;
        }

        if (editNewProgram === editProgram) {
            notify({ type: "warning", msg: "program name is the same" });
            return;
        }

        const index = program.indexOf(editProgram);
        program[index] = editNewProgram;
        setProgram([...program]);
        setCategory({ ...category, programs: [...program] });
        setEditProgram("");
        setEditNewProgram("");

        notify({ type: "success", msg: "Update program successfully" });
    }

    function handleDeleteProgram() {
        const index = program.indexOf(editProgram);
        program.splice(index, 1);
        setProgram([...program]);
        setCategory({ ...category, programs: [...program] });
        setEditProgram("");
        setEditNewProgram("");

        notify({ type: "success", msg: "Delete program successfully" });

    }

    return (
        <>
            <div className="category">
                <div className="category__left">
                    {editProgram !== "" &&
                        <div className="category__dashboard">
                            <div className="category__dashboard__header">
                                <h3>Program Management</h3>
                                <p>Edit specific program</p>
                            </div>

                            <div className="category__dashboard__body">
                                <div className="dashboard__body__field">
                                    <span>Old Name program</span>
                                    <input
                                        type="text"
                                        value={editProgram}
                                        disabled
                                    />
                                </div>

                                <div className="dashboard__body__field">
                                    <span>New Name program</span>
                                    <input
                                        type="text"
                                        value={editNewProgram}
                                        onChange={(e) => setEditNewProgram(e.target.value)}
                                        placeholder="Enter new program name"
                                    />
                                </div>
                            </div>

                            <div className="category__dashboard__footer">
                                <div className="dashboard__button">
                                    <button onClick={handleCancel}>Cancel</button>
                                    <button onClick={handleDeleteProgram}>Delete</button>
                                    <button onClick={handleUpdateProgram}>Update</button>
                                </div>
                            </div>

                        </div>
                    }

                    {editProgram === "" && <div className="category__dashboard">
                        <div className="category__dashboard__header">
                            <h3>Program Management</h3>
                            <p>Add more programs</p>
                        </div>

                        <div className="category__dashboard__body">
                            <div className="dashboard__body__field">
                                <span>Name program</span>
                                <input
                                    type="text"
                                    value={newProgram}
                                    onChange={(e) => setNewProgram(e.target.value)}
                                    placeholder="Enter program name"
                                />
                            </div>
                        </div>

                        <div className="category__dashboard__footer">
                            <div className="dashboard__button">
                                <button onClick={handleAddProgram}>Add</button>
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
                                <span>program</span>
                            </div>
                        </div>

                        <div className="table__body">
                            {program && program.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((item, index) => (
                                <button
                                    onClick={() => {

                                        setEditProgram(item);

                                    }
                                    }
                                    className="table__row" key={index}>
                                    <div className="table__field">
                                        <span>{index + 1}</span>
                                    </div>

                                    <div className="table__field">
                                        <span>{item}</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="table__footer">
                            <div className="table__left">
                                <span>Total: {program && program.length}</span>
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

export default Program;