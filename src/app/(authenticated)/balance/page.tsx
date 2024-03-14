"use client";

// IMPORTS
import { useEffect } from "react";

// SERVICES
import { useBalance } from "@/context/BalanceContext";
import { LoaderCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableData } from "@/components/app/table/table";

// COMPONENTS

export default function Balance() {
  const { getBalanceByUserId, isLoading, balance } = useBalance();

  useEffect(() => {
    getBalanceByUserId();
  }, []);

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <LoaderCircleIcon className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  if (balance.length === 0) {
    return (
      <div className="h-full flex flex-col gap-4 justify-center items-center">
        <p className="text-base font-normal">
          Você não possui pedidos abertos.
        </p>
        <Button type="button" className="rounded-full bg-blue-500">
          Criar pedido
        </Button>
      </div>
    );
  }

  return (
    <main className="p-8 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-normal">Pagamentos</h1>
        <Button type="button" className="rounded-lg bg-blue-500">
          Criar
        </Button>
      </div>

      <TableData items={balance} />
    </main>
  );
}
