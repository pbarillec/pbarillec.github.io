<template>
  <div class="bg-gray-900 min-h-screen">
    <HeroSection @change-language="switchLanguage" />
    <Timeline />
    <Formations />
    <Projects />
    <DownloadCv />
  </div>
</template>

<script setup>
import { ref, provide, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import HeroSection from "./components/HeroSection.vue";
import Timeline from "./components/Timeline.vue";
import Formations from "./components/Formations.vue";
import Projects from "./components/Projects.vue";
import DownloadCv from "./components/DownloadCv.vue";

const { locale } = useI18n(); // Récupère la langue actuelle
const jsonData = ref({}); // Stocke les données du CV

// Fonction pour charger le bon fichier JSON selon la langue
const loadData = async () => {
  try {
    const langFile =
      locale.value === "fr" ? "/data/cv_data_fr.json" : "/data/cv_data_en.json";
    const response = await fetch(langFile);
    if (!response.ok) throw new Error("Erreur de chargement du JSON");

    jsonData.value = await response.json();
  } catch (error) {
    console.error("Erreur lors du chargement du JSON :", error);
  }
};

// Fonction pour changer la langue
const switchLanguage = (lang) => {
  locale.value = lang;
  loadData();
};

// Charger les données au démarrage et quand la langue change
onMounted(loadData);
watch(locale, loadData);

// Partager les données à tous les composants
provide("jsonData", jsonData);
provide("switchLanguage", switchLanguage);
</script>
