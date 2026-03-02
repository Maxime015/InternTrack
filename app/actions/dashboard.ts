"use server";

import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-pal";

export type DashboardStats = {
  totalUsers: number;
  adminCount: number;
  stagiaireCount: number;
  projectCount: number;
  taskCount: number;
  pendingValidations: number;
  tasksToDo: number;
  tasksInProgress: number;
  tasksDone: number;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  await requireAdmin();

  const [
    totalUsers,
    adminCount,
    stagiaireCount,
    projectCount,
    taskCount,
    pendingValidations,
    tasksToDo,
    tasksInProgress,
    tasksDone,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { role: "ADMIN" } }),
    prisma.user.count({ where: { role: "STAGIAIRE" } }),
    prisma.project.count(),
    prisma.task.count(),
    prisma.user.count({
      where: { role: "STAGIAIRE", accountStatus: "PENDING" },
    }),
    prisma.task.count({ where: { status: "To Do" } }),
    prisma.task.count({ where: { status: "In Progress" } }),
    prisma.task.count({ where: { status: "Done" } }),
  ]);

  return {
    totalUsers,
    adminCount,
    stagiaireCount,
    projectCount,
    taskCount,
    pendingValidations,
    tasksToDo,
    tasksInProgress,
    tasksDone,
  };
}

export type RecentTaskItem = {
  id: string;
  name: string;
  status: string;
  dueDate: Date | null;
  projectName: string;
  assigneeName: string | null;
  createdAt: Date;
};

export async function getRecentTasks(limit = 5): Promise<RecentTaskItem[]> {
  await requireAdmin();

  const tasks = await prisma.task.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      project: { select: { name: true } },
      user: { select: { name: true } },
    },
  });

  return tasks.map((t) => ({
    id: t.id,
    name: t.name,
    status: t.status,
    dueDate: t.dueDate,
    projectName: t.project.name,
    assigneeName: t.user?.name ?? null,
    createdAt: t.createdAt,
  }));
}

export type RecentProjectItem = {
  id: string;
  name: string;
  createdAt: Date;
  taskCount: number;
  creatorName: string;
};

export async function getRecentProjects(limit = 5): Promise<RecentProjectItem[]> {
  await requireAdmin();

  const projects = await prisma.project.findMany({
    take: limit,
    orderBy: { createdAt: "desc" },
    include: {
      createdBy: { select: { name: true } },
      _count: { select: { tasks: true } },
    },
  });

  return projects.map((p) => ({
    id: p.id,
    name: p.name,
    createdAt: p.createdAt,
    taskCount: p._count.tasks,
    creatorName: p.createdBy.name,
  }));
}
