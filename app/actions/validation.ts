"use server";

import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-pal";

/** Valider le compte d'un stagiaire (ADMIN uniquement). */
export async function validateUserAccount(userId: string) {
  const auth = await requireAdmin();

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.role !== "STAGIAIRE") {
    throw new Error("Utilisateur ou rôle invalide.");
  }

  if (user.accountStatus === "ACTIVE") {
    throw new Error("Ce compte est déjà actif.");
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      accountStatus: "ACTIVE",
      validatedById: auth.id,
    },
  });

  return { ok: true };
}

/** Rejeter une demande de compte */
export async function rejectUserAccount(userId: string) {
  await requireAdmin();

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user || user.role !== "STAGIAIRE") {
    throw new Error("Utilisateur ou rôle invalide.");
  }

  await prisma.user.update({
    where: { id: userId },
    data: { accountStatus: "SUSPENDED" }, // ou "REJECTED" selon votre préférence
  });

  return { ok: true };
}