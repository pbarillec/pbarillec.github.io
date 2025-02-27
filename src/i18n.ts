import { createI18n } from "vue-i18n";

const messages = {
  en: {
    titles: {
      experience: "Work Experiences",
      education: "Education",
      projects: "Projects",
    },
    downloadCV: "Download Resume",
    phone: "Phone",
  },
  fr: {
    titles: {
      experience: "Expériences Professionnelles ",
      education: "Formations",
      projects: "Projets",
    },
    downloadCV: "Télécharger le CV",
    phone: "Téléphone",
  },
};

const i18n = createI18n({
  locale: "fr", // Langue par défaut
  fallbackLocale: "en",
  messages,
  legacy: false,
});

export default i18n;
