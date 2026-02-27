"use server";

import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-pal";

export async function getUsersPendingValidation() {
  await requireAdmin(); // Seul un admin peut lister les demandes

  const users = await prisma.user.findMany({
    where: {
      role: "STAGIAIRE",
      accountStatus: "PENDING",
    },
    orderBy: { name: "asc" },
  });

  return users;
}