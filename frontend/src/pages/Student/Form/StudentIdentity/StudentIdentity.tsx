import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faCheck } from '@fortawesome/free-solid-svg-icons'
import "./student_identity.css";
import "../../../../styles/form.css";
import { useTranslation } from "react-i18next";

interface Identity {
    id: string;
    issuedDate: string;
    issuedPlace: string;
    expiredDate: string;
}

interface OldIdentityCard extends Identity { }

interface NewIdentityCard extends Identity {
    hasChip: boolean;
}

interface Passport extends Identity {
    issuedCountry: string;
    notes: string;
}

interface IdentityProps {
    setStudentIdentity: any;
    setIsHide: any;
}

function StudentIdentity({ setStudentIdentity, setIsHide }: IdentityProps) {
    const { t } = useTranslation();
    const [identity, setIdentity] = useState<OldIdentityCard | NewIdentityCard | Passport>({
        id: "",
        issuedDate: "",
        issuedPlace: "",
        expiredDate: ""
    });

    const [identityType, setIdentityType] = useState<"old" | "new" | "passport">("old");

    const handleIdentityChange = (type: "old" | "new" | "passport") => {
        setIdentityType(type);
        if (type === "old") {
            setIdentity({
                id: "",
                issuedDate: "",
                issuedPlace: "",
                expiredDate: ""
            });
        } else if (type === "new") {
            setIdentity({
                id: "",
                issuedDate: "",
                issuedPlace: "",
                expiredDate: "",
                hasChip: false
            } as NewIdentityCard);
        } else {
            setIdentity({
                id: "",
                issuedDate: "",
                issuedPlace: "",
                expiredDate: "",
                issuedCountry: "",
                notes: ""
            } as Passport);
        }
    };

    function mapType(type: "old" | "new" | "passport") {
        if (type === "old") {
            return "Old Identity Card";
        }
        if (type === "new") {
            return "New Identity Card";
        }
        return "Passport";
    }

    function handleSave() {
        const type = mapType(identityType);
        setStudentIdentity({
            type: type,
            data: identity
        });
        setIsHide(true);
    }

    function handleCancel() {
        setIsHide(true);
    }

    return (
        <>
            <div className="virtual-background virtual-background-frontside">

                <div className="form form--identity">
                    <div className="form__header">
                        <div className="header__left">
                            <h1>
                                {t("identity.identityDocument")}
                            </h1>
                            <p>
                                {t("identity.identityDocumentDescription")}
                            </p>
                        </div>

                        <div className="header__right">
                            <div className="form__radio">
                                <input type="radio" id="old" name="identity" value="old"
                                    checked={identityType === "old"} onChange={() => handleIdentityChange("old")}
                                />
                                <label htmlFor="old">
                                    {t("identity.oldIdentityDocument")}
                                </label>

                                <input type="radio" id="new" name="identity" value="new"
                                    checked={identityType === "new"} onChange={() => handleIdentityChange("new")}
                                />
                                <label htmlFor="new">
                                    {t("identity.newIdentityDocument")}
                                </label>

                                <input type="radio" id="passport" name="identity" value="passport"
                                    checked={identityType === "passport"} onChange={() => handleIdentityChange("passport")}
                                />
                                <label htmlFor="passport">
                                    {t("identity.passport")}
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="form__body">

                        <div className="form__field">
                            <span>
                                {t("identity.id")}
                            </span>
                            <input
                                type="text"
                                value={identity.id}
                                onChange={(e) => setIdentity({ ...identity, id: e.target.value })}
                                placeholder={t("identity.idPlaceholder")}
                            />
                        </div>

                        <div className="form__field">
                            <span>
                                {t("identity.issuedDate")}
                            </span>
                            <input
                                type="date"
                                value={identity.issuedDate}
                                onChange={(e) => setIdentity({ ...identity, issuedDate: e.target.value })}
                                placeholder={t("identity.issuedDatePlaceholder")}
                            />
                        </div>

                        <div className="form__field">
                            <span>
                                {t("identity.issuedPlace")}
                            </span>
                            <input
                                type="text"
                                value={identity.issuedPlace}
                                onChange={(e) => setIdentity({ ...identity, issuedPlace: e.target.value })}
                                placeholder={t("identity.issuedPlacePlaceholder")}
                            />
                        </div>

                        <div className="form__field">
                            <span>
                                {t("identity.expiredDate")}
                            </span>
                            <input
                                type="date"
                                value={identity.expiredDate}
                                onChange={(e) => setIdentity({ ...identity, expiredDate: e.target.value })}
                                placeholder={t("identity.expiredDatePlaceholder")}
                            />
                        </div>

                        {identityType === "new" && "hasChip" in identity && (<div className="form__field">
                            <span>
                                {t("identity.hasChip")}
                            </span>
                            <input
                                id="hasChip"
                                type="checkbox"
                                checked={identity.hasChip}
                                onChange={(e) => setIdentity({ ...identity, hasChip: e.target.checked })}
                            />

                            <label htmlFor="hasChip">
                                <div className="labeline">
                                    <FontAwesomeIcon icon={identity.hasChip ? faCheck : faX} />
                                </div>
                            </label>
                        </div>)}

                        {identityType === "passport" && "issuedCountry" in identity && (<div className="form__field">
                            <span>
                                {t("identity.issuedCountry")}
                            </span>
                            <input
                                type="text"
                                value={(identity as Passport).issuedCountry}
                                onChange={(e) => setIdentity({ ...identity, issuedCountry: e.target.value })}
                                placeholder={t("identity.issuedCountryPlaceholder")}
                            />
                        </div>)}

                        {identityType === "passport" && "notes" in identity && (<div className="form__field">
                            <span>
                                {t("identity.note")}
                            </span>
                            <textarea
                                value={(identity as Passport).notes}
                                onChange={(e) => setIdentity({ ...identity, notes: e.target.value })}
                                placeholder={t("identity.notePlaceholder")}
                            />
                        </div>)}

                    </div>

                    <div className="form__footer">
                        <div className="form__button">
                            <button onClick={handleCancel}>
                                {t("button.cancel")}
                            </button>
                            <button onClick={handleSave}>
                                {t("button.save")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}


export default StudentIdentity;