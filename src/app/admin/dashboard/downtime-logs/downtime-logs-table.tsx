"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, UserRoundPen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { College, DowntimeLog, GPOAccount } from "@prisma/client";

import { useRouter } from "next/navigation";
import DowntimeLogCreationDialog from "./downtime-log-creation-dialog";
import { parseDate } from "@/lib/utils";

export type GPOAccountData = GPOAccount & {
  collegeName: College;
};

export function DowntimeLogsTable({ data }: { data: DowntimeLog[] }) {
  const columns: ColumnDef<DowntimeLog>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && "indeterminate")
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    // },
    {
      accessorKey: "startedAt",
      header: "Down Time Date",
      cell: ({ row }) => (
        <div className="capitalize">{parseDate(row.getValue("startedAt"))}</div>
      ),
    },
    {
      accessorKey: "endedAt",
      header: "Restoration Date",
      cell: ({ row }) => <div>{parseDate(row.getValue("endedAt"))}</div>,
    },
    {
      accessorKey: "areViolationsWaived",
      header: "Compensated Affected Accounts",
      cell: ({ row }) => (
        <div className="capitalize">
          {row.getValue("areViolationsWaived") ? "YES" : "NO"}
        </div>
      ),
    },

    // {
    //   id: "actions",
    //   header: "Actions",
    //   enableHiding: false,
    //   cell: ({ row }) => {
    //     const {
    //       email,
    //       gatePassNumber,
    //       password,
    //       accountType,
    //       collegeId,
    //       department,
    //       isVIP,
    //       isPWD,
    //     } = row.original;

    //     const updateFormData = {
    //       email: email as string,
    //       gatePassNumber,
    //       password,
    //       accountType,
    //       collegeId,
    //       department: department as string,
    //       isVIP,
    //       isPWD,
    //     };

    //     return (
    //       <div className="flex gap-2">
    //         <AccountUpdateDialog
    //           accountId={row.original.id}
    //           data={updateFormData}
    //           colleges={colleges}
    //         />
    //         {row.original.isActive ? (
    //           <DeactivateBtn accountId={row.original.id} />
    //         ) : (
    //           <ReactivateBtn accountId={row.original.id} />
    //         )}
    //       </div>
    //     );
    //   },
    // },
  ];

  const router = useRouter();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center gap-4 py-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="md:max-w-sm">
              {table.getColumn("status")?.getFilterValue()
                ? `Status: ${table.getColumn("status")?.getFilterValue()}`
                : "Filter by Status"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {["YES", "NO"].map((status) => (
              <DropdownMenuRadioItem
                key={status}
                value={status}
                onSelect={() =>
                  table.getColumn("areViolationsWaived")?.setFilterValue(
                    table.getColumn("areViolationsWaived")?.getFilterValue() ===
                      status
                      ? null // Toggle off if already selected
                      : status
                  )
                }
                // Remove the 'checked' prop
              >
                {status}
              </DropdownMenuRadioItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuRadioItem
              value="clear"
              onSelect={() =>
                table.getColumn("areViolationsWaived")?.setFilterValue(null)
              }
            >
              Clear Filter
            </DropdownMenuRadioItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="self-stretch md:self-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <DowntimeLogCreationDialog />
      </div>
      <div className="rounded-md border overflow-clip bg-background">
        <Table>
          <TableHeader className="bg-orange-500 bg-opacity-25">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-bold">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() =>
                    router.push(
                      `/admin/dashboard/downtime-logs/${row.original.id}`
                    )
                  }
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
