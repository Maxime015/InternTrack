"use server";

import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import type { Role } from "@prisma/client";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: Role;
  accountStatus: string;
};

/**
 * Récupère l'utilisateur courant (Clerk) et son profil DB.
 * Crée l'entrée User en DB si nécessaire (inscription = STAGIAIRE, PENDING).
 */
export async function getAuthUser(): Promise<AuthUser | null> {
  const clerkUser = await currentUser();
  if (!clerkUser?.primaryEmailAddress?.emailAddress) return null;

  const email = clerkUser.primaryEmailAddress.emailAddress;
  const name =
    clerkUser.firstName && clerkUser.lastName
      ? `${clerkUser.firstName} ${clerkUser.lastName}`
      : clerkUser.emailAddresses[0]?.emailAddress ?? email;

  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name,
        role: "STAGIAIRE",
        accountStatus: "PENDING",
      },
    });
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    accountStatus: user.accountStatus,
  };
}

export async function isAdmin(auth: AuthUser | null): Promise<boolean> {
  return auth?.role === "ADMIN";
}

export async function isStagiaire(auth: AuthUser | null): Promise<boolean> {
  return auth?.role === "STAGIAIRE";
}

/** Compte actif (validé) uniquement. */
export async function canAccessApp(auth: AuthUser | null): Promise<boolean> {
  if (!auth) return false;
  return auth.accountStatus === "ACTIVE" || auth.role === "ADMIN";
}

/** Seuls les comptes ACTIVE ou ADMIN peuvent utiliser l'application */
export async function requireAuth(): Promise<AuthUser> {
  const auth = await getAuthUser();
  if (!auth) throw new Error("Non authentifié");

  if (!(await canAccessApp(auth)))
    throw new Error(
      "Votre compte est en attente de validation par l'administration."
    );

  return auth;
}

export async function requireAdmin(): Promise<AuthUser> {
  const auth = await requireAuth();
  if (auth.role !== "ADMIN")
    throw new Error("Accès réservé à l'administration.");
  return auth;
}