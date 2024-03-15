"use client";

// IMPORTS
import { useEffect, useState } from "react";

// SERVICES
import { useBalance } from "@/context/BalanceContext";

// COMPONENTS
import ModalRegisterBalance from "@/components/app/modal/modal-register-balance";
import { LoaderCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableData } from "@/components/app/table/table";
import ModalEditBalance from "@/components/app/modal/modal-edit-balance";
import ModalDeleteBalance from "@/components/app/modal/modal-delete-balance";

export default function Balance() {
  const {
    getBalanceByUserId,
    isLoading,
    balances,
    isOpenEdit,
    setIsOpenEdit,
    isOpenDelete,
    setIsOpenDelete,
  } = useBalance();

  const [isOpenRegister, setIsOpenRegister] = useState(false);

  useEffect(() => {
    getBalanceByUserId();
  }, []);

  if (balances.length === 0) {
    return (
      <>
        {isLoading ? (
          <div className="h-full flex justify-center items-center">
            <LoaderCircleIcon className="h-16 w-16 animate-spin" />
          </div>
        ) : (
          <div className="h-full flex flex-col gap-4 justify-center items-center">
            <ModalRegisterBalance
              isOpen={isOpenRegister}
              setIsOpen={setIsOpenRegister}
            />
            <p className="text-base font-normal">
              Você não possui saldos no momento.
            </p>
            <Button
              type="button"
              className="rounded-full bg-blue-500"
              onClick={() => setIsOpenRegister(true)}
            >
              Criar saldos
            </Button>
          </div>
        )}
      </>
    );
  }

  return (
    <main className="p-8 flex flex-col gap-6">
      <ModalRegisterBalance
        isOpen={isOpenRegister}
        setIsOpen={setIsOpenRegister}
      />
      <ModalEditBalance isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} />

      <ModalDeleteBalance isOpen={isOpenDelete} setIsOpen={setIsOpenDelete} />

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-normal">Saldos</h1>
        <Button
          type="button"
          className="rounded-lg bg-blue-500"
          onClick={() => setIsOpenRegister(true)}
        >
          Criar
        </Button>
      </div>

      <TableData items={balances} />
    </main>
  );
}
