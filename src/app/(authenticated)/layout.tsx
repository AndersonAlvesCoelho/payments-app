"use client";

// IMPORTS
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

// SERVICES
import { getUserCookie } from "@/services/session";
import { BalanceProvider } from "@/context/BalanceContext";

// COMPONENTS
import Header from "@/components/app/header";
import NavigationMenu from "@/components/app/navigation-menu";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push } = useRouter();
  const userCookie = getUserCookie();

  useEffect(() => {
    if (!userCookie) {
      push("login");
    }
  }, [push]);

  return (
    <div className="flex flex-col h-screen ">
      <Header />

      <div className="flex flex-1">
        <NavigationMenu />

        <div className="flex-1 p-4">
          <BalanceProvider>{children}</BalanceProvider>
        </div>
      </div>
    </div>
  );
}
