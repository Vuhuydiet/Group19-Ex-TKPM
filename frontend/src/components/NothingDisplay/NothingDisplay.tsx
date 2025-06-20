import './nothing_display.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCubes } from '@fortawesome/free-solid-svg-icons'
import { useTranslation } from 'react-i18next';

function NothingDisplay({ desciption }: { desciption: string | null }) {
    const { t } = useTranslation();

    return (
        <div className="nothing__display">
            <div className="nothing__display__header">
                <h2>
                    {t('hi')}
                </h2>
                <div className="nothing__display__icon">

                    <FontAwesomeIcon icon={faCubes} className="icon__nodisplay" />
                </div>
            </div>

            <div className="nothing__display__body">
                <p>{desciption ? desciption : t('nothingDisplayDescription')}</p>
            </div>

        </div>
    );
}

export default NothingDisplay;