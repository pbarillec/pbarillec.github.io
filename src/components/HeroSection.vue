<template>
  <section
    class="flex flex-col md:flex-row items-center justify-center text-white py-10 px-6 md:px-16"
  >
    <!-- Photo à gauche -->
    <div
      class="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-gray-500 shadow-lg"
    >
      <img
        src="/profile.jpg"
        alt="Pierre Barillec"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Présentation à droite -->
    <div class="mt-6 md:mt-0 md:ml-10 text-center md:text-left">
      <h1 class="text-3xl md:text-4xl font-bold">{{ $t("introduction") }}</h1>
      <p class="mt-4 text-lg text-gray-300">
        {{ $t("bio") }}
      </p>
      <!-- Bouton de changement de langue -->
      <div class="mt-6 flex justify-center md:justify-start space-x-4">
        <button
          @click="switchLanguage('fr')"
          class="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600"
        >
          {{ $t("french") }}
        </button>
        <button
          @click="switchLanguage('en')"
          class="px-4 py-2 rounded bg-gray-700 hover:bg-gray-800"
        >
          {{ $t("english") }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n();

const switchLanguage = (lang) => {
  locale.value = lang;
};
</script>

<style scoped>
/* Ajoute un peu de style personnalisé si besoin */
</style>
