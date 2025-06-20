import { useState } from "react";
import Faculty from "../Faculty/Faculty";
import './category_management.css';
import Program from "../Programs/Program";
import Status from "../Status/Status";
import { useTranslation } from "react-i18next";

const CategoryManagement = () => {
    const { t } = useTranslation();
    const [typeCategory, setTypeCategory] = useState<"Faculty" | "Program" | "Status">('Faculty');

    return (
        <>
            <div className="management">
                <div className="management__header">
                    <div className="management__nav">
                        <div className="label-item"
                            style={{ left: typeCategory === 'Faculty' ? '0' : typeCategory === 'Program' ? '100px' : '200px' }}
                        ></div>

                        <input
                            type="radio"
                            name="CategoryManagement"
                            id="faculty"
                            checked={typeCategory === 'Faculty'}
                            onChange={() => setTypeCategory('Faculty')}
                        />
                        <label htmlFor="faculty"
                            style={{ color: typeCategory === 'Faculty' ? 'var(--text-in-background-color)' : 'var(--main-color)' }}
                        >
                            {t('tableHeading.faculty')}
                        </label>

                        <input
                            type="radio"
                            name="CategoryManagement"
                            id="program"
                            checked={typeCategory === 'Program'}
                            onChange={() => setTypeCategory('Program')}
                        />
                        <label htmlFor="program"
                            style={{ color: typeCategory === 'Program' ? '#fff' : 'var(--main-color)' }}
                        >
                            {t('tableHeading.program')}
                        </label>

                        <input
                            type="radio"
                            name="CategoryManagement"
                            id="status"
                            checked={typeCategory === 'Status'}
                            onChange={() => setTypeCategory('Status')}
                        />
                        <label htmlFor="status"
                            style={{ color: typeCategory === 'Status' ? '#fff' : 'var(--main-color)' }}
                        >
                            {t('tableHeading.status')}
                        </label>
                    </div>
                </div>

                <div className="management__body">
                    {typeCategory === "Faculty" && <Faculty />}
                    {typeCategory === "Program" && <Program />}
                    {typeCategory === "Status" && <Status />}
                </div>
            </div>
        </>
    )
}

export default CategoryManagement;