"use client"

import { UserButton, useUser } from "@clerk/nextjs"
import { Codesandbox, Menu, X, Handshake, FileCheck, FolderGit2 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useEffect, useState } from "react"
import { checkAndAddUser } from "../actions"
import { getAuthUser } from "@/lib/auth-pal"
import Image from "next/image"

const Navbar = () => {
  const { user, isLoaded } = useUser()
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const [role, setRole] = useState<"ADMIN" | "STAGIAIRE" | null>(null)

  // 1. On définit les liens de base communs à tout le monde
  const baseNavLinks = [
    { href: "/general-projects", label: "Collaborations", icon: Handshake },
  ]

  // 2. On construit la navigation dynamiquement selon le rôle
  const navLinks = [
    ...baseNavLinks,
    // Seuls les ADMINS voient les "Projets" et les "Validations"
    ...(role === "ADMIN"
      ? [
          { href: "/workspace", label: "Projets", icon: FolderGit2 },
          { href: "/validation", label: "Validations", icon: FileCheck },
        ]
      : []),
    // Si vous voulez que le stagiaire voit SES projets mais pas l'onglet général, 
    // vous pouvez ajouter une condition spécifique ici.
  ]

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress && user?.fullName) {
      checkAndAddUser(
        user.primaryEmailAddress.emailAddress,
        user.fullName
      )
    }
  }, [user])

  useEffect(() => {
    if (!user) {
      setRole(null)
      return
    }
    getAuthUser()
      .then((auth) => {
        if (auth?.role === "ADMIN" || auth?.role === "STAGIAIRE") {
          setRole(auth.role)
        } else {
          setRole(null)
        }
      })
      .catch(() => setRole(null))
  }, [user])

  if (!isLoaded) return null

  const isActiveLink = (href: string) =>
    pathname.replace(/\/$/, "") === href.replace(/\/$/, "")

  const renderLinks = (classNames: string) =>
    navLinks.map(({ href, label, icon: Icon }) => (
      <Link
        key={href}
        href={href}
        className={`btn-sm ${classNames} gap-1 ${
          isActiveLink(href) ? "btn-primary" : ""
        }`}
        onClick={() => setMenuOpen(false)} // Ferme le menu mobile au clic
      >
        {Icon && <Icon className="w-4 h-4" />}
        {label}
      </Link>
    ))

  return (
    <div className="border-b border-base-300 px-5 md:px-[10%] py-4 relative">

      <div className="flex justify-between items-center">
        
        {/* Logo + Brand */}
        <div className="flex items-center gap-4">
          <Image
            src="/bg-port.png"   // ⚠ Mets ici ton vrai fichier logo
            alt="Logo Port Autonome"
            width={55}
            height={55}
            priority
          />

          <div className="bg-primary text-primary-content rounded-box p-1.5">
            <Codesandbox className="w-7 h-7" />
          </div>

          <span className="font-bold text-2xl md:text-3xl">
            Intern<span className="text-primary">Track</span>
          </span>
        </div>

        {/* Mobile Button */}
        <button
          className="btn w-fit btn-sm sm:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-4" /> : <Menu className="w-4" />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex space-x-4 items-center">
          {user ? (
            <>
              {renderLinks("btn")}
              <UserButton />
            </>
          ) : (
            <>
              <Link href="/sign-in" className="btn btn-outline btn-sm">
                Se connecter
              </Link>
              <Link href="/sign-up" className="btn btn-primary btn-sm">
                S'inscrire
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 w-full h-screen flex flex-col gap-4 p-6 transition-all duration-300 sm:hidden bg-white z-50 ${
          menuOpen ? "left-0" : "-left-full"
        }`}
      >
        <div className="flex justify-between items-center">
          {user && <UserButton />}
          <button
            className="btn w-fit btn-sm"
            onClick={() => setMenuOpen(false)}
          >
            <X className="w-4" />
          </button>
        </div>

        {user ? (
          renderLinks("btn")
        ) : (
          <>
            <Link
              href="/sign-in"
              className="btn btn-outline"
              onClick={() => setMenuOpen(false)}
            >
              Se connecter
            </Link>
            <Link
              href="/sign-up"
              className="btn btn-primary"
              onClick={() => setMenuOpen(false)}
            >
              S'inscrire
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar