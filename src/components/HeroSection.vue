<template>
  <section class="flex flex-col items-center text-white py-10 px-6 md:px-16">
    <!-- Conteneur principal (image + texte) -->
    <div
      class="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl"
    >
      <!-- Photo à gauche -->
      <div
        class="w-40 h-40 md:w-56 md:h-56 flex-shrink-0 rounded-full overflow-hidden border-4 border-gray-500 shadow-lg"
      >
        <img
          src="/profile.jpg"
          alt="Pierre Barillec"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Présentation à droite -->
      <div
        class="mt-6 md:mt-0 md:ml-10 text-center md:text-left w-full md:w-[500px]"
      >
        <h1 class="text-3xl md:text-4xl font-bold">
          {{ jsonData?.contact?.name }}
        </h1>
        <h2
          ref="typewriterTarget"
          class="text-lg md:text-xl text-blue-400 mt-2"
        ></h2>

        <p class="mt-4 text-lg text-gray-300 leading-relaxed min-h-[80px]">
          {{ jsonData?.professionalSummary }}
        </p>
      </div>
    </div>

    <!-- Conteneur secondaire (contact) -->
    <div
      class="mt-6 w-full max-w-5xl flex flex-wrap justify-center md:justify-between gap-6 text-gray-400 text-lg border-t border-gray-600 pt-6"
    >
      <p class="flex items-center gap-2">📧 {{ jsonData?.contact?.email }}</p>
      <p class="flex items-center gap-2">📞 {{ jsonData?.contact?.phone }}</p>
      <p class="flex items-center gap-2">
        🔗
        <a
          :href="jsonData?.contact?.linkedin"
          class="text-blue-500 hover:underline"
          >LinkedIn</a
        >
      </p>
      <p class="flex items-center gap-2">
        💻
        <a
          :href="jsonData?.contact?.github"
          class="text-blue-500 hover:underline"
          >GitHub</a
        >
      </p>
    </div>

    <!-- Bouton de changement de langue -->
    <div class="fixed top-6 right-6 flex space-x-4">
      <button
        @click="switchLanguage('fr')"
        class="px-4 py-2 rounded transition-colors"
        :class="
          locale === 'fr'
            ? 'bg-blue-600 text-white font-bold'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        "
      >
        FR
      </button>
      <button
        @click="switchLanguage('en')"
        class="px-4 py-2 rounded transition-colors"
        :class="
          locale === 'en'
            ? 'bg-blue-600 text-white font-bold'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        "
      >
        EN
      </button>
    </div>
  </section>
</template>

<script setup>
import { inject, ref, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import Typewriter from "typewriter-effect/dist/core";
import GraphemeSplitter from "grapheme-splitter";

const jsonData = inject("jsonData"); // Récupère les données du JSON
const switchLanguage = inject("switchLanguage"); // Récupère la fonction pour changer de langue
const { t, locale } = useI18n(); // Récupère la langue active

const typewriterTarget = ref(null);

const startTypewriter = () => {
  if (typewriterTarget.value) {
    const roles1 = t("typewriter1");
    const roles2 = t("typewriter2");
    const typewriter = new Typewriter(typewriterTarget.value, {
      loop: true,
      delay: 30,
      deleteSpeed: 20,
      stringSplitter,
    })
      .typeString(roles1)
      .pauseFor(1000)
      .deleteAll()
      .typeString(roles2)
      .pauseFor(1000)
      .start();
  }
};

const stringSplitter = (string) => {
  const splitter = new GraphemeSplitter();
  return splitter.splitGraphemes(string);
};

// 🔥 Lancer au chargement et surveiller le changement de langue
onMounted(startTypewriter);
watch(locale, startTypewriter);
</script>
