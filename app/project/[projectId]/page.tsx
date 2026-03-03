import { deleteTaskById, getProjectInfo } from '@/app/actions';
import ProjectComponent from '@/app/components/ProjectComponent';
import UserInfo from '@/app/components/UserInfo';
import Wrapper from '@/app/components/Wrapper'
import { getAuthUser } from '@/lib/auth-pal'; 
import { redirect } from 'next/navigation';
import ProjectDetailsClient from './ProjectDetailsClient';
import { Project, User, Task } from '@prisma/client';

// Définition du type étendu pour inclure les relations demandées dans getProjectInfo
type ProjectWithDetails = Project & {
    createdBy: User;
    tasks: (Task & { 
        user: User | null; 
        createdBy: User 
    })[];
    users: { 
        user: { 
            id: string; 
            name: string; 
            email: string 
        } 
    }[];
};

const Page = async ({ params }: { params: Promise<{ projectId: string }> }) => {
    
    // 1. Récupération de l'utilisateur et de son rôle côté serveur
    const auth = await getAuthUser();
    
    if (!auth) {
        redirect("/sign-in");
    }

    const resolvedParams = await params;
    const projectId = resolvedParams.projectId;

    // 2. Récupération des données du projet avec typage explicite
    let project: ProjectWithDetails | null = null;
    try {
        // On utilise "as any" ou le type personnalisé pour informer TS que les relations sont incluses
        project = await getProjectInfo(projectId, true) as unknown as ProjectWithDetails;
    } catch (error) {
        console.error('Erreur lors du chargement du projet:', error);
    }

    // 3. Détermination des permissions
    const showNewTaskButton = auth.role !== "STAGIAIRE";

    return (
        <Wrapper>
            <div className='md:flex md:flex-row flex-col'>
                {/* Sidebar : Infos créateur et Projet */}
                <div className='md:w-1/4'>
                    <div className='p-5 border border-base-300 rounded-xl mb-6'>
                        {/* L'erreur TS sur 'createdBy' est maintenant résolue grâce au type ProjectWithDetails */}
                        <UserInfo
                            role="Créé par"
                            email={project?.createdBy?.email || null}
                            name={project?.createdBy?.name || null}
                        />
                    </div>

                    <div className='w-full'>
                        {project && (
                            <ProjectComponent
                                project={{
                                    ...project,
                                    users: project.users.map(u => ({
                                        ...u.user,
                                        role: (u.user as User).role,
                                        accountStatus: (u.user as User).accountStatus,
                                        validatedById: (u.user as User).validatedById
                                    }))
                                }}
                                admin={0}
                                style={false}
                            />
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