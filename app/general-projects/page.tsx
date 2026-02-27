"use client"
import React, { useEffect, useState } from 'react'
import Wrapper from '../components/Wrapper'
import { SquarePlus } from 'lucide-react'
import { toast } from 'react-toastify'
import { addUserToProject, getProjectsAssociatedWithUser } from '../actions'
import { useUser } from '@clerk/nextjs'
import { Project } from '@/type'
import ProjectComponent from '../components/ProjectComponent'
import EmptyState from '../components/EmptyState'
import { AnimatedOrb } from '../components/AnimatedOrb' 

const Page = () => {
    const { user } = useUser()
    const email = user?.primaryEmailAddress?.emailAddress as string
    const [inviteCode, setInviteCode] = useState("")
    const [associatedProjects, setAssociatedProjects] = useState<Project[]>([])

    const fetchProjects = async (email: string) => {
        try {
            const associated = await getProjectsAssociatedWithUser(email)
            const transformed = Array.isArray(associated)
                ? associated.map((project: any) => ({
                    ...project,
                    users: Array.isArray(project.users)
                        ? project.users.map((user: any) => ({
                            ...user,
                            role: user.role ?? "user",
                            accountStatus: user.accountStatus ?? "active",
                            createdAt: user.createdAt ? new Date(user.createdAt) : new Date(),
                            updatedAt: user.updatedAt ? new Date(user.updatedAt) : new Date(),
                            validatedById: user.validatedById ?? null,
                        }))
                        : [],
                }))
                : []
            setAssociatedProjects(transformed)
        } catch (error) {
            toast.error("Erreur lors du chargement des projets:");
        }
    }

    useEffect(() => {
        if (email) {
            fetchProjects(email)
        }
    }, [email])

    const handleSubmit = async () => {
        try {
            if (inviteCode !== "") {
                await addUserToProject(email, inviteCode)
                fetchProjects(email)
                setInviteCode("")
                toast.success('Vous pouvez maintenant collaborer sur ce projet');
            } else {
                toast.error('Il manque le code du projet');
            }
        } catch (error) {
            toast.error("Code invalide ou vous appartenez déjà au projet");
        }
    }

    return (
        <main className='relative min-h-screen overflow-hidden bg-white'>
            
            {/* --- Arrière-plan Dynamique & Épuré --- */}
            <div className='fixed inset-0 z-0 pointer-events-none'>
                {/* Orbe 1: Bleu Vif - Rapide */}
                <AnimatedOrb 
                    colors={["#06b6d4", "#22d3ee"]}
                    size={300} 
                    initialX="10%" 
                    initialY="15%" 
                    duration={8000} 
                    opacity={0.6}
                    blur={40} 
                />
                {/* Orbe 2: Cyan - Moyen */}
                <AnimatedOrb 
                    colors={["#06b6d4", "#22d3ee"]} 
                    size={250} 
                    initialX="80%" 
                    initialY="10%" 
                    duration={12000} 
                    opacity={0.5}
                    blur={50} 
                />
                {/* Orbe 3: Bleu Royal - Très Rapide */}
                <AnimatedOrb 
                    colors={["#0ea5e9", "#7dd3fc"]} 
                    size={200} 
                    initialX="50%" 
                    initialY="50%" 
                    duration={6000} 
                    opacity={0.4}
                    blur={30} 
                />
                {/* Orbe 4: Indigo - Lent mais visible */}
                <AnimatedOrb 
                    colors={["#0ea5e9", "#7dd3fc"]} 
                    size={400} 
                    initialX="20%" 
                    initialY="70%" 
                    duration={15000} 
                    opacity={0.3}
                    blur={60} 
                />
                {/* Orbe 5: Bleu Ciel - Animation nerveuse */}
                <AnimatedOrb 
                    colors={["#0ea5e9", "#7dd3fc"]} 
                    size={150} 
                    initialX="75%" 
                    initialY="80%" 
                    duration={5000} 
                    opacity={0.7}
                    blur={20} 
                />
            </div>

            {/* --- Contenu --- */}
            <div className='relative z-10'>
                <Wrapper>
                    <div className='flex pt-1 items-center'>
                        <div className='flex-1 max-w-md'>
                            <input
                                value={inviteCode}
                                onChange={(e) => setInviteCode(e.target.value)}
                                type="text"
                                placeholder="Entrez le code projet..."
                                className='w-full p-3 input input-bordered bg-white/60 backdrop-blur-xl border-blue-100 text-slate-900 shadow-sm focus:border-blue-500 transition-all'
                            />
                        </div>
                        <button 
                            className='btn btn-primary ml-4 px-8 shadow-lg shadow-blue-500/30' 
                            onClick={handleSubmit}
                        >
                            Rejoindre <SquarePlus className='ml-2 w-5' />
                        </button>
                    </div>

                    <div className='mt-10'>
                        {associatedProjects.length > 0 ? (
                            <ul className="w-full grid md:grid-cols-3 gap-8">
                                {associatedProjects.map((project) => (
                                    <li key={project.id} className="hover:transform hover:scale-[1.02] transition-transform">
                                        <ProjectComponent 
                                            project={project} 
                                            admin={0} 
                                            style={true} 
                                            enableHover={1} 
                                        />
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className='py-32 flex flex-col items-center bg-white/30 backdrop-blur-sm rounded-3xl border border-white/50'>
                                <EmptyState
                                    imageSrc='/empty-projecto.png'
                                    imageAlt="Aucun projet"
                                    message="Prêt à commencer ? Rejoignez un projet !"
                                />
                            </div>
                        )}
                    </div>
                </Wrapper>
            </div>
        </main>
    )
}

export default Page