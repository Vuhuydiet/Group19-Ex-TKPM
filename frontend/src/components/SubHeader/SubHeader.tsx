import './sub_header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faBell, faUser, faRepeat } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react';
import { changeTheme } from './SubHeader.actions';
import { useTranslation } from 'react-i18next';

// type Theme = Record<string, string>;

function SubHeader() {

    const { t, i18n } = useTranslation();

    const changeLanguage = () => {
        console.log('Current language:', i18n.language);
        if (i18n.language === 'vi' || i18n.language === 'vi-VN') {
            i18n.changeLanguage('en');
        }
        else if (i18n.language === 'en') {
            i18n.changeLanguage('vi');
        }
    };
    const [isDarkMode, setIsDarkMode] = useState(false);

    // const lightTheme: Theme = {
    //     "--border-radius": "10px",
    //     "--main-color": "#80002a",
    //     "--main-scroll-color": "#3b3b3b93",
    //     "--background-color": "#fff",
    //     "--item-color": "#f2f2f2",
    //     "--text-color": "#000",
    //     "--text-in-background-color": "#fff",
    // };

    // const darkTheme: Theme = {
    //     "--border-radius": "10px",
    //     "--main-color": "#fff",
    //     "--main-scroll-color": "#88878793",
    //     "--background-color": "#000",
    //     "--item-color": "#202020",
    //     "--text-color": "#fff",
    //     "--text-in-background-color": "#000",
    // };

    useEffect(() => {
        changeTheme(isDarkMode);
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className="subheader">
            <div className="subheader__title">
                <span>{t('mainTitle')}</span>
            </div>
            <div className="subheader__features">
                <div onClick={toggleTheme} className="subheader__feature">
                    <FontAwesomeIcon icon={faSun} className='icon__feature' />
                </div>
                <div className="subheader__feature">
                    <FontAwesomeIcon icon={faBell} className='icon__feature' />
                </div>
                <div onClick={changeLanguage} className="subheader__feature">
                    <FontAwesomeIcon icon={faRepeat} className='icon__feature' />
                </div>
                <div className="subheader__feature">
                    <FontAwesomeIcon icon={faUser} className='icon__feature' />
                </div>
            </div>
        </div>
    );
}

export default SubHeader;