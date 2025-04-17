import { useState } from "react";
import "../../../../styles/form.css";
import { useCategory } from "../../../../contexts/CategoryProvider";
import { Module } from "../../../../services/moduleAPIServices";
import './module_addition.css'
import PrerequisiteSelector from "../PrerequisiteSelector/PrerequisiteSelector";
import { CourseAPIServices } from "../../../../services/courseAPIServices";
import { useNotification } from "../../../../contexts/NotificationProvider";

function ModuleAdditionForm({ setIsAddFormOpen }: any) {
    const { category } = useCategory();
    const [isPrerequisiteModuleOpen, setIsPrerequisiteModuleOpen] = useState(false);
    const [module, setModule] = useState<Module>({
        id: "",
        name: "",
        numOfCredits: 0,
        faculty: "",
        description: "",
        prerequisiteModules: [],
    });

    const handleClose = () => {
        setIsAddFormOpen(false);
    }

    const { notify } = useNotification();

    const courseService = new CourseAPIServices();

    function handleAdd() {
        // check if all fields are filled
        if (module.id === ""
            || module.name === ""
            || module.numOfCredits === 0
            || module.faculty === ""
            || module.description === ""
        ) {
            notify({ type: "error", msg: "Please fill in all fields" });
            return;
        }

        // call addModule API
        courseService.addCourse(module)
            .then((response) => {
                console.log(response);
                notify({ type: "success", msg: "Add module successfully" });
            })
            .catch((error: any) => {
                console.error("Error adding module:", error);
                notify({ type: "error", msg: "Add module failed" });
            });
        
        // reset module state
        setModule({
            id: "",
            name: "",
            numOfCredits: 0,
            faculty: "",
            description: "",
            prerequisiteModules: [],
        });
        setIsAddFormOpen(false);
    }

    // function isValidEmail(email: string, allowedDomain: string = "module.university.edu.vn"): boolean {
    //     const escapedDomain = allowedDomain.replace(/\./g, '\\.');

    //     const emailRegex = new RegExp(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.${escapedDomain}$`);

    //     return emailRegex.test(email);
    // }

    // function isValidPhone(phone: string, country: string = "VN"): boolean {
    //     let phoneRegex;
    //     switch (country) {
    //         case "VN":
    //             phoneRegex = /^(\+84|0)(3[2-9]|5[6-9]|7[0-9]|8[1-9]|9[0-9])[0-9]{7}$/;
    //             break;
    //         default:
    //             return false;
    //     }
    //     return phoneRegex.test(phone);
    // }



    // async function handleAddStudent() {
    //     console.log(module);
    //     if (module.id === ""
    //         || module.name === ""
    //         || module.dob === ""
    //         || module.email === ""
    //         || module.phone === ""
    //         || module.gender === ""
    //         || module.faculty === ""
    //         || module.program === ""
    //         || module.permanentAddress.city === ""
    //         || module.permanentAddress.district === ""
    //         || module.permanentAddress.ward === ""
    //         || module.permanentAddress.street === ""
    //         || module.identityDocument.type === ""
    //     ) {
    //         // notify("Please fill in all fields", "error");
    //         notify({ type: "error", msg: "Please fill in all fields" });
    //         return;
    //     }

    //     // const email = module.email;
    //     // if (!isValidEmail(email)) {
    //     //     notify({ type: "error", msg: "Invalid email format" });
    //     //     return;
    //     // }

    //     // const phone = module.phone;
    //     // if (!isValidPhone(phone)) {
    //     //     notify({ type: "error", msg: "Invalid phone number format" });
    //     //     return;
    //     // }


    //     try {
    //         const response = await addStudent(module);
    //         setModule({
    //             id: "",
    //             name: "",
    //             dob: "",
    //             gender: "",
    //             program: "",
    //             academicYear: new Date().getFullYear(),
    //             faculty: "",
    //             permanentAddress: {
    //                 city: "",
    //                 district: "",
    //                 ward: "",
    //                 street: ""
    //             },
    //             temporaryAddress: {
    //                 city: "",
    //                 district: "",
    //                 ward: "",
    //                 street: ""
    //             },
    //             nationality: "",
    //             identityDocument: {
    //                 type: "",
    //                 data: null
    //             },
    //             email: "",
    //             phone: "",
    //             status: "Đang học",
    //         });

    //         console.log(response);
    //         notify({ type: "success", msg: "Add module successfully" });

    //     } catch {
    //         notify({ type: "error", msg: "Add module failed" });
    //     }
    // }


    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch("https://restcountries.com/v3.1/all");
    //             const data = await response.json();

    //             setCountries(
    //                 data
    //                     .map((country: any) => ({
    //                         name: country.name.common,
    //                         code: country.cca2
    //                     }))
    //                     .sort((a: Country, b: Country) => a.name.localeCompare(b.name)) // Sắp xếp theo tên
    //             );

    //         } catch (error) {
    //             console.error("Fetch data error", error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    return (
        <>
            {isPrerequisiteModuleOpen && <PrerequisiteSelector setPrerequisite={(modules: string[]) => setModule({ ...module, prerequisiteModules: modules })} setIsHide={setIsPrerequisiteModuleOpen} />}
            <div className="virtual-background">
                <div className="form form--module">
                    <div className="form__header">
                        <div className="header__left">
                            <h1>Module Addition</h1>
                            <p>Import a new module information</p>
                        </div>
                        {/* <div className="productimport__right">
                        <input
                            value={module.academicYear === "" ? new Date().getFullYear().toString() : module.academicYear.slice(0, 4)}
                            onChange={(e) => setModule({ ...module, academicYear: e.target.value })}
                            type="month" id="yearPicker" />

                    </div> */}
                    </div>

                    <div className="form__body">
                        <div className="form__field">
                            <span>ID</span>
                            <input
                                value={module.id}
                                onChange={(e) => setModule({ ...module, id: e.target.value })}
                                type="text"
                                placeholder="Enter module's ID" />
                        </div>

                        {/* Input Price */}
                        <div className="form__field">
                            <span>Name</span>
                            <input
                                value={module.name}
                                onChange={(e) => setModule({ ...module, name: e.target.value })}

                                type="text"
                                placeholder="Enter module's name   " />
                        </div>

                        <div className="form__field">
                            <span>Credits</span>
                            <input
                                value={module.numOfCredits}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);
                                    if (!isNaN(value)) {
                                        setModule({ ...module, numOfCredits: value });
                                    } else {
                                        setModule({ ...module, numOfCredits: 0 });
                                    }
                                }}

                                type="text"
                                placeholder="Enter module's name   " />
                        </div>

                        <div className="form__field">
                            <span>Faculty</span>
                            <select
                                value={module.faculty}
                                onChange={(e) => setModule({ ...module, faculty: e.target.value })}
                            >
                                <option value="" disabled>
                                    Choose module's faculty
                                </option>
                                {category.faculty.map((faculty, index) => (
                                    <option key={index} value={faculty.id}>
                                        {faculty.name}
                                    </option>
                                ))}
                            </select>

                        </div>

                        <div className="form__field">
                            <span>Description</span>
                            <input
                                value={module.description}
                                onChange={(e) => {
                                    setModule({ ...module, description: e.target.value });
                                }}

                                type="text"
                                placeholder="Enter module's name   " />
                        </div>

                        <div className="form__field">
                            <span>Prerequisite Modules</span>
                            <button
                                onClick={() => {
                                    setIsPrerequisiteModuleOpen(true);
                                }}

                            >{module.prerequisiteModules.length === 0 ? "Choose prerequisite modules" : module.prerequisiteModules.length + " Prerequisite Modules"}</button>
                        </div>
                        {/* <div className="form__field">
                        <span>Identity</span>
                        <button onClick={
                            () => setIsHideIdentity(false)
                        }>{module.identityDocument.type === "" ? "Choose module's identity" :
                            module.identityDocument.type + " - " + (module.identityDocument.data.ID ? module.identityDocument.data.ID : "")
                            }</button>
                    </div> */}

                    </div>

                    <div className="form__footer">
                        <div className="form__button">
                            <button onClick={handleClose}>Close</button>
                            <button>Reset</button>
                            <button onClick={handleAdd}>Add</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default ModuleAdditionForm;
