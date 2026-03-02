import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth-pal";
import {
  getDashboardStats,
  getRecentTasks,
  getRecentProjects,
} from "@/app/actions/dashboard";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const auth = await getAuthUser();

  if (!auth) {
    redirect("/sign-in");
  }

  if (auth.role !== "ADMIN") {
    redirect("/general-projects");
  }

  const [stats, recentTasks, recentProjects] = await Promise.all([
    getDashboardStats(),
    getRecentTasks(5),
    getRecentProjects(5),
  ]);

  return (
    <DashboardClient
      userName={auth.name}
      stats={stats}
      recentTasks={recentTasks}
      recentProjects={recentProjects}
    />
  );
}
