import { UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useUser } from "@/context/UserContext";

export default function Header() {
  const { logOutUser } = useUser();

  return (
    <header className="flex w-full bg-zinc-700 text-white p-4 justify-between">
      <h1 className="text-xl font-bold">Header</h1>
      <DropdownMenu>
        <DropdownMenuTrigger className="">
          <UserIcon className="h-6 w-6 bg-" />
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
