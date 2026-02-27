"use client";

import { useState } from "react";
import Wrapper from "../components/Wrapper";
import { getUsersPendingValidation } from "./../actions/stagiaires";
import { validateUserAccount } from "../actions/validation";
import { toast } from "react-toastify";
import { UserPlus, Check } from "lucide-react";
import type { User as PrismaUser } from "@prisma/client";

interface Props {
    initialUsers: PrismaUser[];
}

export default function ValidationClient({ initialUsers }: Props) {
    const [users, setUsers] = useState<PrismaUser[]>(initialUsers);
    const [loading, setLoading] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const u = await getUsersPendingValidation();
            setUsers(u);
        } catch (error) {
            setUsers([]);
        } finally {
            setLoading(false);
        }
    };

    const handleValidateUser = async (userId: string) => {
        try {
            await validateUserAccount(userId);
            toast.success("Compte validé.");
            load();
        } catch (e: unknown) {
            toast.error(e instanceof Error ? e.message : "Erreur");
        }
    };

    return (
        <Wrapper>
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Demandes de comptes</h1>
                <p className="text-base-content/70 mt-1">
                    Validez les demandes de création de compte en attente.
                </p>
            </div>

            <div className="flex items-center gap-2 mb-6">
                <UserPlus className="w-5 h-5" />
                <span className="font-medium">
                    Comptes en attente ({users.length})
                </span>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <span className="loading loading-spinner loading-lg text-primary" />
                </div>
            ) : users.length === 0 ? (
                <div className="alert alert-info">
                    Aucune demande de compte en attente.
                </div>
            ) : (
                <div className="space-y-4">
                    {users.map((u: PrismaUser) => (
                        <div
                            key={u.id}
                            className="card bg-base-200 shadow flex flex-row items-center justify-between p-4"
                        >
                            <div>
                                <p className="font-medium">{u.name}</p>
                                <p className="text-sm text-base-content/70">
                                    {u.email}
                                </p>
                            </div>

                            <button
                                type="button"
                                className="btn btn-primary btn-sm gap-1"
                                onClick={() => handleValidateUser(u.id)}
                            >
                                <Check className="w-4 h-4" />
                                Valider le compte
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </Wrapper>
    );
}