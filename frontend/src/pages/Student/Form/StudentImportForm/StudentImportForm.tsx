import { useEffect, useState } from "react";
import "./student_import_form.css";
import { Student, StudentAPIServices } from "../../../../services/studentAPIServices";
import { useNotification } from "../../../../contexts/NotificationProvider";
// import { useConfirmPrompt } from "../components/ConfirmPromptContext";
import StudentAddress from "../StudentAddress/StudentAddress";
import "../../../../styles/form.css";
import StudentIdentity from "../StudentIdentity/StudentIdentity";
import { useCategory } from "../../../../contexts/CategoryProvider";
import { useTranslation } from "react-i18next";

interface identityDocument {
    type: "OldIdentityCard" | "NewIdentityCard" | "Passport" | "";
    data: any;
}

type Country = {
    name: string;
    code: string;
}

interface StudentImportFormProps {
    setIsAddFormOpen: (isOpen: boolean) => void;
    setStudents: (students: Student[]) => void;
}

function StudentImportForm({ setIsAddFormOpen, setStudents }: StudentImportFormProps) {
    const { t } = useTranslation();
    // const { setIsLoading } = useLoading();
    // const { setIsConfirmPrompt, setConfirmPromptData } = useConfirmPrompt();
    const { notify } = useNotification();
    const { category } = useCategory();

    const [isHidePermanentAddress, setIsHidePermanentAddress] = useState(true);
    const [isHideTemporaryAddress, setIsHideTemporaryAddress] = useState(true);
    const [isHideIdentity, setIsHideIdentity] = useState(true);
    const [student, setStudent] = useState<Student>({
        id: "",
        name: "",
        dob: "",
        gender: "",
        program: "",
        academicYear: new Date().getFullYear(),
        faculty: "",
        permanentAddress: {
            city: "",
            district: "",
            ward: "",
            street: ""
        },
        temporaryAddress: {
            city: "",
            district: "",
            ward: "",
            street: ""
        },
        nationality: "",
        identityDocument: {
            type: "",
            data: null
        },
        email: "",
        phone: "",
        status: "DH",
    });

    // function isValidEmail(email: string, allowedDomain: string = "student.university.edu.vn"): boolean {
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



    async function handleAddStudent() {
        if (student.id === ""
            || student.name === ""
            || student.dob === ""
            || student.email === ""
            || student.phone === ""
            || student.gender === ""
            || student.faculty === ""
            || student.program === ""
            || student.permanentAddress.city === ""
            || student.permanentAddress.district === ""
            || student.permanentAddress.ward === ""
            || student.permanentAddress.street === ""
            || student.identityDocument.type === ""
        ) {
            // notify("Please fill in all fields", "error");
            notify({ type: "error", msg: "Please fill in all fields" });
            return;
        }

        try {
            const studentAPIServices = new StudentAPIServices();
            const response = await studentAPIServices.addStudent(student);
            if (!response) {
                notify({ type: "error", msg: "Add student failed" });
                return;
            }
            const response1 = await studentAPIServices.getStudents();
            if (!response1) {
                notify({ type: "error", msg: "Get students failed" });
                return;
            }

            setStudents(response1);
            setIsAddFormOpen(false);

            // setStudent({
            //     id: "",
            //     name: "",
            //     dob: "",
            //     gender: "",
            //     program: "",
            //     academicYear: new Date().getFullYear(),
            //     faculty: "",
            //     permanentAddress: {
            //         city: "",
            //         district: "",
            //         ward: "",
            //         street: ""
            //     },
            //     temporaryAddress: {
            //         city: "",
            //         district: "",
            //         ward: "",
            //         street: ""
            //     },
            //     nationality: "",
            //     identityDocument: {
            //         type: "",
            //         data: null
            //     },
            //     email: "",
            //     phone: "",
            //     status: "Đang học",
            // });

            // console.log(response);

            notify({ type: "success", msg: "Add student successfully" });

        } catch {
            notify({ type: "error", msg: "Add student failed" });
        }
    }

    function handleCancel() {
        setIsAddFormOpen(false);
    }

    function handleReset() {
        setStudent({
            id: "",
            name: "",
            dob: "",
            gender: "",
            program: "",
            academicYear: new Date().getFullYear(),
            faculty: "",
            permanentAddress: {
                city: "",
                district: "",
                ward: "",
                street: ""
            },
            temporaryAddress: {
                city: "",
                district: "",
                ward: "",
                street: ""
            },
            nationality: "",
            identityDocument: {
                type: "",
                data: null
            },
            email: "",
            phone: "",
            status: "Đang học",
        });

    }


    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/mock/countries.json");
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                    return;
                }

                const data = await res.json();

                if (!Array.isArray(data)) {
                    throw new Error("Response is not an array");
                }

                const countryList = data.map((country) => ({
                    name: country.name,
                    code: country.code,
                }));

                setCountries(countryList);
            } catch (error) {
                console.error("Fetch data error", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {!isHidePermanentAddress && <StudentAddress title="Permanent Address" description="Enter student's permanent address" setAddress={(address: any) => setStudent({ ...student, permanentAddress: address })} setIsHide={setIsHidePermanentAddress} />}
            {!isHideTemporaryAddress && <StudentAddress title="Temporary Address" description="Enter student's temporary address" setAddress={(address: any) => setStudent({ ...student, temporaryAddress: address })} setIsHide={setIsHideTemporaryAddress} />}
            {!isHideIdentity && <StudentIdentity setStudentIdentity={(identityDocument: identityDocument) => setStudent({ ...student, identityDocument: identityDocument })} setIsHide={setIsHideIdentity} />}
            <div className="virtual-background">

                <div className="form form--student">
                    <div className="form__header">
                        <div className="header__left">
                            <h1>
                                {t("addition.student.studentAddition")}
                            </h1>
                            <p>
                                {t("addition.student.studentAdditionDescription")}
                            </p>
                        </div>
                        {/* <div className="productimport__right">
                        <input
                            value={student.academicYear === "" ? new Date().getFullYear().toString() : student.academicYear.slice(0, 4)}
                            onChange={(e) => setStudent({ ...student, academicYear: e.target.value })}
                            type="month" id="yearPicker" />

                    </div> */}
                    </div>

                    <div className="form__body">
                        <div className="form__field">
                            <span>
                                {t("addition.student.studentId")}
                            </span>
                            <input
                                value={student.id}
                                onChange={(e) => setStudent({ ...student, id: e.target.value })}
                                type="text"
                                placeholder={t("addition.student.studentIdPlaceholder")} />
                        </div>

                        {/* Input Price */}
                        <div className="form__field">
                            <span>
                                {t("addition.student.studentName")}
                            </span>
                            <input
                                value={student.name}
                                onChange={(e) => setStudent({ ...student, name: e.target.value })}

                                type="text"
                                placeholder={t("addition.student.studentNamePlaceholder")} />
                        </div>

                        <div className="form__field">
                            <span>
                                {t("addition.student.studentDob")}
                            </span>
                            <input
                                value={student.dob}
                                onChange={(e) => setStudent({ ...student, dob: e.target.value })}
                                type="date"
                                placeholder={t("addition.student.studentDobPlaceholder")} />
                        </div>

                        <div className="form__field">
                            <span>
                                {t("addition.student.studentGender")}
                            </span>
                            <select
                                value={student.gender}
                                onChange={(e) => setStudent({ ...student, gender: e.target.value })}
                            >
                                <option value="" disabled>
                                    {t("addition.student.studentGenderPlaceholder")}
                                </option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>

                            </select>

                        </div>

                        <div className="form__field">
                            <span>
                                {t("addition.student.studentFaculty")}
                            </span>
                            <select
                                value={student.faculty}
                                onChange={(e) => setStudent({ ...student, faculty: e.target.value })}
                            >
                                <option value="" disabled>
                                    {t("addition.student.studentFacultyPlaceholder")}
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
                                {t("addition.student.studentProgram")}
                            </span>
                            <select
                                value={student.program}
                                onChange={(e) => setStudent({ ...student, program: e.target.value })}
                            >
                                <option value="" disabled>
                                    {t("addition.student.studentProgramPlaceholder")}
                                </option>
                                {category.programs.map((program, index) => (
                                    <option key={index} value={program.id}>
                                        {program.name}
                                    </option>
                                ))}
                            </select>

                        </div>

                        <div className="form__field">
                            <span>
                                {t("addition.student.studentPermanentAddress")}
                            </span>
                            <button onClick={
                                () => setIsHidePermanentAddress(false)
                            }>{student.permanentAddress.city === "" ? t("addition.student.studentPermanentAddressPlaceholder") :
                                student.permanentAddress.street + ", " + student.permanentAddress.ward + ", " + student.permanentAddress.district + ", " + student.permanentAddress.city
                                }</button>
                        </div>

                        <div className="form__field">
                            <span>
                                {t("addition.student.studentEmail")}
                            </span>
                            <input
                                value={student.email}
                                type="text"
                                onChange={(e) => {
                                    setStudent({ ...student, email: e.target.value });
                                }
                                }
                                placeholder={t("addition.student.studentEmailPlaceholder")} />
                        </div>

                        <div className="form__field">
                            <span>
                                {t("addition.student.studentPhone")}
                            </span>
                            <input
                                value={student.phone}
                                type="text"
                                onChange={(e) => {
                                    setStudent({ ...student, phone: e.target.value });
                                }
                                }
                                placeholder={t("addition.student.studentPhonePlaceholder")} />
                        </div>

                        <div className="form__field">
                            <span>
                                {t("addition.student.studentTemporaryAddress")}
                            </span>
                            <button onClick={
                                () => setIsHideTemporaryAddress(false)
                            }>
                                {student.temporaryAddress.city === "" ? t("addition.student.studentTemporaryAddressPlaceholder") :
                                    student.temporaryAddress.street + ", " + student.temporaryAddress.ward + ", " + student.temporaryAddress.district + ", " + student.temporaryAddress.city
                                }
                            </button>
                        </div>

                        <div className="form__field">
                            <span>
                                {t("addition.student.studentNationality")}
                            </span>
                            <select
                                value={student.nationality}
                                onChange={(e) => setStudent({ ...student, nationality: e.target.value })}
                            >
                                <option value="" disabled>
                                    {t("addition.student.studentNationalityPlaceholder")}
                                </option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country.code}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* <div className="form__field">
                        <span>Identity</span>
                        <button onClick={
                            () => setIsHideIdentity(false)
                        }>{student.identityDocument.type === "" ? "Choose student's identity" :
                            student.identityDocument.type + " - " + (student.identityDocument.data.ID ? student.identityDocument.data.ID : "")
                            }</button>
                    </div> */}
                        <div className="form__field">
                            <span>
                                {t("addition.student.studentIdentityDocument")}
                            </span>
                            <button onClick={() => setIsHideIdentity(false)}>
                                {student.identityDocument.type === "" ? t("addition.student.studentIdentityDocumentPlaceholder") :
                                    `${student.identityDocument.type} - ${student.identityDocument.data
                                        ? ('id' in student.identityDocument.data
                                            ? student.identityDocument.data.id
                                            : student.identityDocument.data.passportNumber)
                                        : ""
                                    }`
                                }
                            </button>
                        </div>

                    </div>

                    <div className="form__footer">
                        <div className="form__button">
                            <button onClick={handleCancel}>
                                {t("button.cancel")}
                            </button>
                            <button onClick={handleReset}>
                                {t("button.reset")}
                            </button>
                            <button onClick={handleAddStudent}>
                                {t("button.add")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default StudentImportForm;
