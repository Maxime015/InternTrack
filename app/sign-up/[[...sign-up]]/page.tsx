"use client";

import { SignUp } from "@clerk/nextjs";
import { Codesandbox } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedOrb } from "../../components/AnimatedOrb";

export default function Page() {
  return (
    <section className="min-h-screen overflow-hidden relative bg-gradient-to-b from-white via-blue-50 to-blue-100">

      <div className="grid md:grid-cols-1 lg:grid-cols-12 min-h-screen relative z-10">

        {/* ================= IMAGE GAUCHE ================= */}
        <section className="relative h-64 md:h-80 lg:h-auto lg:col-span-5 xl:col-span-6 overflow-hidden">

                <div className="absolute top-6 left-8 z-50 md:hidden lg:block">
                  <Image
                    src="/bg-port.png"
                    alt="Logo Port Autonome"
                    width={100}
                    height={100}
                    priority
                  />
                </div>

          <Image
            src="/6979f68c1e26a_port-de-lome-une-region-dynamique.jpg"
            alt="Port Autonome de Lomé"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />

          {/* overlay léger */}
          <div className="absolute inset-0 bg-blue-900/30" />

          {/* Branding Desktop */}
          <div className="absolute inset-0 z-10 hidden md:flex flex-col justify-end p-12 text-white">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md border border-white/20">
                <Codesandbox className="w-8 h-8 text-[#4FA3D1]" />
              </div>

              <span className="text-2xl font-bold tracking-wide">
                Intern<span className="text-[#4FA3D1]">Track</span>
              </span>
            </Link>

            <h2 className="text-3xl md:text-5xl font-bold leading-tight max-w-lg">
              Créez votre compte et rejoignez-nous
            </h2>

            <p className="mt-4 text-white/80 text-lg max-w-md">
              Plateforme moderne de gestion et de traçabilité des stagiaires.
              Centralisez les informations et optimisez votre organisation.
            </p>
          </div>
        </section>

        {/* ================= SECTION AUTH ================= */}
        <main className="relative flex items-center justify-center px-6 py-12 lg:col-span-7 xl:col-span-6">

          {/* ===== ORBES ANIMÉES ===== */}
          <div className="absolute inset-0 -z-10 pointer-events-none">

            <AnimatedOrb
              colors={["#4FA3D1", "#6EC6FF", "#1E90FF"]}
              size={520}
              initialX="0%"
              initialY="10%"
              duration={2200}
              blur={50}
              opacity={1}
            />

            <AnimatedOrb
              colors={["#00BFFF", "#4FA3D1"]}
              size={420}
              initialX="60%"
              initialY="40%"
              duration={2000}
              blur={45}
              opacity={0.95}
            />

            <AnimatedOrb
              colors={["#87CEFA", "#4FA3D1"]}
              size={340}
              initialX="25%"
              initialY="75%"
              duration={1800}
              blur={40}
              opacity={0.9}
            />

            {/* voile lumineux léger */}
            <div className="absolute inset-0 backdrop-blur-[45px] bg-white/20" />
          </div>

          {/* ================= FORMULAIRE ================= */}
          <div className="w-full max-w-md z-20">

            {/* Logo mobile */}
            <div className="mb-10 md:hidden flex justify-center">
              <Link href="/" className="flex items-center gap-3">
                <div className="bg-[#4FA3D1] text-white p-2 rounded-xl">
                  <Codesandbox className="w-7 h-7" />
                </div>

                <span className="text-2xl font-bold text-gray-800">
                  Intern<span className="text-[#4FA3D1]">Track</span>
                </span>
              </Link>
            </div>

            <SignUp
              appearance={{
                elements: {
                  rootBox: "w-full",

                  /* GLASS CARD CLAIRE */
                  card:
                    "bg-white/70 backdrop-blur-xl border border-white/40 shadow-2xl rounded-2xl p-4",

                  headerTitle: "text-gray-900 text-2xl font-bold",
                  headerSubtitle: "text-gray-600",

                  socialButtonsBlockButton:
                    "bg-white border-gray-200 hover:bg-blue-50 transition-all text-gray-800",

                  socialButtonsBlockButtonText: "text-gray-800 font-medium",

                  dividerLine: "bg-gray-200",
                  dividerText: "text-gray-400",

                  formLabelRow: "mb-1",
                  formFieldLabel: "text-gray-700 font-medium",

                  formFieldInput:
                    "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-[#4FA3D1] focus:ring-1 focus:ring-[#4FA3D1] rounded-lg transition-all",

                  formButtonPrimary:
                    "bg-[#4FA3D1] hover:bg-[#3d8db8] text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-[#4FA3D1]/30",

                  footerActionText: "text-gray-700 font-medium",
                  footerActionLink:
                    "text-[#4FA3D1] hover:text-[#2f8fc2] font-bold transition-colors ml-1",
                },
              }}
            />
          </div>
        </main>
      </div>
    </section>
  );
}