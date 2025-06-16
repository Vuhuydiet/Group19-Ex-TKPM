
import './home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';

function Home() {
    const { t } = useTranslation();

    return (
        <>
            <div className="home">
                <div className="home__left">
                    <div className="home__welcome__icon">
                        <FontAwesomeIcon icon={faFaceSmile} />
                    </div>

                </div>

                <div className="home__right">
                    <div className="home__text">
                        <h1>{t('welcome')}</h1>
                        <h5>Remember, every small step brings you closer to success!</h5>
                        <p>Believe in yourself—great things await today!</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home