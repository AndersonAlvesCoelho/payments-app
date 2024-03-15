import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import RenderBalance from "./renderBalance";
import { BalanceProps } from "@/@types/balance.type";

interface TableDataProps {
  items: any[];
}

export function TableData({ items }: TableDataProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead className="w-[100px]">Descrição</TableHead>
            <TableHead>Valor inicial</TableHead>
            <TableHead>Valor utilizado</TableHead>
            <TableHead>Valor restante</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((item) => (
            <RenderBalance item={item as BalanceProps} key={item.balanceId} />
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end items-center">
        <div className="flex gap-2 end items-center">
          <p className="text-xs text-zinc-500 font-normal">Rows per page:</p>
          <Select onValueChange={(value) => handleItemsPerPageChange(value)}>
            <SelectTrigger className="w-[80px] bg-transparent border-transparent">
              <SelectValue placeholder="5" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button
            variant="link"
            type="button"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon className="h-6 w-6" />
          </Button>
          <Button
            variant="link"
            type="button"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(items.length / itemsPerPage)}
          >
            <ChevronRightIcon className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
