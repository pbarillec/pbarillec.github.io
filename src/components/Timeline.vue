<template>
  <section class="max-w-5xl mx-auto py-10">
    <h2 class="text-3xl font-bold text-white text-center mb-10">
      Expériences Professionnelles
    </h2>

    <div class="relative mx-auto w-4/5">
      <!-- Barre verticale centrée -->
      <div
        class="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-500"
      ></div>

      <div
        v-for="(exp, index) in experiences"
        :key="index"
        class="relative mb-10 flex w-full items-center"
        :class="{ 'flex-row-reverse': index % 2 === 1 }"
      >
        <!-- Point bleu CENTRÉ SUR LA BARRE -->
        <div
          class="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-blue-500 rounded-full border-4 border-gray-900"
        ></div>

        <!-- Contenu (Texte) -->
        <div class="w-[20%] md:w-[48%] p-6 bg-gray-800 rounded-lg shadow-lg">
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
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const experiences = ref([]);

onMounted(async () => {
  try {
    const response = await fetch("/data/cv_data.json");
    if (!response.ok) throw new Error("Erreur de chargement du JSON");
    const data = await response.json();
    experiences.value = data.experiences;
  } catch (error) {
    console.error("Erreur lors du chargement du JSON :", error);
  }
});
</script>
