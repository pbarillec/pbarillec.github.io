<template>
  <section
    class="flex flex-col md:flex-row items-center justify-center text-white py-10 px-6 md:px-16"
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
      <h2 class="text-lg md:text-xl text-blue-400 mt-2">
        {{ jsonData?.currentRole }}
      </h2>
      <p class="mt-4 text-lg text-gray-300 leading-relaxed min-h-[80px]">
        {{ jsonData?.professionalSummary }}
      </p>

      <!-- Infos de contact -->
      <div class="mt-4 text-gray-400">
        <p>📧 {{ jsonData?.contact?.email }}</p>
        <p>📞 {{ jsonData?.contact?.phone }}</p>
        <p>
          🔗
          <a
            :href="jsonData?.contact?.linkedin"
            class="text-blue-500 hover:underline"
            >LinkedIn</a
          >
        </p>
        <p>
          💻
          <a
            :href="jsonData?.contact?.github"
            class="text-blue-500 hover:underline"
            >GitHub</a
          >
        </p>
      </div>

      <!-- Bouton de changement de langue -->
      <div class="mt-6 flex justify-center md:justify-start space-x-4">
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
    </div>
  </section>
</template>

<script setup>
import { inject } from "vue";
import { useI18n } from "vue-i18n";
const jsonData = inject("jsonData"); // Récupère les données du JSON
const switchLanguage = inject("switchLanguage"); // Récupère la fonction pour changer de langue
const { locale } = useI18n(); // Récupère la langue active
</script>
