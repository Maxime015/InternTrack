"use client";

import Link from "next/link";
import Navbar from "./components/Navbar";
import ProjectComponent from "./components/ProjectComponent";
import projects from "./data";
import { AnimatedOrb } from "./components/AnimatedOrb";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white to-blue-50">

      <Navbar />

      {/* ===== BACKGROUND ORBS ===== */}
      <div className="absolute inset-0 pointer-events-none z-0">

        <AnimatedOrb
          colors={["#4FA3D1", "#6EC6FF", "#1E90FF"]}
          size={420}
          initialX="10%"
          initialY="15%"
          duration={4500}
          blur={70}
          opacity={0.95}
        />

        <AnimatedOrb
          colors={["#4FA3D1", "#00BFFF", "#87CEFA"]}
          size={360}
          initialX="70%"
          initialY="10%"
          duration={5000}
          blur={80}
          opacity={0.85}
        />

        <AnimatedOrb
          colors={["#1E90FF", "#4FA3D1", "#BFE9FF"]}
          size={320}
          initialX="45%"
          initialY="70%"
          duration={4800}
          blur={65}
          opacity={0.85}
        />

      </div>

      {/* ===== CONTENU ===== */}
      <div className="relative z-10 flex flex-col items-center py-10 px-4">
        <div className="w-full max-w-[1300px] text-center">

          <h1 className="text-4xl md:text-5xl font-bold">
            Gestion, suivi et traçabilité <br /> des projets et tâches des stagiaires
          </h1>

          <p className="py-6 text-gray-700">
            Port Autonome de Lomé (PAL) – Suivi des activités, rapports journaliers
            et validation hiérarchique en un seul outil.
          </p>

          <div className="flex justify-center">
            <Link
              href="/sign-in"
              className="btn btn-outline btn-primary"
            >
              Se connecter
            </Link>

            <Link
              href="/sign-up"
              className="btn btn-primary ml-2"
            >
              S'inscrire
            </Link>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 gap-10 w-full">
            {projects.map((project) => (
              <li key={project.id} className="flex h-full">
                <div className="w-full h-full transition-all duration-300 hover:scale-[1.02]">
                  <ProjectComponent
                    project={project}
                    admin={0}
                    style={true}
                    enableHover={1}
                  />
                </div>
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
}