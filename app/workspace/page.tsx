import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth-pal";
import { getProjectsCreatedByUser } from '@/app/actions';
import WorkspaceClient from "./WorkspaceClient"

export default async function WorkspacePage() {
  // 1. Vérification de l'authentification et du rôle côté serveur
  const auth = await getAuthUser();

  // Si l'utilisateur n'est pas connecté
  if (!auth) {
    redirect("/sign-in");
  }

  // Empêcher les stagiaires d'accéder au workspace et rediriger
  if (auth.role === "STAGIAIRE") {
    redirect("/general-projects");
  }

  // 2. Récupération initiale des projets (plus performant en Server Component)
  const initialProjects = await getProjectsCreatedByUser(auth.email);

  // On passe les données au composant client pour l'interactivité
  return (
    <WorkspaceClient 
      initialProjects={initialProjects} 
      userEmail={auth.email} 
    />
  );
}