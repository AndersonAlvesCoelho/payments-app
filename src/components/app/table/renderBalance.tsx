// IMPORTS

// COMPONENTS
import { PencilIcon, TrashIcon } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// SERVICES

// HELPS
import { formatToBRL, truncateString } from "@/utils/format";
import { BalanceProps } from "@/@types/balance.type";

interface RenderBalanceProps {
  item: BalanceProps;
  key: number;
}

export default function RenderBalance({ item, key }: RenderBalanceProps) {
  const { description, initialValue, name, remainingValue, usedValue, userId } =
    item;

  function handleEditBalance() {
    console.log("handleEditBalance ", userId);
  }

  function handleDeleteBalance() {
    console.log("handleDeleteBalance ", userId);
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
        <Button type="button" variant="link" onClick={handleEditBalance}>
          <TrashIcon className="h-6 w-6" />
        </Button>

        <Button type="button" variant="link" onClick={handleDeleteBalance}>
          <PencilIcon className="h-6 w-6" />
        </Button>
      </TableCell>
    </TableRow>
  );
}
