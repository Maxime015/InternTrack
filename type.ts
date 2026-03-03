import type {
  Project as PrismaProject,
  Task as PrismaTask,
  User as PrismaUser,
  Role,
  AccountStatus,
  ProjectUser as PrismaProjectUser,
} from "@prisma/client";

export type { Role, AccountStatus };

// ==============================
// USER
// ==============================
export type User = PrismaUser & {
  tasks?: Task[];
  createdTasks?: Task[];
  projects?: Project[];
  validatedBy?: User | null;
  validatedUsers?: User[];
};

// ==============================
// PROJECT
// ==============================
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
};

// ==============================
// TASK
// ==============================
export type Task = PrismaTask & {
  user?: User | null;
  createdBy?: User | null;
  project?: Project;
};

// ==============================
// PROJECT USER (pivot table)
// ==============================
export type ProjectUser = PrismaProjectUser & {
  user?: User;
  project?: Project;
};