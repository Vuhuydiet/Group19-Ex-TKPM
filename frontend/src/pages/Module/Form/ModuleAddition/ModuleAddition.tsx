import { useState } from "react";
import "../../../../styles/form.css";
import { useCategory } from "../../../../contexts/CategoryProvider";
import { Module } from "../../../../services/moduleAPIServices";
import './module_addition.css'
import PrerequisiteSelector from "../PrerequisiteSelector/PrerequisiteSelector";
import { CourseAPIServices } from "../../../../services/courseAPIServices";
import { useNotification } from "../../../../contexts/NotificationProvider";
import { useTranslation } from "react-i18next";

function ModuleAdditionForm({ setIsAddFormOpen, setModules }: any) {
    const { t } = useTranslation();
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
        if (module.id === ""
            || module.name === ""
            || module.numOfCredits === 0
            || module.faculty === ""
        ) {
            notify({ type: "error", msg: "Please fill in all fields" });
            return;
        }

        const fetchData = async () => {
            try {
                const response = await courseService.addCourse(module);
                const newModule: Module = response;
                setModules((prevModules: Module[]) => [...prevModules, newModule]);
                notify({ type: "success", msg: "Add module successfully" });
            } catch (error) {
                console.error("Error adding module:", error);
                notify({ type: "error", msg: "Add module failed" });
            } finally {
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

        }

        fetchData();
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
                            <h1>
                                {t("addition.course.courseAddition")}
                            </h1>
                            <p>
                                {t("addition.course.courseAdditionDescription")}
                            </p>
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
                            <span>
                                {t('addition.course.courseId')}
                            </span>
                            <input
                                value={module.id}
                                onChange={(e) => setModule({ ...module, id: e.target.value })}
                                type="text"
                                placeholder={t('addition.course.courseIdPlaceholder')} />
                        </div>

                        {/* Input Price */}
                        <div className="form__field">
                            <span>
                                {t('addition.course.courseName')}
                            </span>
                            <input
                                value={module.name}
                                onChange={(e) => setModule({ ...module, name: e.target.value })}

                                type="text"
                                placeholder={t('addition.course.courseNamePlaceholder')} />
                        </div>

                        <div className="form__field">
                            <span>
                                {t('addition.course.courseCredits')}
                            </span>
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
                                placeholder="0" />
                        </div>

                        <div className="form__field">
                            <span>
                                {t('addition.course.courseFaculty')}
                            </span>
                            <select
                                value={module.faculty}
                                onChange={(e) => setModule({ ...module, faculty: e.target.value })}
                            >
                                <option value="" disabled>
                                    {t('addition.course.courseFacultyPlaceholder')}
                                </option>
                                {category.faculty.map((faculty, index) => (
                                    <option key={index} value={faculty.id}>
                                        {faculty.name}
                                    </option>
                                ))}
                            </select>

                        </div>

                        <div className="form__field">
                            <span>
                                {t('addition.course.courseDescription')}
                            </span>
                            <input
                                value={module.description}
                                onChange={(e) => {
                                    setModule({ ...module, description: e.target.value });
                                }}

                                type="text"
                                placeholder={t('addition.course.courseDescriptionPlaceholder')} />
                        </div>

                        <div className="form__field">
                            <span>
                                {t('addition.course.coursePrerequisite')}
                            </span>
                            <button
                                onClick={() => {
                                    setIsPrerequisiteModuleOpen(true);
                                }}

                            >{module.prerequisiteModules.length === 0 ? t('addition.course.coursePrerequisitePlaceholder') : module.prerequisiteModules.length + " " + t('addition.course.coursePrerequisite')}</button>
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
                            <button onClick={handleClose}>
                                {t("button.cancel")}
                            </button>
                            <button>
                                {t("button.reset")}
                            </button>
                            <button onClick={handleAdd}>
                                {t("button.add")}
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default ModuleAdditionForm;
