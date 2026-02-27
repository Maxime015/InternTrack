"use client"

import Wrapper from "../components/Wrapper";
import { useState } from "react";
import { Codesandbox } from "lucide-react";
import { createProject, deleteProjectById, getProjectsCreatedByUser } from '@/app/actions';
import { toast } from "react-toastify";
import ProjectComponent from "../components/ProjectComponent";
import EmptyState from "../components/EmptyState";
import { Project } from "@/type";

interface WorkspaceClientProps {
  initialProjects: any[];
  userEmail: string;
}

export default function WorkspaceClient({ initialProjects, userEmail }: WorkspaceClientProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [projects, setProjects] = useState<Project[]>(initialProjects as any);

  const fetchProjects = async () => {
    try {
      const myproject = await getProjectsCreatedByUser(userEmail);
      const fixedProjects = myproject.map((project: any) => ({
        ...project,
        users: project.users.map((user: any) => ({
          ...user,
          createdAt: user.createdAt ?? new Date(),
          updatedAt: user.updatedAt ?? new Date(),
          role: user.role ?? "user",
          accountStatus: user.accountStatus ?? "active",
        })),
      }));
      setProjects(fixedProjects as any);
    } catch (error) {
      console.error('Erreur lors du chargement des projets:', error);
    }
  };

  const deleteProject = async (projectId: string) => {
    try {
      await deleteProjectById(projectId);
      fetchProjects();
      toast.success('Projet supprimé !');
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleSubmit = async () => {
    if (!name || !description) return toast.error("Veuillez remplir tous les champs");
    try {
      const modal = document.getElementById('my_modal_3') as HTMLDialogElement;
      await createProject(name, description, userEmail);
      if (modal) modal.close();
      setName("");
      setDescription("");
      fetchProjects();
      toast.success("Projet Créé");
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <Wrapper>
      <div>
        <button className="btn btn-primary mb-6" onClick={() => (document.getElementById('my_modal_3') as HTMLDialogElement).showModal()}>
          Nouveau Projet <Codesandbox />
        </button>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg">Nouveau Projet</h3>
            <div className="py-4">
              <input
                placeholder="Nom du projet"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-base-300 input input-bordered w-full mb-4"
                required
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mb-2 textarea textarea-bordered border border-base-300 w-full"
                required
              />
              <button className="btn btn-primary" onClick={handleSubmit}>
                Nouveau Projet <Codesandbox />
              </button>
            </div>
          </div>
        </dialog>

        <div className="w-full">
          {projects.length > 0 ? (
            <ul className="w-full grid md:grid-cols-3 gap-6">
              {projects.map((project) => (
                <li key={project.id}>
                  <ProjectComponent project={project} admin={1} style={true} onDelete={deleteProject} enableHover={1} />
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState imageSrc='/empty-projecto.png' imageAlt="Empty" message="Aucun projet créé" />
          )}
        </div>
      </div>
    </Wrapper>
  );
}