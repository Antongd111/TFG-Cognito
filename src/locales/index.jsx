import es from './es.json';
import en from './en.json';
// import fr from './fr.json';

const translations = {
  es,
  en,
  // fr
};

export const getTranslation = (language) => {
  const selectedTranslations = translations[language];
  
  return selectedTranslations || translations['es'];
};