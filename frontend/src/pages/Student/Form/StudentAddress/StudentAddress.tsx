import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import "./student_address.css"
import "../../../../styles/form.css";

function StudentAddress({ title, description, setAddress, setIsHide }: { title: string, description: string, setAddress: any, setIsHide: any }) {
    const [cities, setCities] = useState<any[]>([]);
    const [districts, setDistricts] = useState<any[]>([]);
    const [villages, setVillages] = useState<any[]>([]);

    const [selectedDetail, setSelectedDetail] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const [selectedDistrict, setSelectedDistrict] = useState<string>("");
    const [selectedVillage, setSelectedVillage] = useState<string>("");

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
            if (selectedCity === "") {
                return;
            }
            try {
                const res = await fetch(`https://provinces.open-api.vn/api/p/${selectedCity}?depth=2`);
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
            if (selectedDistrict === "") {
                return;
            }

            try {
                const res = await fetch(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`);
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
        setSelectedCity("");
        setSelectedDistrict("");
        setSelectedVillage("");
        setSelectedDetail("");
    }

    function handleSave() {
        setAddress({
            city: selectedCity,
            district: selectedDistrict,
            village: selectedVillage,
            street: selectedDetail
        });

        setIsHide(true);
    }

    return (
        <>
            <div className="virtual-background">
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
                            <span>City</span>

                            <select
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}>
                                <option key={0} value="" disabled>Select provinces</option>
                                {cities.map((city, index) => (
                                    <option key={index} value={city.code}>{city.name}</option>
                                ))}

                                <option value="">None</option>
                            </select>

                        </div>


                        <div className="form__field">
                            <span>District</span>

                            <select
                                value={selectedDistrict}
                                onChange={(e) => setSelectedDistrict(e.target.value)}>
                                <option value="" disabled>Select districts</option>
                                {districts && districts.length !== 0 &&
                                    districts.map((district, index) => (
                                        <option key={index} value={district.code}>{district.name}</option>
                                    ))
                                }
                                {districts && districts.length !== 0 && <option value="">None</option>}
                            </select>

                        </div>

                        <div className="form__field">
                            <span>Ward</span>

                            <select
                                value={selectedVillage}
                                onChange={(e) => setSelectedVillage(e.target.value)}
                            >
                                <option value="" disabled>Select villages</option>
                                {villages && villages.length !== 0 && villages.map((village, index) => (
                                    <option key={index} value={village.code}>{village.name}</option>
                                ))}
                                <option value="">None</option>
                            </select>

                        </div>

                        <div className="form__field">
                            <span>Street</span>
                            <input
                                type="text"
                                placeholder="House number, Street, ..."
                                value={selectedDetail}
                                onChange={(e) => setSelectedDetail(e.target.value)}
                            />
                        </div>

                    </div>

                    <div className="form__footer">
                        <div className="form__button">
                            <button onClick={handleReset}>Reset</button>
                            <button onClick={handleSave}>Save</button>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}

export default StudentAddress;