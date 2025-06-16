
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
                        <h5>{t('subWelcome1')}</h5>
                        <p>{t('subWelcome2')}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home