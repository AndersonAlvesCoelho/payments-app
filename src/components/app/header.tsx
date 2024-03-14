"use client";

// IMPORTS

// SERVICES
import { useUser } from "@/context/UserContext";

// COMPONENTS
import { UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const { logOutUser } = useUser();

  return (
    <header className="flex w-full bg-zinc-700 text-white p-4 items-center justify-between">
      <h1 className="text-4xl font-bold">Payments</h1>
      <DropdownMenu>
        <DropdownMenuTrigger className="">
          <UserIcon className="h-10 w-10 bg-zinc-50 text-zinc-700 rounded-full" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logOutUser}>Deslogar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
