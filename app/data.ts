import { Project } from "@/type";

// Nous utilisons "as unknown as Project[]" pour simuler la base de données 
// sans devoir remplir tous les champs stricts requis par Prisma.
const projects = [
  {
    id: "../sign-in?ref=1",
    name: "Application de gestion et de traçabilité des stagiaires",
    description: "Plateforme interne pour le suivi des missions et de l'évolution des stagiaires.",
    inviteCode: "STAG26",
    // 5 collaborateurs
    users: [{ id: "u1" }, { id: "u2" }, { id: "u3" }, { id: "u4" }, { id: "u5" }],
    tasks: [
      // 5 À faire (38%)
      { id: "t1", status: "To Do" }, { id: "t2", status: "To Do" }, { id: "t3", status: "To Do" }, { id: "t4", status: "To Do" }, { id: "t5", status: "To Do" },
      // 4 En cours (31%)
      { id: "t6", status: "In Progress" }, { id: "t7", status: "In Progress" }, { id: "t8", status: "In Progress" }, { id: "t9", status: "In Progress" },
      // 4 Terminées (31%)
      { id: "t10", status: "Done" }, { id: "t11", status: "Done" }, { id: "t12", status: "Done" }, { id: "t13", status: "Done" },
    ],
  },
  {
    id: "../sign-in?ref=2",
    name: "Refonte du site vitrine",
    description: "Modernisation de l'interface et intégration du nouveau branding.",
    inviteCode: "WEB2026",
    users: [{ id: "u1" }, { id: "u2" }], // 2 collaborateurs
    tasks: [
      { id: "t14", status: "To Do" }, { id: "t15", status: "To Do" },
      { id: "t16", status: "In Progress" },
      { id: "t17", status: "Done" }, { id: "t18", status: "Done" }, { id: "t19", status: "Done" }, { id: "t20", status: "Done" },
    ],
  },
  {
    id: "../sign-in?ref=3",
    name: "Déploiement de l'API Mobile",
    description: "Création des endpoints sécurisés pour la nouvelle application mobile.",
    inviteCode: "API999",
    users: [{ id: "u3" }, { id: "u4" }, { id: "u5" }], // 3 collaborateurs
    tasks: [
      { id: "t21", status: "To Do" }, { id: "t32", status: "To Do" }, { id: "t33", status: "To Do" }, { id: "t34", status: "To Do" }, { id: "t35", status: "To Do" }, { id: "t36", status: "To Do" }, { id: "t37", status: "To Do" }, { id: "t38", status: "To Do" }, { id: "t39", status: "To Do" },
      { id: "t27", status: "In Progress" }, { id: "t28", status: "In Progress" }, { id: "t29", status: "In Progress" }, { id: "t30", status: "In Progress" },
      { id: "t22", status: "Done" }, { id: "t23", status: "Done" }, { id: "t24", status: "Done" }, { id: "t25", status: "Done" }, { id: "t26", status: "Done" }, { id: "t31", status: "Done" },
    ],
  },
] as unknown as Project[];

export default projects;