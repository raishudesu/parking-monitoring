"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
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
import type { ParkingSpace } from "@prisma/client";
import ParkingSpaceCreationDialog from "./parking-space-creation-dialog";
import DeleteParkingSpaceDialog from "./delete-parking-space-dialog";
import UpdateParkingSpaceDialog from "./parking-space-update-dialog";
import ShowQrDialog from "./show-qr-dialog";
import { parseDate } from "@/lib/utils";
import { ParkingSpaceWithImages } from "@/app/gpo/dashboard/map/dijkstra-map";

const emailFilterFn: FilterFn<any> = (
  row: Row<any>,
  columnId: string,
  filterValue: string
) => {
  const email = (row.getValue(columnId) as { email?: string })?.email ?? "";
  return email.toLowerCase().includes(filterValue.toLowerCase());
};

export const columns: ColumnDef<ParkingSpaceWithImages>[] = [
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.original.name}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div>{row.original.description}</div>,
    filterFn: emailFilterFn,
  },
  {
    accessorKey: "spaceType",
    header: "Type",
    cell: ({ row }) => <div>{`${row.getValue("spaceType")}`}</div>,
  },
  {
    accessorKey: "currCapacity",
    header: "Occupied spots",
    cell: ({ row }) => <div>{`${row.getValue("currCapacity")}`}</div>,
  },
  {
    accessorKey: "maxCapacity",
    header: "Total spots",
    cell: ({ row }) => (
      <div className="capitalize">{`${row.getValue("maxCapacity")}`}</div>
    ),
  },
  {
    accessorKey: "currReservedCapacity",
    header: "Reserved Spots",
    cell: ({ row }) => <div>{`${row.getValue("currReservedCapacity")}`}</div>,
  },
  {
    accessorKey: "reservedCapacity",
    header: "Reserved Spot Limit",
    cell: ({ row }) => (
      <div className="capitalize">{`${row.getValue("reservedCapacity")}`}</div>
    ),
  },

  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{`${
        row.getValue("isActive") === true ? "ACTIVE" : "INACTIVE"
      }`}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const {
        id,
        name,
        description,
        longitude,
        latitude,
        spaceType,
        maxCapacity,
        reservedCapacity,
        polygon,
        images,
        // imageUrl,
      } = row.original;

      const updateFormData = {
        name,
        description,
        longitude,
        latitude,
        spaceType,
        maxCapacity: maxCapacity.toString(),
        reservedCapacity: reservedCapacity.toString(),
        polygon,
        // imageUrl: imageUrl as string,
        images,
      };

      return (
        <div className="flex gap-2">
          <UpdateParkingSpaceDialog
            parkingSpaceId={row.original.id}
            data={updateFormData}
          />
          <DeleteParkingSpaceDialog parkingSpaceId={row.original.id} />
          <ShowQrDialog
            parkingId={row.original.id}
            parkingName={row.original.name}
          />
        </div>
      );
    },
  },
];

export function ParkingSpaceTable({
  data,
}: {
  data: ParkingSpaceWithImages[];
}) {
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
          placeholder="Filter by Name"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="md:max-w-sm"
        />
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
        <ParkingSpaceCreationDialog />
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
