import { createI18n } from "vue-i18n";

const messages = {
  en: {
    introduction: "Hello, I'm Pierre Barillec, a software engineer.",
    bio: "I specialize in full-stack development, working with Vue.js, TypeScript, Java, and more. My experience includes projects in IT consulting, banking, and aerospace.",
    french: "FR",
    english: "EN",
  },
  fr: {
    introduction: "Bonjour, je suis Pierre Barillec, ingénieur logiciel.",
    bio: "Je suis spécialisé en développement full-stack, travaillant avec Vue.js, TypeScript, Java et bien plus. Mon expérience couvre le conseil IT, la banque et l’aérospatial.",
    french: "FR",
    english: "EN",
  },
};

const i18n = createI18n({
  locale: "fr", // Langue par défaut
  fallbackLocale: "en",
  messages,
  legacy: false,
});

export default i18n;
