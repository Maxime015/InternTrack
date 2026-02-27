"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import { Clock, LogOut } from "lucide-react";

export default function CompteEnAttentePage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center px-4">
                <div className="card bg-base-100 shadow-xl max-w-md w-full">
                    <div className="card-body items-center text-center">
                        <Clock className="w-16 h-16 text-primary" />
                        <h1 className="card-title text-2xl">Compte en attente</h1>
                        <p className="text-base-content/80">
                            Votre demande de compte a bien été enregistrée. Un chef hiérarchique ou
                            l&apos;administration du Port Autonome de Lomé doit valider votre
                            compte pour que vous puissiez accéder à l&apos;application.
                        </p>
                        <p className="text-sm text-base-content/60">
                            Vous serez notifié dès que votre accès sera activé.
                        </p>
                        <div className="card-actions mt-4">
                            <Link href="/" className="btn btn-outline gap-2">
                                <LogOut className="w-4 h-4" />
                                Retour à l&apos;accueil
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
