import type {
  Project as PrismaProject,
  Task as PrismaTask,
  User as PrismaUser,
  Stagiaire as PrismaStagiaire,
  RapportJournalier as PrismaRapport,
  Department,
  Service,
  Division,
  Section,
} from "@prisma/client";

export type { Role, AccountStatus, StatutRapport } from "@prisma/client";

// Utilisateur avec profil optionnel stagiaire
export type User = PrismaUser & {
  stagiaireProfile?: PrismaStagiaire | null;
};

// Fusion du type PrismaProject avec propriétés calculées
export type Project = PrismaProject & {
  totalTasks?: number;
  collaboratorsCount?: number;
  taskStats?: {
    toDo: number;
    inProgress: number;
    done: number;
  };
  percentages?: {
    progressPercentage: number;
    inProgressPercentage: number;
    toDoPercentage: number;
  };
  tasks?: Task[];
  users?: User[];
  createdBy?: User;
  section?: Section | null;
};

export type Task = PrismaTask & {
  user?: User | null;
  createdBy?: User | null;
  stagiaire?: PrismaStagiaire | null;
};

export type Stagiaire = PrismaStagiaire & {
  user?: User;
  section?: Section;
  encadreur?: User | null;
};

export type RapportJournalier = PrismaRapport & {
  stagiaire?: Stagiaire;
  validePar?: User | null;
};

export type { Department, Service, Division, Section };

export type OrganigrammeNode = {
  id: string;
  name: string;
  code?: string | null;
  type: "department" | "service" | "division" | "section";
  children?: OrganigrammeNode[];
  responsible?: User | null;
  sectionId?: string; // pour lien direct section
};
