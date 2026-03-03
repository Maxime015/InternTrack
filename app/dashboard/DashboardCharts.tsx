"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import type { DashboardStats } from "@/app/actions/dashboard";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
};

interface DashboardChartsProps {
  stats: DashboardStats;
}

export default function DashboardCharts({ stats }: DashboardChartsProps) {
  const taskStatusData = {
    labels: ["À faire", "En cours", "Terminées"],
    datasets: [
      {
        data: [stats.tasksToDo, stats.tasksInProgress, stats.tasksDone],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)",   // info / To Do
          "rgba(234, 179, 8, 0.8)",    // warning / In Progress
          "rgba(22, 163, 74, 0.8)",    // success / Done
        ],
        borderColor: [
          "rgb(34, 197, 94)",
          "rgb(234, 179, 8)",
          "rgb(22, 163, 74)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const userRoleData = {
    labels: ["Administrateurs", "Stagiaires"],
    datasets: [
      {
        data: [stats.adminCount, stats.stagiaireCount],
        backgroundColor: [
          "rgba(22, 163, 74, 0.8)",   // success
          "rgba(59, 130, 246, 0.8)",  // info
        ],
        borderColor: ["rgb(22, 163, 74)", "rgb(59, 130, 246)"],
        borderWidth: 2,
      },
    ],
  };

  const overviewBarData = {
    labels: ["Utilisateurs", "Projets", "Tâches", "En attente"],
    datasets: [
      {
        label: "Nombre",
        data: [
          stats.totalUsers,
          stats.projectCount,
          stats.taskCount,
          stats.pendingValidations,
        ],
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(234, 179, 8, 0.8)",
        ],
        borderColor: [
          "rgb(99, 102, 241)",
          "rgb(168, 85, 247)",
          "rgb(236, 72, 153)",
          "rgb(234, 179, 8)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const barOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300/50 p-6">
        <h3 className="text-lg font-bold text-base-content mb-4">
          Répartition des tâches
        </h3>
        <div className="h-64 flex items-center justify-center">
          <Doughnut
            data={taskStatusData}
            options={chartOptions}
          />
        </div>
      </div>
      <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300/50 p-6">
        <h3 className="text-lg font-bold text-base-content mb-4">
          Répartition des utilisateurs
        </h3>
        <div className="h-64 flex items-center justify-center">
          <Doughnut
            data={userRoleData}
            options={chartOptions}
          />
        </div>
      </div>
      <div className="bg-base-100 rounded-2xl shadow-sm border border-base-300/50 p-6 lg:col-span-1">
        <h3 className="text-lg font-bold text-base-content mb-4">
          Vue d&apos;ensemble
        </h3>
        <div className="h-64">
          <Bar data={overviewBarData} options={barOptions} />
        </div>
      </div>
    </div>
  );
}
