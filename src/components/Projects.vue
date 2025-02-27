<template>
  <section class="max-w-5xl mx-auto py-10">
    <h2 class="text-3xl font-bold text-white text-center mb-10">
      {{ $t("titles.projects") }} 🚀
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div
        v-for="(project, index) in displayedProjects"
        :key="index"
        class="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow flex flex-col justify-between"
      >
        <div>
          <h3 class="text-xl font-semibold text-blue-400">
            {{ project.title }}
          </h3>
          <p class="text-gray-300 mt-2">{{ project.description }}</p>
        </div>

        <!-- Boutons GitHub & Download -->
        <div class="mt-4 flex gap-4">
          <a
            v-if="project.github"
            :href="project.github"
            target="_blank"
            class="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6"
              fill="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.085 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.775.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.135-.303-.54-1.52.105-3.176 0 0 1.005-.322 3.3 1.23a11.508 11.508 0 0 1 3.005-.405c1.02.005 2.045.138 3.005.405 2.295-1.552 3.3-1.23 3.3-1.23.645 1.656.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.608-2.805 5.625-5.475 5.92.43.373.825 1.102.825 2.222v3.293c0 .317.21.693.825.577C20.565 22.095 24 17.598 24 12.297c0-6.627-5.373-12-12-12"
              />
            </svg>
          </a>

          <a
            v-if="project.download"
            :href="project.download"
            target="_blank"
            class="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center justify-center"
          >
            <svg
              class="w-6 h-6"
              fill="white"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 16l4-5h-3V4h-2v7H8l4 5zM5 19h14v2H5v-2z" />
            </svg>
          </a>
        </div>
      </div>

      <!-- Ajouter "More coming soon..." uniquement si le nombre de projets est impair -->
      <div
        v-if="jsonData?.projects && jsonData.projects.length % 2 !== 0"
        class="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center justify-center text-gray-400 text-lg"
      >
        More coming soon...
      </div>
    </div>
  </section>
</template>

<script setup>
import { inject, computed } from "vue";

const jsonData = inject("jsonData"); // Récupère les projets dynamiquement

// Vérification pour s'assurer que la mise en page reste propre (toujours un nombre pair de tuiles)
const displayedProjects = computed(() => {
  return jsonData?.value.projects || [];
});
</script>
