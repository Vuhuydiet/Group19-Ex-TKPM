import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import "./student_address.css"
import "../../../../styles/form.css";
import { useTranslation } from "react-i18next";

interface AddressField {
    code: string;
    name: string;
}

function StudentAddress({ title, description, setAddress, setIsHide }: { title: string, description: string, setAddress: any, setIsHide: any }) {
    const { t } = useTranslation();
    const [cities, setCities] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const [villages, setVillages] = useState<any[]>([]);

    const [selectedDetail, setSelectedDetail] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<AddressField>({
        code: "",
        name: ""
    });
    const [selectedDistrict, setSelectedDistrict] = useState<AddressField>({
        code: "",
        name: ""
    });
    const [selectedVillage, setSelectedVillage] = useState<AddressField>({
        code: "",
        name: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://provinces.open-api.vn/api/?depth=1");
                const data = await res.json();

                const cities = data;
                cities.sort();
                setCities(cities);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (selectedCity.code === "") {
                return;
            }
            try {
                const res = await fetch(`https://provinces.open-api.vn/api/p/${selectedCity.code}?depth=2`);
                const data = await res.json();

                const districts = data.districts;

                setDistricts(districts);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [selectedCity]);

    useEffect(() => {
        const fetchData = async () => {
            if (selectedDistrict.code === "") {
                return;
            }

            try {
                const res = await fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict.code}?depth=2`);
                const data = await res.json();

                const villages = data.wards;
                setVillages(villages);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [selectedDistrict]);

    function handleClose() {
        setIsHide(true);
    }

    function handleReset() {
        setSelectedCity({} as AddressField);
        setSelectedDistrict({} as AddressField);
        setSelectedVillage({} as AddressField);
        setSelectedDetail("");
    }

    function handleSave() {
        setAddress({
            city: selectedCity.name,
            district: selectedDistrict.name,
            ward: selectedVillage.name,
            street: selectedDetail
        });

        setIsHide(true);
    }

    return (
        <>
            <div className="virtual-background virtual-background-frontside">
                <div className="form form--address">
                    <div className="form__header">
                        <div className="header__left">
                            <h1>{title}</h1>
                            <p>{description}</p>
                        </div>

                        <div className="header__right">
                            <button onClick={handleClose}>
                                <FontAwesomeIcon icon={faX} />
                            </button>
                        </div>
                    </div>

                    <div className="form__body">

                        <div className="form__field">
                            <span>
                                {t("address.city")}
                            </span>

                            <select
                                value={selectedCity.code}
                                onChange={(e) => setSelectedCity({
                                    code: e.target.value,
                                    name: e.target.options[e.target.selectedIndex].text
                                })}>
                                <option key={0} value="" disabled>
                                    {t("address.cityPlaceholder")}
                                </option>
                                {cities.map((city, index) => (
                                    <option key={index} value={city.code}>{city.name}</option>
                                ))}

                                <option value="">None</option>
                            </select>

                        </div>


                        <div className="form__field">
                            <span>
                                {t("address.district")}
                            </span>

                            <select
                                value={selectedDistrict.code}
                                onChange={(e) => setSelectedDistrict({
                                    code: e.target.value,
                                    name: e.target.options[e.target.selectedIndex].text
                                })}>
                                <option value="" disabled>
                                    {t("address.districtPlaceholder")}
                                </option>
                                {districts && districts.length !== 0 &&
                                    districts.map((district, index) => (
                                        <option key={index} value={district.code}>{district.name}</option>
                                    ))
                                }
                                {districts && districts.length !== 0 && <option value="">None</option>}
                            </select>

                        </div>

                        <div className="form__field">
                            <span>
                                {t("address.ward")}
                            </span>

                            <select
                                value={selectedVillage.code}
                                onChange={(e) => setSelectedVillage({
                                    code: e.target.value,
                                    name: e.target.options[e.target.selectedIndex].text
                                })}
                            >
                                <option value="" disabled>
                                    {t("address.wardPlaceholder")}
                                </option>
                                {villages && villages.length !== 0 && villages.map((village, index) => (
                                    <option key={index} value={village.code}>{village.name}</option>
                                ))}
                                <option value="">None</option>
                            </select>

                        </div>

                        <div className="form__field">
                            <span>
                                {t("address.street")}
                            </span>
                            <input
                                type="text"
                                placeholder={t("address.streetPlaceholder")}
                                value={selectedDetail}
                                onChange={(e) => setSelectedDetail(e.target.value)}
                            />
                        </div>

                    </div>

                    <div className="form__footer">
                        <div className="form__button">
                            <button onClick={handleReset}>
                                {t("button.reset")}
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

export default StudentAddress;