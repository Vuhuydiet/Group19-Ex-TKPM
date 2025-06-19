// import { useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faX, faCheck } from '@fortawesome/free-solid-svg-icons'
// import "./student_identity.css";
// import "../../../../styles/form.css";
// import { useTranslation } from "react-i18next";
// import { OldIdentityCard, NewIdentityCard, Passport } from "../../../../services/classes/IdentityDocument";
// import IdentityDocument  from "../../../../services/classes/IdentityDocument";




// interface IdentityProps {
//     setStudentIdentity: any;
//     setIsHide: any;
// }

//     function StudentIdentity({ setStudentIdentity, setIsHide }: IdentityProps) {
//         const { t } = useTranslation();
//         // const [identity, setIdentity] = useState<any>({
//         //     id: "",
//         //     issuedDate: "",
//         //     issuedPlace: "",
//         //     expiredDate: ""
//         // });

//         const [identity, setIdentity] = useState<IdentityDocument>(
//             new OldIdentityCard("", new Date(), "", new Date()) // mặc định
//         );
        
        
//         const [identityType, setIdentityType] = useState<"old" | "new" | "passport">("old");

//         // const handleIdentityChange = (type: "old" | "new" | "passport") => {
//         //     setIdentityType(type);
//         //     if (type === "old") {
//         //         setIdentity({
//         //             id: "",
//         //             issuedDate: "",
//         //             issuedPlace: "",
//         //             expiredDate: ""
//         //         });
//         //     } else if (type === "new") {
//         //         setIdentity({
//         //             id: "",
//         //             issuedDate: "",
//         //             issuedPlace: "",
//         //             expiredDate: "",
//         //             hasChip: false
//         //         });
//         //     } else {
//         //         setIdentity({
//         //             id: "",
//         //             issuedDate: "",
//         //             issuedPlace: "",
//         //             expiredDate: "",
//         //             issuedCountry: "",
//         //             notes: ""
//         //         });
//         //     }
//         // };

//         const handleIdentityChange = (type: "old" | "new" | "passport") => {
//             setIdentityType(type);
        
//             const today = new Date();
        
//             if (type === "old") {
//                 setIdentity(new OldIdentityCard("", today, "", today));
//             } else if (type === "new") {
//                 setIdentity(new NewIdentityCard("", today, "", today, false));
//             } else if (type === "passport") {
//                 setIdentity(new Passport("", "", today, today, "", "", ""));
//             }
//         };
        
//         // function mapType(type: "old" | "new" | "passport") {
//         //     if (type === "old") {
//         //         return "Old Identity Card";
//         //     }
//         //     if (type === "new") {
//         //         return "New Identity Card";
//         //     }
//         //     return "Passport";
//         // }

//         // function handleSave() {
//         //     const type = mapType(identityType);
//         //     setStudentIdentity({
//         //         type: type,
//         //         data: identity
//         //     });
//         //     setIsHide(true);
//         // }

//         function handleSave() {
//             setStudentIdentity(identity); // nếu phía ngoài dùng class trực tiếp
//             setIsHide(true);
//         }
        

//         function handleCancel() {
//             setIsHide(true);
//         }

//         return (
//             <>
//                 <div className="virtual-background virtual-background-frontside">

//                     <div className="form form--identity">
//                         <div className="form__header">
//                             <div className="header__left">
//                                 <h1>
//                                     {t("identity.identityDocument")}
//                                 </h1>
//                                 <p>
//                                     {t("identity.identityDocumentDescription")}
//                                 </p>
//                             </div>

//                             <div className="header__right">
//                                 <div className="form__radio">
//                                     <input type="radio" id="old" name="identity" value="old"
//                                         checked={identityType === "old"} onChange={() => handleIdentityChange("old")}
//                                     />
//                                     <label htmlFor="old">
//                                         {t("identity.oldIdentityDocument")}
//                                     </label>

//                                     <input type="radio" id="new" name="identity" value="new"
//                                         checked={identityType === "new"} onChange={() => handleIdentityChange("new")}
//                                     />
//                                     <label htmlFor="new">
//                                         {t("identity.newIdentityDocument")}
//                                     </label>

//                                     <input type="radio" id="passport" name="identity" value="passport"
//                                         checked={identityType === "passport"} onChange={() => handleIdentityChange("passport")}
//                                     />
//                                     <label htmlFor="passport">
//                                         {t("identity.passport")}
//                                     </label>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="form__body">

//                             <div className="form__field">
//                                 <span>
//                                     {t("identity.id")}
//                                 </span>
//                                 <input
//                                     type="text"
//                                     value={identity.getId()}
//                                     onChange={(e) =>{
//                                         if (identity instanceof OldIdentityCard) {
//                                         identity.setIssuedDate(new Date(e.target.value));
//                                         setIdentity(new OldIdentityCard(
//                                             identity.id,
//                                             new Date(e.target.value),
//                                             identity.getIssuedPlace(),
//                                             identity.getExpiredDate()
//                                         ));
//                                         } }}
//                                     placeholder={t("identity.idPlaceholder")}
//                                 />
//                             </div>

//                             <div className="form__field">
//                                 <span>
//                                     {t("identity.issuedDate")}
//                                 </span>
//                                 <input
//                                     type="date"
//                                     value={
//                                     identity instanceof OldIdentityCard ||
//                                     identity instanceof NewIdentityCard ||
//                                     identity instanceof Passport
//                                         ? identity.getIssuedDateAsString()
//                                         : ""
//                                     }
//                                     onChange={(e) => {
//                                     const newDate = new Date(e.target.value);
//                                     if (
//                                         identity instanceof OldIdentityCard ||
//                                         identity instanceof NewIdentityCard ||
//                                         identity instanceof Passport
//                                     ) {
//                                         identity.setIssuedDate(newDate);
//                                         setIdentity(identity);
//                                     }
//                                     }}
//                                     placeholder={t("identity.issuedDatePlaceholder")}
//                                 />
//                             </div>

//                             <div className="form__field">
//                                 <span>
//                                     {t("identity.issuedPlace")}
//                                 </span>
//                                 <input
//                                     type="text"
//                                     value={
//                                         identity instanceof OldIdentityCard ||
//                                         identity instanceof NewIdentityCard ||
//                                         identity instanceof Passport
//                                         ? identity.getIssuedPlace()
//                                         : ""
//                                     }
//                                     onChange={(e) => {
//                                         if (
//                                         identity instanceof OldIdentityCard ||
//                                         identity instanceof NewIdentityCard ||
//                                         identity instanceof Passport
//                                         ) {
//                                         identity.setIssuedPlace(e.target.value);
//                                         setIdentity(identity);
//                                         }
//                                     }}
//                                     placeholder={t("identity.issuedPlacePlaceholder")}
//                                 />
//                             </div>

//                             <div className="form__field">
//                                 <span>
//                                     {t("identity.expiredDate")}
//                                 </span>
//                                 <input
//                                     type="date"
//                                     value={
//                                         identity instanceof OldIdentityCard ||
//                                         identity instanceof NewIdentityCard ||
//                                         identity instanceof Passport
//                                         ? identity.getExpiredDate().toISOString().slice(0, 10)
//                                         : ""
//                                     }
//                                     onChange={(e) => {
//                                         if (
//                                         identity instanceof OldIdentityCard ||
//                                         identity instanceof NewIdentityCard ||
//                                         identity instanceof Passport
//                                         ) {
//                                         identity.setExpiredDate(new Date(e.target.value));
//                                         setIdentity(identity);
//                                         }
//                                     }}
//                                     placeholder={t("identity.expiredDatePlaceholder")}
//                                 />

//                             </div>

//                             {identityType === "new" && "hasChip" in identity && (<div className="form__field">
//                                 <span>
//                                     {t("identity.hasChip")}
//                                 </span>
//                                 <input
//                                     id="hasChip"
//                                     type="checkbox"
//                                     checked={
//                                         identity instanceof NewIdentityCard ? identity.getHasChip() : false
//                                     }
//                                     onChange={(e) => {
//                                         if (identity instanceof NewIdentityCard) {
//                                         identity.setHasChip(e.target.checked);
//                                         setIdentity(identity);
//                                         }
//                                     }}
//                                 />

//                                 <label htmlFor="hasChip">
//                                     <div className="labeline">
//                                         <FontAwesomeIcon icon={identity.hasChip ? faCheck : faX} />
//                                     </div>
//                                 </label>
//                             </div>)}

//                             {identityType === "passport" && "issuedCountry" in identity && (<div className="form__field">
//                                 <span>
//                                     {t("identity.issuedCountry")}
//                                 </span>
//                                 <input
//                                     type="text"
//                                     value={identity instanceof Passport ? identity.getIssuedCountry() : ""}
//                                     onChange={(e) => {
//                                         if (identity instanceof Passport) {
//                                         identity.setIssuedCountry(e.target.value);
//                                         setIdentity(identity);
//                                         }
//                                     }}
//                                     placeholder={t("identity.issuedCountryPlaceholder")}
//                                 />
//                             </div>)}

//                             {identityType === "passport" && "notes" in identity && (<div className="form__field">
//                                 <span>
//                                     {t("identity.note")}
//                                 </span>
//                                 <textarea
//                                     value={identity instanceof Passport ? identity.getNote() ?? "" : ""}
//                                     onChange={(e) => {
//                                         if (identity instanceof Passport) {
//                                         identity.setNote(e.target.value);
//                                         setIdentity(identity);
//                                         }
//                                     }}
//                                     placeholder={t("identity.notePlaceholder")}
//                                 />
//                             </div>)}

//                         </div>

//                         <div className="form__footer">
//                             <div className="form__button">
//                                 <button onClick={handleCancel}>
//                                     {t("button.cancel")}
//                                 </button>
//                                 <button onClick={handleSave}>
//                                     {t("button.save")}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//             </>
//         );
//     }


//     export default StudentIdentity;

// StudentIdentity.tsx

// import { useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faX, faCheck } from '@fortawesome/free-solid-svg-icons'
// import "./student_identity.css";
// import "../../../../styles/form.css";
// import { useTranslation } from "react-i18next";
// import IdentityDocument, { OldIdentityCard, NewIdentityCard, Passport } from "../../../../services/classes/IdentityDocument";

// interface IdentityProps {
//     setStudentIdentity: (identity: IdentityDocument) => void; // Thay đổi kiểu dữ liệu prop
//     setIsHide: (isHide: boolean) => void;
// }

// function StudentIdentity({ setStudentIdentity, setIsHide }: IdentityProps) {
//     const { t } = useTranslation();
//     const [identityType, setIdentityType] = useState<"old" | "new" | "passport">("old");
//     const [identity, setIdentity] = useState<IdentityDocument>(
//         new OldIdentityCard("", new Date(), "", new Date())
//     );

//     const handleIdentityChange = (type: "old" | "new" | "passport") => {
//         setIdentityType(type);
//         const today = new Date();
//         if (type === "old") {
//             setIdentity(new OldIdentityCard("", today, "", today));
//         } else if (type === "new") {
//             setIdentity(new NewIdentityCard("", today, "", today, false));
//         } else if (type === "passport") {
//             setIdentity(new Passport("", "", today, today, "", "", ""));
//         }
//     };

//     function handleSave() {
//         // Chỉ cần truyền thẳng instance của class
//         setStudentIdentity(identity);
//         setIsHide(true);
//     }

//     function handleCancel() {
//         setIsHide(true);
//     }

//     // Hàm helper để cập nhật state một cách an toàn
//     const updateIdentity = (updateFn: (clone: IdentityDocument) => void) => {
//         const newIdentity = identity.clone(); // Sử dụng clone
//         updateFn(newIdentity);
//         setIdentity(newIdentity);
//     };

//     return (
//         <>
//             <div className="virtual-background virtual-background-frontside">
//                 <div className="form form--identity">
//                     <div className="form__header">
//                         {/* Header content không đổi */}
//                         <div className="header__left">
//                             <h1>{t("identity.identityDocument")}</h1>
//                             <p>{t("identity.identityDocumentDescription")}</p>
//                         </div>
//                         <div className="header__right">
//                             <div className="form__radio">
//                                 <input type="radio" id="old" name="identity" value="old"
//                                     checked={identityType === "old"} onChange={() => handleIdentityChange("old")}
//                                 />
//                                 <label htmlFor="old">{t("identity.oldIdentityDocument")}</label>

//                                 <input type="radio" id="new" name="identity" value="new"
//                                     checked={identityType === "new"} onChange={() => handleIdentityChange("new")}
//                                 />
//                                 <label htmlFor="new">{t("identity.newIdentityDocument")}</label>

//                                 <input type="radio" id="passport" name="identity" value="passport"
//                                     checked={identityType === "passport"} onChange={() => handleIdentityChange("passport")}
//                                 />
//                                 <label htmlFor="passport">{t("identity.passport")}</label>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="form__body">
//                         {/* Sửa lại các field input */}
//                         <div className="form__field">
//                             <span>{identityType === 'passport' ? t("identity.passportNumber") : t("identity.id")}</span>
//                             <input
//                                 type="text"
//                                 value={identity.id}
//                                 onChange={(e) => updateIdentity(clone => { clone.id = e.target.value; })}
//                                 placeholder={identityType === 'passport' ? t("identity.passportNumberPlaceholder") : t("identity.idPlaceholder")}
//                             />
//                         </div>

//                         <div className="form__field">
//                             <span>{t("identity.issuedDate")}</span>
//                             <input
//                                 type="date"
//                                 value={(identity as OldIdentityCard).getIssuedDateAsString()}
//                                 onChange={(e) => updateIdentity(clone => {
//                                     (clone as OldIdentityCard).setIssuedDate(new Date(e.target.value));
//                                 })}
//                                 placeholder={t("identity.issuedDatePlaceholder")}
//                             />
//                         </div>

//                         <div className="form__field">
//                             <span>{t("identity.issuedPlace")}</span>
//                             <input
//                                 type="text"
//                                 value={(identity as OldIdentityCard).getIssuedPlace()}
//                                 onChange={(e) => updateIdentity(clone => {
//                                     (clone as OldIdentityCard).setIssuedPlace(e.target.value);
//                                 })}
//                                 placeholder={t("identity.issuedPlacePlaceholder")}
//                             />
//                         </div>

//                         <div className="form__field">
//                             <span>{t("identity.expiredDate")}</span>
//                             <input
//                                 type="date"
//                                 value={(identity as OldIdentityCard).getExpiredDateAsString()}
//                                 onChange={(e) => updateIdentity(clone => {
//                                     (clone as OldIdentityCard).setExpiredDate(new Date(e.target.value));
//                                 })}
//                                 placeholder={t("identity.expiredDatePlaceholder")}
//                             />
//                         </div>

//                         {identity instanceof NewIdentityCard && (
//                             <div className="form__field">
//                                 <span>{t("identity.hasChip")}</span>
//                                 <input
//                                     id="hasChip"
//                                     type="checkbox"
//                                     checked={identity.getHasChip()}
//                                     onChange={(e) => updateIdentity(clone => {
//                                         (clone as NewIdentityCard).setHasChip(e.target.checked);
//                                     })}
//                                 />
//                                 <label htmlFor="hasChip">
//                                     <div className="labeline">
//                                         <FontAwesomeIcon icon={identity.getHasChip() ? faCheck : faX} />
//                                     </div>
//                                 </label>
//                             </div>
//                         )}

//                         {identity instanceof Passport && (
//                             <>
//                                 <div className="form__field">
//                                     <span>{t("identity.issuedCountry")}</span>
//                                     <input
//                                         type="text"
//                                         value={identity.getIssuedCountry()}
//                                         onChange={(e) => updateIdentity(clone => {
//                                             (clone as Passport).setIssuedCountry(e.target.value);
//                                         })}
//                                         placeholder={t("identity.issuedCountryPlaceholder")}
//                                     />
//                                 </div>
//                                 <div className="form__field">
//                                     <span>{t("identity.note")}</span>
//                                     <textarea
//                                         value={identity.getNote() ?? ""}
//                                         onChange={(e) => updateIdentity(clone => {
//                                             (clone as Passport).setNote(e.target.value);
//                                         })}
//                                         placeholder={t("identity.notePlaceholder")}
//                                     />
//                                 </div>
//                             </>
//                         )}
//                     </div>

//                     <div className="form__footer">
//                         {/* Footer không đổi */}
//                         <div className="form__button">
//                             <button onClick={handleCancel}>{t("button.cancel")}</button>
//                             <button onClick={handleSave}>{t("button.save")}</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default StudentIdentity;


// StudentIdentity.tsx

import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faCheck } from '@fortawesome/free-solid-svg-icons';
import "./student_identity.css";
import "../../../../styles/form.css";
import { useTranslation } from "react-i18next";

// Sửa lại câu lệnh import này cho chính xác và duy nhất
import IdentityDocument, { OldIdentityCard, NewIdentityCard, Passport } from "../../../../services/classes/IdentityDocument";

interface IdentityProps {
    setStudentIdentity: (identity: IdentityDocument) => void;
    setIsHide: (isHide: boolean) => void;
}

function StudentIdentity({ setStudentIdentity, setIsHide }: IdentityProps) {
    const { t } = useTranslation();
    const [identityType, setIdentityType] = useState<"old" | "new" | "passport">("old");
    
    // Khởi tạo state ban đầu với OldIdentityCard
    const [identity, setIdentity] = useState<IdentityDocument>(
        new OldIdentityCard("", new Date(), "", new Date())
    );

    const handleIdentityChange = (type: "old" | "new" | "passport") => {
        setIdentityType(type);
        const today = new Date();
        if (type === "old") {
            setIdentity(new OldIdentityCard("", today, "", today));
        } else if (type === "new") {
            setIdentity(new NewIdentityCard("", today, "", today, false));
        } else if (type === "passport") {
            // Dòng này sẽ tạo đúng instance của Passport
            setIdentity(new Passport("", "", today, today, "", "", ""));
        }
    };

    function handleSave() {
        setStudentIdentity(identity);
        setIsHide(true);
    }

    function handleCancel() {
        setIsHide(true);
    }

    const updateIdentity = (updateFn: (clone: IdentityDocument) => void) => {
        const newIdentity = identity.clone();
        updateFn(newIdentity);
        setIdentity(newIdentity);
    };

    return (
        <>
            <div className="virtual-background virtual-background-frontside">
                <div className="form form--identity">
                    <div className="form__header">
                        <div className="header__left">
                            <h1>{t("identity.identityDocument")}</h1>
                            <p>{t("identity.identityDocumentDescription")}</p>
                        </div>
                        <div className="header__right">
                            <div className="form__radio">
                                <input type="radio" id="old" name="identity" value="old"
                                    checked={identityType === "old"} onChange={() => handleIdentityChange("old")}
                                />
                                <label htmlFor="old">{t("identity.oldIdentityDocument")}</label>

                                <input type="radio" id="new" name="identity" value="new"
                                    checked={identityType === "new"} onChange={() => handleIdentityChange("new")}
                                />
                                <label htmlFor="new">{t("identity.newIdentityDocument")}</label>

                                <input type="radio" id="passport" name="identity" value="passport"
                                    checked={identityType === "passport"} onChange={() => handleIdentityChange("passport")}
                                />
                                <label htmlFor="passport">{t("identity.passport")}</label>
                            </div>
                        </div>
                    </div>

                    <div className="form__body">
                        <div className="form__field">
                            <span>{identityType === 'passport' ? t("identity.passportNumber") : t("identity.id")}</span>
                            <input
                                type="text"
                                value={identity.id}
                                onChange={(e) => updateIdentity(clone => { clone.id = e.target.value; })}
                                placeholder={identityType === 'passport' ? t("identity.passportNumberPlaceholder") : t("identity.idPlaceholder")}
                            />
                        </div>

                        <div className="form__field">
                            <span>{t("identity.issuedDate")}</span>
                            <input
                                type="date"
                                value={(identity as OldIdentityCard).getIssuedDateAsString()}
                                onChange={(e) => updateIdentity(clone => {
                                    (clone as OldIdentityCard).setIssuedDate(new Date(e.target.value));
                                })}
                                placeholder={t("identity.issuedDatePlaceholder")}
                            />
                        </div>

                        <div className="form__field">
                            <span>{t("identity.issuedPlace")}</span>
                            <input
                                type="text"
                                value={(identity as OldIdentityCard).getIssuedPlace()}
                                onChange={(e) => updateIdentity(clone => {
                                    (clone as OldIdentityCard).setIssuedPlace(e.target.value);
                                })}
                                placeholder={t("identity.issuedPlacePlaceholder")}
                            />
                        </div>

                        <div className="form__field">
                            <span>{t("identity.expiredDate")}</span>
                            <input
                                type="date"
                                value={(identity as any).getExpiredDateAsString ? (identity as any).getExpiredDateAsString() : ""}
                                onChange={(e) => updateIdentity(clone => {
                                     (clone as OldIdentityCard).setExpiredDate(new Date(e.target.value));
                                })}
                                placeholder={t("identity.expiredDatePlaceholder")}
                            />
                        </div>

                        {/* Câu lệnh instanceof này sẽ hoạt động đúng */}
                        {identity instanceof NewIdentityCard && (
                            <div className="form__field">
                                <span>{t("identity.hasChip")}</span>
                                <input
                                    id="hasChip"
                                    type="checkbox"
                                    checked={identity.getHasChip()}
                                    onChange={(e) => updateIdentity(clone => {
                                        (clone as NewIdentityCard).setHasChip(e.target.checked);
                                    })}
                                />
                                <label htmlFor="hasChip">
                                    <div className="labeline">
                                        <FontAwesomeIcon icon={identity.getHasChip() ? faCheck : faX} />
                                    </div>
                                </label>
                            </div>
                        )}
                        
                        {/* Và câu lệnh instanceof này cũng sẽ hoạt động đúng */}
                        {identity instanceof Passport && (
                            <>
                                <div className="form__field">
                                    <span>{t("identity.issuedCountry")}</span>
                                    <input
                                        type="text"
                                        value={identity.getIssuedCountry()}
                                        onChange={(e) => updateIdentity(clone => {
                                            (clone as Passport).setIssuedCountry(e.target.value);
                                        })}
                                        placeholder={t("identity.issuedCountryPlaceholder")}
                                    />
                                </div>
                                <div className="form__field">
                                    <span>{t("identity.note")}</span>
                                    <textarea
                                        value={identity.getNote() ?? ""}
                                        onChange={(e) => updateIdentity(clone => {
                                            (clone as Passport).setNote(e.target.value);
                                        })}
                                        placeholder={t("identity.notePlaceholder")}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="form__footer">
                        <div className="form__button">
                            <button onClick={handleCancel}>{t("button.cancel")}</button>
                            <button onClick={handleSave}>{t("button.save")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StudentIdentity;