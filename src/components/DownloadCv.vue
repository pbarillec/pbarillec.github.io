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

const MARGIN_X = 20;
const MARGIN_TOP = 20;
const PAGE_BOTTOM = 280; // Limite basse avant de passer à la page suivante
const TEXT_WIDTH = 170;
const LINE_HEIGHT = 6;

// Les polices standard de jsPDF ne gèrent pas les emojis ni les espaces
// insécables fines : on les nettoie pour éviter les caractères parasites.
const clean = (text) =>
  String(text ?? "")
    .replace(/[  ]/g, " ")
    .replace(/[\u{1F000}-\u{1FFFF}☀-➿️‍]/gu, "")
    .trim();

// Écrit un texte en le découpant en lignes, avec saut de page ligne par ligne.
// Retourne la position verticale suivante.
const writeText = (doc, text, y) => {
  const lines = doc.splitTextToSize(clean(text), TEXT_WIDTH);
  for (const line of lines) {
    if (y > PAGE_BOTTOM) {
      doc.addPage();
      y = MARGIN_TOP;
    }
    doc.text(line, MARGIN_X, y);
    y += LINE_HEIGHT;
  }
  return y;
};

const writeSectionTitle = (doc, title, y) => {
  if (y > PAGE_BOTTOM - 20) {
    doc.addPage();
    y = MARGIN_TOP;
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  y = writeText(doc, title, y);
  doc.setFontSize(12);
  return y + 2;
};

// Écrit un bloc : un titre en gras, puis un texte optionnel
const writeEntry = (doc, heading, body, y) => {
  doc.setFont("helvetica", "bold");
  y = writeText(doc, heading, y);
  doc.setFont("helvetica", "normal");
  if (body) y = writeText(doc, body, y);
  return y + 4;
};

// Fonction pour générer le PDF
const generatePDF = () => {
  if (!jsonData.value) return;

  const { contact, experiences, formations, projects } = jsonData.value;
  const doc = new jsPDF();

  // Titre du CV
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(contact.name, 105, 20, { align: "center" });

  // Infos de contact
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Email: ${contact.email}`, MARGIN_X, 40);
  doc.text(`${t("phone")}: ${contact.phone}`, MARGIN_X, 50);
  doc.text(`LinkedIn: ${contact.linkedin}`, MARGIN_X, 60);
  doc.text(`GitHub: ${contact.github}`, MARGIN_X, 70);

  let y = 90;

  // Expériences professionnelles
  y = writeSectionTitle(doc, t("titles.experience"), y);
  experiences.forEach((exp) => {
    const heading = `${exp.period} - ${exp.title}${exp.company ? ` (${exp.company})` : ""}`;
    y = writeEntry(doc, heading, exp.description, y);
  });

  // Formations
  y = writeSectionTitle(doc, t("titles.education"), y + 6);
  formations.forEach((formation) => {
    y = writeEntry(
      doc,
      `${formation.period} - ${formation.diploma}`,
      formation.school,
      y,
    );
  });

  // Projets
  y = writeSectionTitle(doc, t("titles.projects"), y + 6);
  projects.forEach((project) => {
    y = writeEntry(doc, project.title, project.description, y);
  });

  // Télécharger le PDF
  doc.save(`CV_${contact.name}.pdf`);
};
</script>
