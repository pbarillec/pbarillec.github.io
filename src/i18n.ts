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
    comingSoon: "More coming soon...",
  },
  fr: {
    titles: {
      experience: "Expériences Professionnelles ",
      education: "Formations",
      projects: "Projets",
    },
    downloadCV: "Télécharger le CV",
    phone: "Téléphone",
    comingSoon: "À venir prochainement...",
  },
};

const i18n = createI18n({
  locale: "fr", // Langue par défaut
  fallbackLocale: "en",
  messages,
  legacy: false,
});

export default i18n;
