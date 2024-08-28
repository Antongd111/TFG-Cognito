import es from './es.json';
import en from './en.json';

const translations = {
  es,
  en,
};

export const getTranslation = (language) => {
  const selectedTranslations = translations[language];
  
  return selectedTranslations || translations['es'];
};