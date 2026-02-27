import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth-pal";
import { getUsersPendingValidation } from "./../actions/stagiaires";
import ValidationClient from "./ValidationClient";

export default async function ValidationPage() {
    // 1. Vérification de sécurité côté serveur
    const auth = await getAuthUser();

    // Redirection si non connecté
    if (!auth) {
        redirect("/sign-in");
    }

    // Redirection immédiate si l'utilisateur est un STAGIAIRE
    if (auth.role === "STAGIAIRE") {
        redirect("/general-projects");
    }

    // 2. Récupération des données initiales
    const initialUsers = await getUsersPendingValidation();

    return <ValidationClient initialUsers={initialUsers} />;
}