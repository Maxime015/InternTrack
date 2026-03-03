"use client";

import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuthUser, canAccessApp } from "@/lib/auth-pal";

type WrapperProps = {
    children: React.ReactNode;
};

const PUBLIC_PATHS = ["/", "/sign-in", "/sign-up", "/compte-en-attente"];

const Wrapper = ({ children }: WrapperProps) => {
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const isPublic = PUBLIC_PATHS.some(
            (p) => pathname === p || pathname.startsWith(p + "/")
        );
        if (isPublic) return;
        getAuthUser()
            .then(async (auth) => {
                if (auth && !(await canAccessApp(auth))) {
                    router.replace("/compte-en-attente");
                }
            })
            .catch(() => {});
    }, [pathname, router]);

    return (
        <div>
            <Navbar />
            <div className="px-5 md:px-[3.5%] mt-8 mb-10">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnHover
                    draggable
                />
                {children}
            </div>
        </div>
    );
};

export default Wrapper;