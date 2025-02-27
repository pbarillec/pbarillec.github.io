<template>
  <section class="max-w-5xl mx-auto py-10">
    <h2 class="text-3xl font-bold text-white text-center mb-10">
      {{ $t("titles.education") }} 🎓
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="(formation, index) in jsonData?.formations"
        :key="index"
        class="bg-gray-800 p-6 rounded-lg shadow-lg text-center"
      >
        <h3 class="text-xl font-semibold text-blue-400">
          {{ formation.diploma }}
        </h3>
        <p class="text-gray-300">{{ formation.school }}</p>
        <p class="text-sm text-gray-400 mt-2">{{ formation.period }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { inject } from "vue";

const jsonData = inject("jsonData"); // Récupère les formations dynamiquement
</script>
