<template>
  <section class="max-w-5xl mx-auto py-10 flex justify-center">
    <button
      @click="generatePDF"
      class="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg transition"
    >
      {{ $t("downloadCV") }}
    </button>
  </section>
</template>
<script setup>
import { inject } from "vue";
import { useI18n } from "vue-i18n";
import jsPDF from "jspdf";

const { t } = useI18n();
const jsonData = inject("jsonData"); // Récupère les données dynamiquement

// Fonction pour gérer le saut de page si le contenu dépasse
const checkPageOverflow = (doc, yOffset) => {
  if (yOffset > 270) {
    // 270 est la limite avant qu'on dépasse la page
    doc.addPage();
    return 20; // Reprendre le texte en haut de la nouvelle page
  }
  return yOffset;
};

// Fonction pour générer le PDF
const generatePDF = () => {
  if (!jsonData.value) return;

  const doc = new jsPDF();

  // Titre du CV
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(jsonData.value.contact.name, 105, 20, { align: "center" });

  // Infos de contact
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Email: ${jsonData.value.contact.email}`, 20, 40);
  doc.text(`${t("phone")}: ${jsonData.value.contact.phone}`, 20, 50);
  doc.text(`LinkedIn: ${jsonData.value.contact.linkedin}`, 20, 60);
  doc.text(`GitHub: ${jsonData.value.contact.github}`, 20, 70);

  // Expériences professionnelles
  let yOffset = 90;
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(t("titles.experience"), 20, yOffset);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  jsonData.value.experiences.forEach((exp) => {
    yOffset += 10;
    yOffset = checkPageOverflow(doc, yOffset); // Vérifie si on doit passer à la page suivante
    doc.text(`${exp.period} - ${exp.title}`, 20, yOffset);

    yOffset += 7;
    yOffset = checkPageOverflow(doc, yOffset);
    doc.text(exp.description, 20, yOffset, { maxWidth: 170 });

    yOffset += 15;
  });

  // Formations
  yOffset += 10;
  yOffset = checkPageOverflow(doc, yOffset);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(t("titles.education"), 20, yOffset);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  jsonData.value.formations.forEach((formation) => {
    yOffset += 10;
    yOffset = checkPageOverflow(doc, yOffset);
    doc.text(`${formation.period} - ${formation.diploma}`, 20, yOffset);

    yOffset += 7;
    yOffset = checkPageOverflow(doc, yOffset);
    doc.text(formation.school, 20, yOffset);

    yOffset += 10;
  });

  // Projets
  yOffset += 10;
  yOffset = checkPageOverflow(doc, yOffset);
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(t("titles.projects"), 20, yOffset);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");

  jsonData.value.projects.forEach((project) => {
    yOffset += 10;
    yOffset = checkPageOverflow(doc, yOffset);
    doc.text(project.title, 20, yOffset);

    yOffset += 7;
    yOffset = checkPageOverflow(doc, yOffset);
    doc.text(project.description, 20, yOffset, { maxWidth: 170 });

    yOffset += 10;
  });

  // Télécharger le PDF
  doc.save(`CV_${jsonData.value.contact.name}.pdf`);
};
</script>
