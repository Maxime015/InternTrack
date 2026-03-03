"use client";

import Link from "next/link";
import Wrapper from "../components/Wrapper";
import {
  Users,
  Shield,
  UserCircle,
  FolderGit2,
  ListTodo,
  Clock,
  ArrowRightLeft,
  Bell,
  PlusCircle,
  FileCheck,
  FolderOpen,
} from "lucide-react";
import type { DashboardStats } from "@/app/actions/dashboard";
import type { RecentTaskItem, RecentProjectItem } from "@/app/actions/dashboard";
import DashboardCharts from "./DashboardCharts";

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const statCards: Array<{
  key: keyof DashboardStats;
  title: string;
  valueLabel: (n: number) => string;
  subtitle: string;
  icon: React.ElementType;
  bgIcon: string;
}> = [
  {
    key: "totalUsers",
    title: "UTILISATEURS",
    valueLabel: (n) => `${n} total`,
    subtitle: "Comptes créés",
    icon: Users,
    bgIcon: "bg-warning/20 text-warning",
  },
  {
    key: "adminCount",
    title: "ADMINISTRATEURS",
    valueLabel: (n) => `${n} comptes`,
    subtitle: "Accès administration",
    icon: Shield,
    bgIcon: "bg-success/20 text-success",
  },
  {
    key: "stagiaireCount",
    title: "STAGIAIRES",
    valueLabel: (n) => `${n} comptes`,
    subtitle: "Comptes stagiaires",
    icon: UserCircle,
    bgIcon: "bg-info/20 text-info",
  },
  {
    key: "projectCount",
    title: "PROJETS",
    valueLabel: (n) => `${n} projets`,
    subtitle: "Projets créés",
    icon: FolderGit2,
    bgIcon: "bg-secondary/20 text-secondary",
  },
  {
    key: "taskCount",
    title: "TÂCHES",
    valueLabel: (n) => `${n} tâches`,
    subtitle: "Tâches au total",
    icon: ListTodo,
    bgIcon: "bg-accent/20 text-accent",
  },
  {
    key: "pendingValidations",
    title: "EN ATTENTE",
    valueLabel: (n) => `${n} demandes`,
    subtitle: "Validation de comptes",
    icon: Clock,
    bgIcon: "bg-warning/20 text-warning",
  },
];

const quickActions = [
  {
    href: "/workspace",
    label: "Créer un projet",
    subtitle: "Gérer et créer des projets",
    icon: FolderGit2,
    color: "text-warning",
  },
  {
    href: "/validation",
    label: "Validations",
    subtitle: "Valider les comptes stagiaires",
    icon: FileCheck,
    color: "text-success",
  },
  {
    href: "/general-projects",
    label: "Collaborations",
    subtitle: "Voir les projets partagés",
    icon: FolderOpen,
    color: "text-info",
  },
  {
    href: "/validation",
    label: "Notifications",
    subtitle: "Comptes en attente de validation",
    icon: Bell,
    color: "text-accent",
  },
];

interface DashboardClientProps {
  userName: string;
  stats: DashboardStats;
  recentTasks: RecentTaskItem[];
  recentProjects: RecentProjectItem[];
}

export default function DashboardClient({
  userName,
  stats,
  recentTasks,
  recentProjects,
}: DashboardClientProps) {
  return (
    <Wrapper>
      <div className="min-h-screen bg-base-200/50 rounded-xl -m-2 p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-base-content/70 mb-1">
            <Link href="/dashboard" className="hover:text-primary flex items-center gap-1">
              <span className="opacity-80">🏠</span>
              Dashboard
            </Link>
          </nav>
          <h1 className="text-2xl md:text-3xl font-bold text-base-content">
            Bonjour, {userName}
          </h1>
          <p className="text-base-content/70 mt-1">
            Voici votre vue d&apos;ensemble
          </p>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
          {statCards.map(({ key, title, valueLabel, subtitle, icon: Icon, bgIcon }) => (
            <div
              key={key}
              className="bg-base-100 rounded-2xl shadow-sm border border-base-300/50 p-5 relative overflow-hidden"
            >
              <div
                className={`absolute top-4 right-4 w-10 h-10 rounded-lg flex items-center justify-center ${bgIcon}`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-base-content/60 mb-1">
                {title}
              </p>
              <p className="text-2xl font-bold text-base-content">
                {valueLabel(stats[key] as number)}
              </p>
              <p className="text-sm text-base-content/60 mt-1">{subtitle}</p>
            </div>
          ))}
        </div>

        {/* Répartition des tâches (bonus) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300/50 p-5">
            <div className="flex items-center gap-2 text-base-content/70">
              <ListTodo className="w-5 h-5 text-info" />
              <span className="font-medium">À faire</span>
            </div>
            <p className="text-2xl font-bold text-base-content mt-2">
              {stats.tasksToDo}
            </p>
          </div>
          <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300/50 p-5">
            <div className="flex items-center gap-2 text-base-content/70">
              <ArrowRightLeft className="w-5 h-5 text-warning" />
              <span className="font-medium">En cours</span>
            </div>
            <p className="text-2xl font-bold text-base-content mt-2">
              {stats.tasksInProgress}
            </p>
          </div>
          <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300/50 p-5">
            <div className="flex items-center gap-2 text-base-content/70">
              <FileCheck className="w-5 h-5 text-success" />
              <span className="font-medium">Terminées</span>
            </div>
            <p className="text-2xl font-bold text-base-content mt-2">
              {stats.tasksDone}
            </p>
          </div>
        </div>

        <DashboardCharts stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Dernières tâches */}
          <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300/50 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-base-content">
                Dernières tâches
              </h2>
              <Link
                href="/workspace"
                className="text-warning hover:underline text-sm font-medium"
              >
                Voir tout
              </Link>
            </div>
            {recentTasks.length === 0 ? (
              <div className="text-center py-8 text-base-content/60">
                <ListTodo className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="font-medium">Aucune tâche récente</p>
                <Link
                  href="/workspace"
                  className="link link-warning mt-2 inline-block text-sm"
                >
                  Créer un projet et des tâches
                </Link>
              </div>
            ) : (
              <ul className="space-y-3">
                {recentTasks.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={`/task-details/${t.id}`}
                      className="block p-3 rounded-xl hover:bg-base-200 transition-colors"
                    >
                      <p className="font-medium text-base-content">{t.name}</p>
                      <p className="text-sm text-base-content/60 mt-0.5">
                        {t.projectName}
                        {t.assigneeName && ` • ${t.assigneeName}`}
                      </p>
                      <p className="text-xs text-base-content/50 mt-1">
                        {t.status} • {formatDate(t.createdAt)}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Derniers projets */}
          <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300/50 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-base-content">
                Derniers projets
              </h2>
              <Link
                href="/workspace"
                className="text-warning hover:underline text-sm font-medium"
              >
                Voir tout
              </Link>
            </div>
            {recentProjects.length === 0 ? (
              <div className="text-center py-8 text-base-content/60">
                <FolderGit2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="font-medium">Aucun projet récent</p>
                <Link
                  href="/workspace"
                  className="link link-warning mt-2 inline-block text-sm"
                >
                  Créer un projet
                </Link>
              </div>
            ) : (
              <ul className="space-y-3">
                {recentProjects.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/project/${p.id}`}
                      className="block p-3 rounded-xl hover:bg-base-200 transition-colors"
                    >
                      <p className="font-medium text-base-content">{p.name}</p>
                      <p className="text-sm text-base-content/60 mt-0.5">
                        {p.taskCount} tâche(s) • {p.creatorName}
                      </p>
                      <p className="text-xs text-base-content/50 mt-1">
                        {formatDate(p.createdAt)}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Actions rapides */}
        <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300/50 p-6 mb-8">
          <h2 className="text-lg font-bold text-base-content mb-4">
            Actions rapides
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map(({ href, label, subtitle, icon: Icon, color }) => (
              <Link
                key={href + label}
                href={href}
                className="flex items-start gap-4 p-4 rounded-xl border border-base-300/50 hover:bg-base-200 hover:border-primary/30 transition-all"
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center bg-base-200 ${color}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-base-content">{label}</p>
                  <p className="text-sm text-base-content/60">{subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Encart démarrage */}
        <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300/50 p-6 md:p-8">
          <h2 className="text-xl font-bold text-base-content mb-2">
            Tableau de bord InternTrack
          </h2>
          <p className="text-base-content/70 mb-6">
            Gérez les stagiaires, les projets et les tâches en un seul endroit.
            Validez les comptes, créez des projets et suivez l&apos;avancement.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/workspace" className="btn btn-primary">
              <PlusCircle className="w-4 h-4" />
              Créer un projet
            </Link>
            <Link href="/validation" className="btn btn-outline">
              <FileCheck className="w-4 h-4" />
              Valider les comptes
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
