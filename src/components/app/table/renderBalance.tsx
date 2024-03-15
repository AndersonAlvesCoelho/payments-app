"use client";
// IMPORTS
import { useState } from "react";

// COMPONENTS
import { LoaderCircleIcon, PencilIcon, TrashIcon } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// SERVICES

// HELPS
import { formatToBRL, truncateString } from "@/utils/format";
import { BalanceProps } from "@/@types/balance.type";
import { useBalance } from "@/context/BalanceContext";

interface RenderBalanceProps {
  item: BalanceProps;
  key: number;
}

export default function RenderBalance({ item, key }: RenderBalanceProps) {
  const { setIsOpenEdit, setIsOpenDelete, getBalanceById } = useBalance();

  const {
    description,
    initialValue,
    name,
    remainingValue,
    usedValue,
    balanceId,
  } = item;

  const [isLoading, setIsLoading] = useState(false);

  async function handleEditBalance() {
    setIsLoading(true);
    if (balanceId) await getBalanceById(balanceId);
    setIsOpenEdit(true);
    setIsLoading(false);
  }

  async function handleDeleteBalance() {
    setIsLoading(true);
    if (balanceId) await getBalanceById(balanceId);
    setIsOpenDelete(true);
    setIsLoading(false);
  }

  return (
    <TableRow key={key}>
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell className="w-[200px]">
        {truncateString(description, 30)}
      </TableCell>
      <TableCell>{formatToBRL(initialValue)}</TableCell>
      <TableCell>{formatToBRL(usedValue ? usedValue : 0)}</TableCell>
      <TableCell>{formatToBRL(remainingValue)}</TableCell>
      <TableCell className="flex gap-2 ">
        {isLoading ? (
          <LoaderCircleIcon className="h-6 w-6 animate-spin" />
        ) : (
          <>
            <Button type="button" variant="link" onClick={handleDeleteBalance}>
              <TrashIcon className="h-6 w-6" />
            </Button>

            <Button type="button" variant="link" onClick={handleEditBalance}>
              <PencilIcon className="h-6 w-6" />
            </Button>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}
