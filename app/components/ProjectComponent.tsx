import { Project } from '@/type'
import { Copy, Codesandbox, Trash, Users, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import React, { FC } from 'react'
import { toast } from 'react-toastify';

interface ProjectProps {
    project: Project;
    admin: number;
    style: boolean;
    onDelete?: (id: string) => void;
    enableHover?: number;
}

const ProjectComponent: FC<ProjectProps> = ({ project, admin, style, onDelete, enableHover }) => {

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.preventDefault();
        const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?");
        if (isConfirmed && onDelete) {
            onDelete(project.id);
        }
    };

    const totalTasks = project.tasks?.length || 0;

    const tasksByStatus = project.tasks?.reduce(
        (acc, task) => {
            if (task.status === "To Do") acc.toDo++;
            else if (task.status === "In Progress") acc.inProgress++;
            else if (task.status === "Done") acc.done++;
            return acc;
        },
        { toDo: 0, inProgress: 0, done: 0 }
    ) ?? { toDo: 0, inProgress: 0, done: 0 };

    const getPercentage = (count: number) =>
        totalTasks ? (count / totalTasks) * 100 : 0;

    const doneP = getPercentage(tasksByStatus.done);
    const progressP = getPercentage(tasksByStatus.inProgress);
    const todoP = getPercentage(tasksByStatus.toDo);

    const handleCopyCode = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            if (project.inviteCode) {
                await navigator.clipboard.writeText(project.inviteCode);
                toast.success("Code copié !");
            }
        } catch {
            toast.error("Erreur de copie.");
        }
    };

    const containerClasses = `
        group relative flex flex-col h-full overflow-hidden transition-all duration-500
        ${style ? 'border border-base-content/5 bg-base-100/40 backdrop-blur-md p-7 hover:bg-base-100/80' : 'p-4'}
        rounded-[2rem] w-full text-left
        ${enableHover === 1 ? "hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2" : ""}
    `;

    return (
        <div className={containerClasses}>

            {/* Background blur */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500" />

            {/* Header */}
            <div className='relative w-full flex items-start justify-between mb-8'>
                <div className="flex items-center gap-4">
                    <div className='relative'>
                        <div className='bg-gradient-to-br from-primary to-primary-focus p-3 rounded-2xl shadow-lg shadow-primary/20'>
                            <Codesandbox className='w-6 h-6 text-primary-content' />
                        </div>

                        {/* 🔥 STATUS DOT → VERT SI TERMINÉ */}
                        <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#22c55e]"></span>
                        </span>
                    </div>

                    <div>
                        <h3 className="font-extrabold text-xl tracking-tight text-base-content/90">
                            {project.name.length > 22
                                ? `${project.name.substring(0, 22)}...`
                                : project.name}
                        </h3>

                        <div className="flex items-center gap-2 text-xs font-medium text-base-content/40 mt-1">
                            <Users size={12} />
                            <span>{project.users?.length || 0} membre(s)</span>
                        </div>
                    </div>
                </div>

                {admin === 1 && (
                    <button
                        className='opacity-0 group-hover:opacity-100 transition-opacity btn btn-ghost btn-xs btn-circle text-error/40 hover:text-error hover:bg-error/10'
                        onClick={handleDeleteClick}
                    >
                        <Trash className='w-4' />
                    </button>
                )}
            </div>

            {/* Description */}
            {project.description && (
                <p className='text-sm leading-relaxed text-base-content/60 mb-1 line-clamp-2 min-h-[40px]'>
                    {project.description}
                </p>
            )}

            {/* Progress */}
            <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-base-content/40">
                        Avancement global
                    </span>
                    <span className="text-sm font-black text-[#22c55e]">
                        {Math.round(doneP)}%
                    </span>
                </div>

                {/* 🔥 BARRE AVEC VERT FORCÉ */}
                <div className="flex h-2.5 w-full bg-base-200 rounded-full overflow-hidden shadow-inner">
                    <div
                        style={{ width: `${doneP}%`, backgroundColor: "#22c55e" }}
                        className="transition-all duration-1000 ease-out"
                    />
                    <div
                        style={{ width: `${progressP}%` }}
                        className="bg-yellow-400 transition-all duration-1000 ease-out"
                    />
                    <div
                        style={{ width: `${todoP}%` }}
                        className="bg-red-500 transition-all duration-1000 ease-out"
                    />
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
                        <span className="text-[10px] font-bold opacity-70">
                            {tasksByStatus.done} Terminées
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-yellow-400" />
                        <span className="text-[10px] font-bold opacity-70">
                            {tasksByStatus.inProgress} En cours
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-[10px] font-bold opacity-70">
                            {tasksByStatus.toDo} À faire
                        </span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className='mt-auto space-y-4'>
                {admin === 1 && (
                    <div className='flex items-center justify-between bg-base-200/40 border border-base-content/5 rounded-2xl p-2 pl-4'>
                        <span className="text-[10px] font-bold text-base-content/30 uppercase">
                            Code d'accès
                        </span>

                        <div className="flex items-center gap-2">
                            <code className='text-xs font-mono font-bold text-base-content/60'>
                                {project.inviteCode}
                            </code>

                            <button
                                className='btn btn-ghost btn-xs btn-square hover:bg-primary hover:text-white transition-colors'
                                onClick={handleCopyCode}
                            >
                                <Copy className='w-3' />
                            </button>
                        </div>
                    </div>
                )}

                {style && (
                    <Link
                        href={`/project/${project.id}`}
                        className='group/btn btn btn-primary border-none w-full rounded-xl flex justify-between px-6 shadow-xl shadow-primary/10 hover:shadow-primary/30 transition-all duration-300'
                    >
                        <span className="flex items-center gap-2">
                            <LayoutDashboard size={16} />
                            Ouvrir le Board
                        </span>

                        <div className='bg-primary-content/20 px-2 py-0.5 rounded-lg text-[10px]'>
                            {totalTasks} tâches
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ProjectComponent;
