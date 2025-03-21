import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX, faCheck } from '@fortawesome/free-solid-svg-icons'
import "./student_identity.css";
import "../../../../styles/form.css";

interface Identity {
    ID: string;
    issuedDate: string;
    issuedPlace: string;
    expiredDate: string;
}

interface OldIdentityCard extends Identity { }

interface NewIdentityCard extends Identity {
    chipIntergrated: boolean;
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
    const [identity, setIdentity] = useState<OldIdentityCard | NewIdentityCard | Passport>({
        ID: "",
        issuedDate: "",
        issuedPlace: "",
        expiredDate: ""
    });

    const [identityType, setIdentityType] = useState<"old" | "new" | "passport">("old");

    const handleIdentityChange = (type: "old" | "new" | "passport") => {
        setIdentityType(type);
        if (type === "old") {
            setIdentity({
                ID: "",
                issuedDate: "",
                issuedPlace: "",
                expiredDate: ""
            });
        } else if (type === "new") {
            setIdentity({
                ID: "",
                issuedDate: "",
                issuedPlace: "",
                expiredDate: "",
                chipIntergrated: false
            } as NewIdentityCard);
        } else {
            setIdentity({
                ID: "",
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
                            <h1>Student Identity</h1>
                            <p>Hehehehehehhehe</p>
                        </div>

                        <div className="header__right">
                            <div className="form__radio">
                                <input type="radio" id="old" name="identity" value="old"
                                    checked={identityType === "old"} onChange={() => handleIdentityChange("old")}
                                />
                                <label htmlFor="old">Old Identity</label>

                                <input type="radio" id="new" name="identity" value="new"
                                    checked={identityType === "new"} onChange={() => handleIdentityChange("new")}
                                />
                                <label htmlFor="new">New Identity</label>

                                <input type="radio" id="passport" name="identity" value="passport"
                                    checked={identityType === "passport"} onChange={() => handleIdentityChange("passport")}
                                />
                                <label htmlFor="passport">Passport</label>
                            </div>
                        </div>
                    </div>

                    <div className="form__body">

                        <div className="form__field">
                            <span>ID</span>
                            <input
                                type="text"
                                value={identity.ID}
                                onChange={(e) => setIdentity({ ...identity, ID: e.target.value })}
                                placeholder="Enter identity ID"
                            />
                        </div>

                        <div className="form__field">
                            <span>Issued Date</span>
                            <input
                                type="date"
                                value={identity.issuedDate}
                                onChange={(e) => setIdentity({ ...identity, issuedDate: e.target.value })}
                                placeholder="Enter identity issued date"
                            />
                        </div>

                        <div className="form__field">
                            <span>Issued Place</span>
                            <input
                                type="text"
                                value={identity.issuedPlace}
                                onChange={(e) => setIdentity({ ...identity, issuedPlace: e.target.value })}
                                placeholder="Enter identity issued place"
                            />
                        </div>

                        <div className="form__field">
                            <span>Expired Date</span>
                            <input
                                type="date"
                                value={identity.expiredDate}
                                onChange={(e) => setIdentity({ ...identity, expiredDate: e.target.value })}
                                placeholder="Enter identity expired date"
                            />
                        </div>

                        {identityType === "new" && "chipIntergrated" in identity && (<div className="form__field">
                            <span>Chip Intergrated</span>
                            <input
                                id="chipIntergrated"
                                type="checkbox"
                                checked={identity.chipIntergrated}
                                onChange={(e) => setIdentity({ ...identity, chipIntergrated: e.target.checked })}
                            />

                            <label htmlFor="chipIntergrated">
                                <div className="labeline">
                                    <FontAwesomeIcon icon={identity.chipIntergrated ? faCheck : faX} />
                                </div>
                            </label>
                        </div>)}

                        {identityType === "passport" && "issuedCountry" in identity && (<div className="form__field">
                            <span>Issued Country</span>
                            <input
                                type="text"
                                value={(identity as Passport).issuedCountry}
                                onChange={(e) => setIdentity({ ...identity, issuedCountry: e.target.value })}
                                placeholder="Enter identity issued country"
                            />
                        </div>)}

                        {identityType === "passport" && "notes" in identity && (<div className="form__field">
                            <span>Notes</span>
                            <textarea
                                value={(identity as Passport).notes}
                                onChange={(e) => setIdentity({ ...identity, notes: e.target.value })}
                                placeholder="Enter identity notes"
                            />
                        </div>)}

                    </div>

                    <div className="form__footer">
                        <div className="form__button">
                            <button onClick={handleCancel}>Cancel</button>
                            <button onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}


export default StudentIdentity;