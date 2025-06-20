import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faList, faRightFromBracket, faClock, faGraduationCap, faBook, faSchool, faCloud } from '@fortawesome/free-solid-svg-icons'
import './header.css'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
// import { useNotification } from './components/NotificationContext'
// import { useLoading } from './components/LoadingContext'

function Header() {
    // const { setIsLoading } = useLoading();
    // const { notify } = useNotification();
    // const { authorization } = useAuthorizations();
    const { t } = useTranslation();

    return (
        <div className="header">
            <div className="header__logo">
                <div className="header__logo__wrapper">
                    <FontAwesomeIcon icon={faClock} className='icon__logo' />
                </div>
            </div>
            <div className="header__nav">
                <div className="header__nav__items">
                    <div className="header__nav__items__title">
                        {t('sidebarHeading.dashboard')}
                    </div>
                    <Link to='/'>
                        <div className="header__nav__items__content">
                            <div className="header__nav__item">
                                <FontAwesomeIcon icon={faHome} className='icon__item' />
                                <span>{t('sidebar.home')}</span>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="header__nav__items">
                    <div className="header__nav__items__title">
                        {t('sidebarHeading.managementTool')}
                    </div>
                    <div className="header__nav__items__content">
                        <Link to='/student'>
                            <div className="header__nav__item">
                                <FontAwesomeIcon icon={faGraduationCap} className='icon__item' />
                                <span>{t('sidebar.student')}</span>
                            </div>
                        </Link>
                    </div>
                    <div className="header__nav__items__content">
                        <Link to='/category'>
                            <div className="header__nav__item">
                                <FontAwesomeIcon icon={faList} className='icon__item' />
                                <span>{t('sidebar.category')}</span>
                            </div>
                        </Link>
                    </div>

                    <div className="header__nav__items__content">
                        <Link to='/module'>
                            <div className="header__nav__item">
                                <FontAwesomeIcon icon={faBook} className='icon__item' />
                                <span>{t('sidebar.course')}</span>
                            </div>
                        </Link>
                    </div>

                    <div className="header__nav__items__content">
                        <Link to='/class'>
                            <div className="header__nav__item">
                                <FontAwesomeIcon icon={faSchool} className='icon__item' />
                                <span>{t('sidebar.class')}</span>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="header__nav__items">
                    <div className="header__nav__items__title">
                        {t('sidebarHeading.otherTool')}
                    </div>

                    <div className="header__nav__items__content">
                        <Link to='/module/register'>
                            <div className="header__nav__item">
                                <FontAwesomeIcon icon={faCloud} className='icon__item' />
                                <span>{t('sidebar.classRegistration')}</span>
                            </div>
                        </Link>
                    </div>
                </div>

            </div>

            <div className="header__footer">
                <div className="header__footer__item">
                    <FontAwesomeIcon icon={faRightFromBracket} className='icon__logout' />
                    <span>{t('sidebar.logout')}</span>
                </div>
            </div>

        </div>
    );
}

export default Header;