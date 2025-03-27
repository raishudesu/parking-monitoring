"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  createColumnHelper,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
import type {
  GPOAccount,
  GPOSession,
  ParkingSessionRating,
  ParkingSpace,
} from "@prisma/client";
import { parseDate } from "@/lib/utils";

export type SessionData = GPOSession & {
  parkingSpace: ParkingSpace;
  rating: ParkingSessionRating | null;
  accountParked: Omit<GPOAccount, "password">;
};

const columnHelper = createColumnHelper();

const emailFilterFn: FilterFn<any> = (
  row: Row<any>,
  columnId: string,
  filterValue: string
) => {
  const email = (row.getValue(columnId) as { email?: string })?.email ?? "";
  return email.toLowerCase().includes(filterValue.toLowerCase());
};

export const columns: ColumnDef<SessionData>[] = [
  // {
  //     id: "select",
  //     header: ({table}) => (
  //         <Checkbox
  //             checked={
  //                 table.getIsAllPageRowsSelected() ||
  //                 (table.getIsSomePageRowsSelected() && "indeterminate")
  //             }
  //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //             aria-label="Select all"
  //         />
  //     ),
  //     cell: ({row}) => (
  //         <Checkbox
  //             checked={row.getIsSelected()}
  //             onCheckedChange={(value) => row.toggleSelected(!!value)}
  //             aria-label="Select row"
  //         />
  //     ),
  // },
  {
    accessorKey: "parkingSpace",
    header: "Parking Space",
    cell: ({ row }) => (
      <div className="capitalize">{row.original.parkingSpace.name}</div>
    ),
  },
  {
    accessorKey: "accountParked",
    header: "Account Parked",
    cell: ({ row }) => <div>{row.original.accountParked.email}</div>,
    filterFn: emailFilterFn,
  },
  // {
  //   accessorKey: "accountParked",
  //   header: "Gate Pass No.",
  //   cell: ({ row }) => <div>{row.original.accountParked.gatePassNumber}</div>,
  //   filterFn: emailFilterFn,
  // },
  {
    accessorKey: "startTime",
    header: "Start",
    cell: ({ row }) => <div>{`${parseDate(row.getValue("startTime"))}`}</div>,
  },
  {
    accessorKey: "shouldEndAt",
    header: "End",
    cell: ({ row }) => <div>{`${parseDate(row.getValue("shouldEndAt"))}`}</div>,
  },
  {
    accessorKey: "endTime",
    header: "Ended Date",
    cell: ({ row }) => <div>{`${parseDate(row.getValue("endTime"))}`}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className={`capitalize font-bold ${
          row.getValue("status") === "ONGOING"
            ? "text-destructive"
            : "text-green-500"
        }`}
      >{`${row.getValue("status")}`}</div>
    ),
  },
  {
    accessorKey: "endedProperly",
    header: "Ended properly",
    cell: ({ row }) => (
      <div
        className={`font-bold ${
          row.getValue("endedProperly") ? "text-green-500" : "text-destructive"
        }`}
      >{`${row.getValue("endedProperly") ? "YES" : "NO"}`}</div>
    ),
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => (
      <div>{row.original.rating ? `${row.original.rating.rating}` : "N/A"}</div>
    ),
  },
  //   {
  //     id: "actions",
  //     header: "Actions",
  //     enableHiding: false,
  //     cell: ({ row }) => {
  //       return (
  //         <div className="flex gap-2">
  //           <Button className="flex gap-2">
  //             Edit
  //             <UserRoundPen size={15} />
  //           </Button>
  //           <Button variant={"destructive"} className="flex gap-2">
  //             Delete <Trash2 size={18} />
  //           </Button>
  //         </div>
  //       );
  //     },
  //   },
];

export function SessionsTable({ data }: { data: SessionData[] }) {
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
        <Input
          placeholder="Filter by Corporate Email"
          value={
            (table.getColumn("accountParked")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("accountParked")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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
            {["ENDED", "ONGOING"].map((status) => (
              <DropdownMenuRadioItem
                key={status}
                value={status}
                onSelect={() =>
                  table.getColumn("status")?.setFilterValue(
                    table.getColumn("status")?.getFilterValue() === status
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
              onSelect={() => table.getColumn("status")?.setFilterValue(null)}
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
          <DropdownMenuContent align="center">
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
