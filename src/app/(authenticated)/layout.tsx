"use client";

// IMPORTS
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

// SERVICES
import { useUser } from "@/context/UserContext";
import { getUserCookie } from "@/services/session";

// COMPONENTS
import Header from "@/components/app/header";
import NavigationMenu from "@/components/app/navigation-menu";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push } = useRouter();
  const userId = getUserCookie();

  useEffect(() => {
    console.log("userId ", userId);
    if (!userId) {
      push("login");
    }
  }, [userId, push]);

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1">
        <NavigationMenu />

        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  );
}
