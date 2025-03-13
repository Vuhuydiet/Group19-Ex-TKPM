import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faList, faRightFromBracket, faClock } from '@fortawesome/free-solid-svg-icons'
import './header.css'
import { Link } from 'react-router-dom'
// import { useNotification } from './components/NotificationContext'
// import { useLoading } from './components/LoadingContext'

function Header() {
    // const { setIsLoading } = useLoading();
    // const { notify } = useNotification();
    // const { authorization } = useAuthorizations();

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
                        Dashboard
                    </div>
                    <Link to='/'>
                        <div className="header__nav__items__content">
                            <div className="header__nav__item">
                                <FontAwesomeIcon icon={faHome} className='icon__item' />
                                <span>Home</span>
                            </div>
                        </div>
                    </Link>
                </div>

                <div className="header__nav__items">
                    <div className="header__nav__items__title">
                        Student
                    </div>
                    <div className="header__nav__items__content">
                        <Link to='/student'>
                            <div className="header__nav__item">
                                <FontAwesomeIcon icon={faList} className='icon__item' />
                                <span>Management</span>
                            </div>
                        </Link>
                    </div>
                    <div className="header__nav__items__content">
                        <Link to='/student/import'>
                            <div className="header__nav__item">
                                <FontAwesomeIcon icon={faList} className='icon__item' />
                                <span>Addition</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="header__footer">
                <div className="header__footer__item">
                    <FontAwesomeIcon icon={faRightFromBracket} className='icon__logout' />
                    <span>Logout</span>
                </div>
            </div>

        </div>
    );
}

export default Header;