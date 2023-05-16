import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './jsons/en.json';
import ru from './jsons/ru.json';
import kz from './jsons/kz.json';
  
i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: en,
    ru: ru,
    kz: kz
  },
  interpolation: {
    escapeValue: false 
  }
});
  
export default i18n;

