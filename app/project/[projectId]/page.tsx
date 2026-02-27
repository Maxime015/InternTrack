import { deleteTaskById, getProjectInfo } from '@/app/actions';
import ProjectComponent from '@/app/components/ProjectComponent';
import UserInfo from '@/app/components/UserInfo';
import Wrapper from '@/app/components/Wrapper'
import { getAuthUser } from '@/lib/auth-pal'; // Import de votre utilitaire de session
import { redirect } from 'next/navigation';
import ProjectDetailsClient from './ProjectDetailsClient';
// La page est désormais un Server Component par défaut (pas de "use client")
const Page = async ({ params }: { params: Promise<{ projectId: string }> }) => {
    
    // 1. Récupération de l'utilisateur et de son rôle côté serveur
    const auth = await getAuthUser();
    
    if (!auth) {
        redirect("/sign-in");
    }

    const resolvedParams = await params;
    const projectId = resolvedParams.projectId;

    // 2. Récupération des données du projet
    let project = null;
    try {
        project = await getProjectInfo(projectId, true);
    } catch (error) {
        console.error('Erreur lors du chargement du projet:', error);
    }

    // 3. Détermination des permissions
    // Le bouton ne sera pas affiché si le rôle est STAGIAIRE
    const showNewTaskButton = auth.role !== "STAGIAIRE";

    return (
        <Wrapper>
            <div className='md:flex md:flex-row flex-col'>
                {/* Sidebar : Infos créateur et Projet */}
                <div className='md:w-1/4'>
                    <div className='p-5 border border-base-300 rounded-xl mb-6'>
                        <UserInfo
                            role="Créé par"
                            email={project?.createdBy?.email || null}
                            name={project?.createdBy?.name || null}
                        />
                    </div>

                    <div className='w-full'>
                        {project && (
                            <ProjectComponent project={project} admin={0} style={false} />
                        )}
                    </div>
                </div>

                {/* Main : Liste des tâches avec logique Client */}
                <div className='mt-6 md:ml-6 md:mt-0 md:w-3/4 '>
                    <ProjectDetailsClient 
                        project={project} 
                        projectId={projectId} 
                        email={auth.email}
                        showNewTaskButton={showNewTaskButton} 
                    />
                </div>
            </div>
        </Wrapper>
    );
}

export default Page;