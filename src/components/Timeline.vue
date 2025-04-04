<template>
  <section class="max-w-5xl mx-auto py-10">
    <h2 class="text-3xl font-bold text-white text-center mb-10">
      {{ $t("titles.experience") }} 👨‍💻
    </h2>

    <!-- 📱 Version mobile : Tuiles -->
    <div class="block md:hidden space-y-6 px-4">
      <div
        v-for="(exp, index) in jsonData?.experiences"
        :key="index"
        class="bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <div class="flex items-center gap-4">
          <img
            v-if="exp.logo"
            :src="exp.logo"
            :alt="exp.company"
            class="w-16 h-16 object-contain bg-white bg-opacity-40 rounded-lg p-2 shadow-md"
          />
          <div>
            <h3 class="text-xl font-semibold text-blue-400">{{ exp.title }}</h3>
            <p class="text-sm text-gray-400">{{ exp.period }}</p>
          </div>
        </div>
        <p class="text-white mt-4 leading-relaxed">{{ exp.description }}</p>

        <!-- Icônes des technologies -->
        <div class="flex flex-wrap gap-2 mt-3">
          <span
            v-for="tech in exp.technologies"
            :key="tech"
            class="bg-gray-700 text-white px-2 py-1 text-xs rounded-md"
          >
            {{ tech }}
          </span>
        </div>
      </div>
    </div>

    <!-- 🖥️ Version desktop : Timeline -->
    <div class="hidden md:block relative mx-auto w-4/5">
      <div
        class="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-500"
      ></div>

      <div
        v-for="(exp, index) in jsonData?.experiences"
        :key="index"
        class="relative mb-10 flex w-full items-center"
        :class="{ 'flex-row-reverse': index % 2 === 1 }"
      >
        <!-- Point bleu CENTRÉ SUR LA BARRE -->
        <div
          class="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-blue-500 rounded-full border-4 border-gray-900"
        ></div>

        <!-- Contenu (Texte) -->
        <div class="w-[45%] md:w-[48%] p-6 bg-gray-800 rounded-lg shadow-lg">
          <h3 class="text-xl font-semibold text-blue-400">{{ exp.title }}</h3>
          <p class="text-sm text-gray-400">{{ exp.period }}</p>
          <p class="text-white mt-2 leading-relaxed">{{ exp.description }}</p>

          <!-- Icônes des technologies -->
          <div class="flex flex-wrap gap-2 mt-3">
            <span
              v-for="tech in exp.technologies"
              :key="tech"
              class="bg-gray-700 text-white px-2 py-1 text-xs rounded-md"
            >
              {{ tech }}
            </span>
          </div>
        </div>

        <!-- Image du logo -->
        <div class="w-[30%] flex justify-center">
          <img
            v-if="exp.logo"
            :src="exp.logo"
            :alt="exp.company"
            class="w-30 h-30 object-contain rounded-lg p-2 bg-white bg-opacity-60 shadow-md"
            :style="{ marginLeft: index % 2 === 0 ? '6rem' : '-6rem' }"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { inject } from "vue";

const jsonData = inject("jsonData"); // Récupère les expériences dynamiquement
</script>
