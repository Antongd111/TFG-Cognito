import es from './es.json';
import en from './en.json';

// VALORES A INCLUIR EN JSON NUEVO
// "Reestablecer ajustes"
// "Ajustes"
// "Volver"

const translations = {
  es,
  en,
};

export const getTranslation = (language) => {
  const selectedTranslations = translations[language];
  
  //console.log(`Cargando traducciones para el idioma: ${language}`, selectedTranslations);
  
  return selectedTranslations || translations['es'];
};