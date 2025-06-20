import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'vi',
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        },
        interpolation: {
            escapeValue: false,
        },
        debug: true,
    })
    .then(() => {
        console.log('i18next initialized successfully', i18n.language);
    })
    .catch((err) => {
        console.error('i18next initialization failed', err);
    });

export default i18n;