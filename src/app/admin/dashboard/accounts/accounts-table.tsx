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
import type { College, GPOAccount } from "@prisma/client";
import AccountCreationDialog from "./account-creation-dialog";
import ReactivateBtn from "./reactivate-btn";
import DeactivateBtn from "./deactivate-btn";
import AccountUpdateDialog from "./account-update-dialog";

export type GPOAccountData = GPOAccount & {
  collegeName: College;
};

export const columns: ColumnDef<GPOAccountData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "gatePassNumber",
    header: "Gate Pass Number",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("gatePassNumber")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "accountType",
    header: "Type",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("accountType")}</div>
    ),
  },
  {
    accessorKey: "collegeName",
    header: "College",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.original.collegeName ? (
          row.original.collegeName.collegeName
        ) : (
          <span className="text-destructive font-semibold">N/A</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "department",
    header: "Department",
    cell: ({ row }) => (
      <div className="capitalize">
        {row.original.department ? (
          row.original.department
        ) : (
          <span className="text-destructive font-semibold">N/A</span>
        )}
      </div>
    ),
  },
  {
    accessorKey: "isVIP",
    header: "isVIP",
    cell: ({ row }) => (
      <div className="capitalize">{`${row.getValue("isVIP")}`}</div>
    ),
  },
  {
    accessorKey: "isPWD",
    header: "isPWD",
    cell: ({ row }) => (
      <div className="capitalize">{`${row.getValue("isPWD")}`}</div>
    ),
  },
  {
    accessorKey: "creditScore",
    header: "Credit Score",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("creditScore")}</div>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "isActive",
    header: "isActive",
    cell: ({ row }) => (
      <div className="capitalize">{`${row.getValue("isActive")}`}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const {
        email,
        gatePassNumber,
        password,
        accountType,
        collegeId,
        department,
        isVIP,
        isPWD,
      } = row.original;

      const updateFormData = {
        email: email as string,
        gatePassNumber,
        password,
        accountType,
        collegeId,
        department: department as string,
        isVIP,
        isPWD,
      };

      return (
        <div className="flex gap-2">
          <AccountUpdateDialog
            accountId={row.original.id}
            data={updateFormData}
          />
          {row.original.isActive ? (
            <DeactivateBtn accountId={row.original.id} />
          ) : (
            <ReactivateBtn accountId={row.original.id} />
          )}
        </div>
      );
    },
  },
];

export function AccountsTable({ data }: { data: GPOAccountData[] }) {
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
      <div className="flex items-center gap-4 py-4">
        <Input
          placeholder="Filter by Gate Pass Number..."
          value={
            (table.getColumn("gatePassNumber")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn("gatePassNumber")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
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
        <div className="ml-auto">
          <AccountCreationDialog />
        </div>
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
