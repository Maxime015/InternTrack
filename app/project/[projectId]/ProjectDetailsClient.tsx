"use client"

import React, { useState, useEffect } from 'react';
import { CircleCheckBig, CopyPlus, ListTodo, Loader, SlidersHorizontal, UserCheck } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { deleteTaskById, getProjectInfo } from '@/app/actions';
import TaskComponent from '@/app/components/TaskComponent';
import EmptyState from '@/app/components/EmptyState';

interface Props {
    project: any;
    projectId: string;
    email: string;
    showNewTaskButton: boolean;
}

const ProjectDetailsClient = ({ project: initialProject, projectId, email, showNewTaskButton }: Props) => {
    const [project, setProject] = useState(initialProject);
    const [statusFilter, setStatusFilter] = useState<string>('');
    const [assignedFilter, setAssignedFilter] = useState<boolean>(false);
    const [taskCounts, setTaskCounts] = useState({ todo: 0, inProgress: 0, done: 0, assigned: 0 });

    const fetchInfos = async () => {
        try {
            const updatedProject = await getProjectInfo(projectId, true);
            setProject(updatedProject);
        } catch (error) {
            console.error('Erreur lors du chargement:', error);
        }
    }

    useEffect(() => {
        if (project && project.tasks && email) {
            setTaskCounts({
                todo: project.tasks.filter((t: any) => t.status === "To Do").length,
                inProgress: project.tasks.filter((t: any) => t.status === 'In Progress').length,
                done: project.tasks.filter((t: any) => t.status === 'Done').length,
                assigned: project.tasks.filter((t: any) => t?.user?.email === email).length,
            });
        }
    }, [project, email]);

    const filteredTasks = project?.tasks?.filter((task: any) => {
        const statusMatch = !statusFilter || task.status === statusFilter;
        const assignedMatch = !assignedFilter || task?.user?.email === email;
        return statusMatch && assignedMatch;
    });

    const deleteTask = async (taskId: string) => {
        try {
            await deleteTaskById(taskId);
            fetchInfos();
            toast.success('Tâche supprimée !');
        } catch (error) {
            toast.error("Erreur lors de la suppression");
        }
    }

    return (
        <>
            <div className='md:flex md:justify-between'>
                <div className='flex flex-col'>
                    <div className='space-x-2 mt-2'>
                        <button onClick={() => { setStatusFilter(''); setAssignedFilter(false) }} className={`btn btn-sm ${!statusFilter ? 'btn-primary' : ''}`}>
                            <SlidersHorizontal className='w-4' /> Tous ({project?.tasks?.length || 0})
                        </button>
                        <button onClick={() => setStatusFilter('To Do')} className={`btn btn-sm ${statusFilter === "To Do" ? 'btn-primary' : ''}`}>
                            <ListTodo className='w-4' /> A faire ({taskCounts.todo})
                        </button>
                        <button onClick={() => setStatusFilter('In Progress')} className={`btn btn-sm ${statusFilter === "In Progress" ? 'btn-primary' : ''}`}>
                            <Loader className='w-4' /> En cours ({taskCounts.inProgress})
                        </button>
                    </div>
                    <div className='space-x-2 mt-2'>
                        <button onClick={() => setStatusFilter('Done')} className={`btn btn-sm ${statusFilter === "Done" ? 'btn-primary' : ''}`}>
                            <CircleCheckBig className='w-4' /> Finis ({taskCounts.done})
                        </button>
                        <button onClick={() => setAssignedFilter(!assignedFilter)} className={`btn btn-sm ${assignedFilter ? 'btn-primary' : ''}`}>
                            <UserCheck className='w-4' /> Vos tâches ({taskCounts.assigned})
                        </button>
                    </div>
                </div>

                {/* CONDITION DE SÉCURITÉ : On affiche le bouton uniquement pour les admins/formateurs */}
                {showNewTaskButton && (
                    <Link href={`/new-tasks/${projectId}`} className='btn btn-sm mt-2 md:mt-0 btn-primary'>
                        Nouvelle tâche
                        <CopyPlus className='w-4' />
                    </Link>
                )}
            </div>

            <div className='mt-6 border border-base-300 p-5 shadow-sm rounded-xl'>
                {filteredTasks && filteredTasks.length > 0 ? (
                    <div className='overflow-auto'>
                        <table className='table table-lg'>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Titre</th>
                                    <th>Assigné à</th>
                                    <th className="hidden md:table-cell">À livrer le</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTasks.map((task: any, index: number) => (
                                    <tr key={task.id} className='border-t last:border-none'>
                                        <TaskComponent task={task} index={index} onDelete={deleteTask} email={email} />
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <EmptyState imageSrc="/empty-tasko.png" imageAlt="Vide" message="0 tâche à afficher" />
                )}
            </div>
        </>
    );
}

export default ProjectDetailsClient;