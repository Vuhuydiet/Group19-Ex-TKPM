// import { useEffect, useState } from "react";
// import { useCategory } from "../../../contexts/CategoryProvider";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faLongArrowLeft, faLongArrowRight } from '@fortawesome/free-solid-svg-icons'
// import "../styles/category.css"
// import { useNotification } from "../../../contexts/NotificationProvider";

// const Program = () => {
//     const { notify } = useNotification();

//     const { category, setCategory } = useCategory();
//     const [program, setProgram] = useState<string[]>([]);
//     const [newProgram, setNewProgram] = useState<string>("");
//     const [editProgram, setEditProgram] = useState<string>("");
//     const [editNewProgram, setEditNewProgram] = useState<string>("");
//     const [page, setPage] = useState(1);

//     const [amountItem, setAmountItem] = useState(0);

//     function calculateItemsPerPage() {
//         const screenHeight = window.innerHeight;
//         if (screenHeight >= 900) return 11;
//         if (screenHeight >= 750) return 9;
//         if (screenHeight >= 600) return 7;
//         return 5;
//     }

//     useEffect(() => {
//         setAmountItem(calculateItemsPerPage());
//     }, []);

//     useEffect(() => {
//         const handleResize = () => {
//             setAmountItem(calculateItemsPerPage());
//             setPage(1);
//         };

//         window.addEventListener("resize", handleResize);

//         return () => {
//             window.removeEventListener("resize", handleResize);
//         };
//     }, []);


//     useEffect(() => {
//         setProgram(category.programs);
//     }, []);



//     function increasePage() {
//         if (page < Math.ceil(program.length / amountItem)) {
//             setPage(page + 1);
//         }
//     }

//     function decreasePage() {
//         if (page > 1) {
//             setPage(page - 1);
//         }
//     }

//     function handleCancel() {
//         setEditProgram("");
//         setEditNewProgram("");
//     }

//     function handleAddProgram() {
//         if (newProgram === "") {
//             notify({ type: "error", msg: "program name cannot be empty" });
//             return;
//         }

//         if (program.includes(newProgram)) {
//             notify({ type: "warning", msg: "program name already exists" });
//             return;
//         }

//         setProgram([...program, newProgram]);
//         setCategory({ ...category, programs: [...program, newProgram] });
//         setNewProgram("");

//         notify({ type: "success", msg: "Update program successfully" });
//     }

//     function handleUpdateProgram() {
//         if (editNewProgram === "") {
//             notify({ type: "error", msg: "program name cannot be empty" });
//             return;
//         }

//         if (program.includes(editNewProgram)) {
//             notify({ type: "warning", msg: "program name already exists" });
//             return;
//         }

//         if (editNewProgram === editProgram) {
//             notify({ type: "warning", msg: "program name is the same" });
//             return;
//         }

//         const index = program.indexOf(editProgram);
//         program[index] = editNewProgram;
//         setProgram([...program]);
//         setCategory({ ...category, programs: [...program] });
//         setEditProgram("");
//         setEditNewProgram("");

//         notify({ type: "success", msg: "Update program successfully" });
//     }

//     function handleDeleteProgram() {
//         const index = program.indexOf(editProgram);
//         program.splice(index, 1);
//         setProgram([...program]);
//         setCategory({ ...category, programs: [...program] });
//         setEditProgram("");
//         setEditNewProgram("");

//         notify({ type: "success", msg: "Delete program successfully" });

//     }

//     return (
//         <>
//             <div className="category">
//                 <div className="category__left">
//                     {editProgram !== "" &&
//                         <div className="category__dashboard">
//                             <div className="category__dashboard__header">
//                                 <h3>Program Management</h3>
//                                 <p>Edit specific program</p>
//                             </div>

//                             <div className="category__dashboard__body">
//                                 <div className="dashboard__body__field">
//                                     <span>Old Name program</span>
//                                     <input
//                                         type="text"
//                                         value={editProgram}
//                                         disabled
//                                     />
//                                 </div>

//                                 <div className="dashboard__body__field">
//                                     <span>New Name program</span>
//                                     <input
//                                         type="text"
//                                         value={editNewProgram}
//                                         onChange={(e) => setEditNewProgram(e.target.value)}
//                                         placeholder="Enter new program name"
//                                     />
//                                 </div>
//                             </div>

//                             <div className="category__dashboard__footer">
//                                 <div className="dashboard__button">
//                                     <button onClick={handleCancel}>Cancel</button>
//                                     <button onClick={handleDeleteProgram}>Delete</button>
//                                     <button onClick={handleUpdateProgram}>Update</button>
//                                 </div>
//                             </div>

//                         </div>
//                     }

//                     {editProgram === "" && <div className="category__dashboard">
//                         <div className="category__dashboard__header">
//                             <h3>Program Management</h3>
//                             <p>Add more programs</p>
//                         </div>

//                         <div className="category__dashboard__body">
//                             <div className="dashboard__body__field">
//                                 <span>Name program</span>
//                                 <input
//                                     type="text"
//                                     value={newProgram}
//                                     onChange={(e) => setNewProgram(e.target.value)}
//                                     placeholder="Enter program name"
//                                 />
//                             </div>
//                         </div>

//                         <div className="category__dashboard__footer">
//                             <div className="dashboard__button">
//                                 <button onClick={handleAddProgram}>Add</button>
//                             </div>
//                         </div>

//                     </div>}
//                 </div>

//                 <div className="category__right">
//                     <div className="table">
//                         <div className="table__header">
//                             <div className="table__field">
//                                 <span>STT</span>
//                             </div>

//                             <div className="table__field">
//                                 <span>program</span>
//                             </div>
//                         </div>

//                         <div className="table__body">
//                             {program && program.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((item, index) => (
//                                 <button
//                                     onClick={() => {

//                                         setEditProgram(item);

//                                     }
//                                     }
//                                     className="table__row" key={index}>
//                                     <div className="table__field">
//                                         <span>{index + 1}</span>
//                                     </div>

//                                     <div className="table__field">
//                                         <span>{item}</span>
//                                     </div>
//                                 </button>
//                             ))}
//                         </div>

//                         <div className="table__footer">
//                             <div className="table__left">
//                                 <span>Total: {program && program.length}</span>
//                             </div>

//                             <div className="table__right">
//                                 <div className="table__paging">
//                                     <button onClick={decreasePage}>
//                                         <FontAwesomeIcon icon={faLongArrowLeft} />
//                                     </button>
//                                     <button onClick={increasePage}>
//                                         <FontAwesomeIcon icon={faLongArrowRight} />
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Program;


// frontend/src/pages/Category/Program/Program.tsx

import { useEffect, useState } from "react";
import { useCategory } from "../../../contexts/CategoryProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowLeft, faLongArrowRight } from '@fortawesome/free-solid-svg-icons'
import "../styles/category.css"
import { useNotification } from "../../../contexts/NotificationProvider";
import { useTranslation } from "react-i18next";
// Import service và interface Program
import { Program, ProgramAPIServices } from "../../../services/programAPIServices";

const ProgramComponent = () => {
    const { notify } = useNotification();
    const { t } = useTranslation();
    const { category, setCategory } = useCategory(); // Lấy cả setCategory để cập nhật state

    const [newProgram, setNewProgram] = useState<Omit<Program, 'createdAt'>>({
        id: "",
        name: "",
        description: "",
    });
    const [editProgram, setEditProgram] = useState<Program | null>(null);
    const [editNewProgram, setEditNewProgram] = useState<Omit<Program, 'id' | 'createdAt'>>({
        name: "",
        description: "",
    });
    const [page, setPage] = useState(1);
    const [amountItem, setAmountItem] = useState(0);

    // --- CÁC HÀM TÍNH TOÁN VÀ useEffect GIỮ NGUYÊN ---
    function calculateItemsPerPage() {
        const screenHeight = window.innerHeight;
        if (screenHeight >= 900) return 11;
        if (screenHeight >= 750) return 9;
        if (screenHeight >= 600) return 7;
        return 5;
    }
    useEffect(() => { setAmountItem(calculateItemsPerPage()); }, []);
    useEffect(() => {
        const handleResize = () => { setAmountItem(calculateItemsPerPage()); setPage(1); };
        window.addEventListener("resize", handleResize);
        return () => { window.removeEventListener("resize", handleResize); };
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

    // --- CÁC HÀM XỬ LÝ SỰ KIỆN ĐƯỢC CẬP NHẬT ---
    function handleSelectEdit(program: Program) {
        setEditProgram(program);
        setEditNewProgram({
            name: program.name,
            description: program.description
        });
    }
    
    function handleCancel() {
        setEditProgram(null);
        setEditNewProgram({ name: "", description: "" });
    }

    async function handleAddProgram() {
        if (!newProgram.id || !newProgram.name) {
            notify({ type: "error", msg: "Program ID and Name cannot be empty" });
            return;
        }

        const programService = new ProgramAPIServices();
        try {
            await programService.addProgram(newProgram);
            notify({ type: "success", msg: "Program added successfully!" });

            // Lấy lại danh sách mới và cập nhật state
            const updatedPrograms = await programService.getPrograms();
            setCategory({ ...category, programs: updatedPrograms });

            // Reset form
            setNewProgram({ id: "", name: "", description: "" });
        } catch (error) {
            console.error("Failed to add program:", error);
            notify({ type: "error", msg: "Failed to add program. ID might already exist." });
        }
    }

    async function handleUpdateProgram() {
        if (!editProgram) {
            notify({ type: "error", msg: "No program selected for update." });
            return;
        }
        if (!editNewProgram.name) {
            notify({ type: "error", msg: "Program name cannot be empty." });
            return;
        }
        if (editNewProgram.name === editProgram.name && editNewProgram.description === editProgram.description) {
            notify({ type: "info", msg: "No changes to update." });
            return;
        }

        const programService = new ProgramAPIServices();
        try {
            await programService.updateProgram(editProgram.id, editNewProgram);
            notify({ type: "success", msg: "Program updated successfully!" });

            const updatedPrograms = await programService.getPrograms();
            setCategory({ ...category, programs: updatedPrograms });
            handleCancel();
        } catch (error) {
            console.error("Failed to update program:", error);
            notify({ type: "error", msg: "Failed to update program." });
        }
    }

    async function handleDeleteProgram() {
        if (!editProgram) {
            notify({ type: "error", msg: "No program selected for delete." });
            return;
        }

        if (!window.confirm(`Are you sure you want to delete program "${editProgram.name}"?`)) {
            return;
        }

        const programService = new ProgramAPIServices();
        try {
            await programService.deleteProgram(editProgram.id);
            notify({ type: "success", msg: "Program deleted successfully!" });

            const updatedPrograms = await programService.getPrograms();
            setCategory({ ...category, programs: updatedPrograms });
            handleCancel();
        } catch (error) {
            console.error("Failed to delete program:", error);
            notify({ type: "error", msg: "Failed to delete program. It may be in use." });
        }
    }

    return (
        <>
            <div className="category">
                <div className="category__left">
                    {/* EDIT FORM */}
                    {editProgram &&
                        <div className="category__dashboard">
                            <div className="category__dashboard__header">
                                <h3>{t("management.program.programManagement")}</h3>
                                <p>{t("management.program.programManagementDescription1")}</p>
                            </div>
                            <div className="category__dashboard__body">
                                <div className="dashboard__body__field">
                                    <span>{t("management.program.programOldId")}</span>
                                    <input type="text" value={editProgram.id} disabled />
                                </div>
                                <div className="dashboard__body__field">
                                    <span>{t("management.program.programNewName")}</span>
                                    <input
                                        type="text"
                                        value={editNewProgram.name}
                                        onChange={(e) => setEditNewProgram({ ...editNewProgram, name: e.target.value })}
                                        placeholder={t("management.program.programNewNamePlaceholder")}
                                    />
                                </div>
                                <div className="dashboard__body__field">
                                    <span>{t("management.program.programDescription")}</span>
                                    <input
                                        type="text"
                                        value={editNewProgram.description || ""}
                                        onChange={(e) => setEditNewProgram({ ...editNewProgram, description: e.target.value })}
                                        placeholder={t("management.program.programDescriptionPlaceholder")}
                                    />
                                </div>
                            </div>
                            <div className="category__dashboard__footer">
                                <div className="dashboard__button">
                                    <button onClick={handleCancel}>{t("button.cancel")}</button>
                                    <button onClick={handleDeleteProgram}>{t("button.delete")}</button>
                                    <button onClick={handleUpdateProgram}>{t("button.update")}</button>
                                </div>
                            </div>
                        </div>
                    }

                    {/* ADD FORM */}
                    {!editProgram && 
                        <div className="category__dashboard">
                            <div className="category__dashboard__header">
                                <h3>{t("management.program.programManagement")}</h3>
                                <p>{t("management.program.programManagementDescription2")}</p>
                            </div>
                            <div className="category__dashboard__body">
                                <div className="dashboard__body__field">
                                    <span>{t("management.program.programId")}</span>
                                    <input
                                        type="text"
                                        value={newProgram.id}
                                        onChange={(e) => setNewProgram({ ...newProgram, id: e.target.value })}
                                        placeholder={t("management.program.programIdPlaceholder")}
                                    />
                                </div>
                                <div className="dashboard__body__field">
                                    <span>{t("management.program.programName")}</span>
                                    <input
                                        type="text"
                                        value={newProgram.name}
                                        onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })}
                                        placeholder={t("management.program.programNamePlaceholder")}
                                    />
                                </div>
                                <div className="dashboard__body__field">
                                    <span>{t("management.program.programDescription")}</span>
                                    <input
                                        type="text"
                                        value={newProgram.description || ""}
                                        onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                                        placeholder={t("management.program.programDescriptionPlaceholder")}
                                    />
                                </div>
                            </div>
                            <div className="category__dashboard__footer">
                                <div className="dashboard__button">
                                    <button onClick={handleAddProgram}>{t("button.add")}</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>

                {/* TABLE DISPLAY */}
                <div className="category__right">
                    <div className="table">
                        <div className="table__header">
                            <div className="table__field"><span>{t("management.program.programId")}</span></div>
                            <div className="table__field"><span>{t("management.program.programName")}</span></div>
                        </div>
                        <div className="table__body">
                            {category.programs && category.programs.slice((page - 1) * amountItem, (page - 1) * amountItem + amountItem).map((item, index) => (
                                <button onClick={() => handleSelectEdit(item)} className="table__row" key={index}>
                                    <div className="table__field"><span>{item.id}</span></div>
                                    <div className="table__field"><span>{item.name}</span></div>
                                </button>
                            ))}
                        </div>
                        <div className="table__footer">
                            <div className="table__left"><span>{t('other.total')}: {category.programs?.length || 0}</span></div>
                            <div className="table__right">
                                <div className="table__paging">
                                    <button onClick={decreasePage}><FontAwesomeIcon icon={faLongArrowLeft} /></button>
                                    <button onClick={increasePage}><FontAwesomeIcon icon={faLongArrowRight} /></button>
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