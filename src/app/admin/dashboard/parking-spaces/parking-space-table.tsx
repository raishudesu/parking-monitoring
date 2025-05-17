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
import { ParkingSpaceType, type ParkingSpace } from "@prisma/client";
import ParkingSpaceCreationDialog from "./parking-space-creation-dialog";
import DeleteParkingSpaceDialog from "./delete-parking-space-dialog";
import UpdateParkingSpaceDialog from "./parking-space-update-dialog";
import ShowQrDialog from "./show-qr-dialog";
import { calculatePolygonArea } from "@/lib/utils";
import { ParkingSpaceWithImages } from "@/types/map";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
    id: "polygon",
    accessorKey: "polygon",
    header: "Approx. Area",
    sortingFn: (rowA, rowB) => {
      const areaA = calculatePolygonArea(
        JSON.parse(rowA.original.polygon as string)
      );
      const areaB = calculatePolygonArea(
        JSON.parse(rowB.original.polygon as string)
      );
      return areaA - areaB;
    },
    cell: ({ row }) => (
      <div className="capitalize">{`${calculatePolygonArea(
        JSON.parse(row.getValue("polygon"))
      )}m²`}</div>
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
  totalCount = 0,
  pageCount = 1,
  currentPage = 1,
}: {
  data: ParkingSpaceWithImages[];
  totalCount: number;
  pageCount: number;
  currentPage: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [sorting, setSorting] = React.useState<SortingState>([
    { id: "polygon", desc: true },
  ]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [nameFilter, setNameFilter] = React.useState<string>(
    searchParams.get("name") || ""
  );

  const [spaceTypeFilter, setSpaceTypeFilter] = React.useState<
    string | undefined
  >(searchParams.get("spaceType") || "");

  // Update URL with filters and pagination
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());

      Object.entries(params).forEach(([name, value]) => {
        if (value === null) {
          newSearchParams.delete(name);
        } else {
          newSearchParams.set(name, String(value));
        }
      });

      return newSearchParams.toString();
    },
    [searchParams]
  );

  // Handle filter changes with debounce
  const handleNameFilterChange = (value: string) => {
    setNameFilter(value);

    const timeout = setTimeout(() => {
      router.push(
        `${pathname}?${createQueryString({
          page: 1, // Reset to first page on filter change
          name: value || null,
          spaceType: spaceTypeFilter || null,
        })}`
      );
    }, 500);

    return () => clearTimeout(timeout);
  };

  const handleSpaceTypeFilterChange = (value: string) => {
    setSpaceTypeFilter(value);

    const timeout = setTimeout(() => {
      router.push(
        `${pathname}?${createQueryString({
          page: 1, // Reset to first page on filter change
          name: nameFilter || null,
          spaceType: value || null,
        })}`
      );
    }, 200);

    return () => clearTimeout(timeout);
  };

  // Navigate to specific page
  const goToPage = (page: number) => {
    router.push(
      `${pathname}?${createQueryString({
        page,
        name: nameFilter || null,
        spaceType: spaceTypeFilter || null,
      })}`
    );
  };

  // Generate page numbers for pagination
  const generatePagination = (currentPage: number, pageCount: number) => {
    // Show up to 5 page numbers
    const maxVisible = 5;
    let pages: (number | string)[] = [];

    if (pageCount <= maxVisible) {
      // Show all pages if there are 5 or fewer
      pages = Array.from({ length: pageCount }, (_, i) => i + 1);
    } else {
      // Always show first and last page
      if (currentPage <= 3) {
        // Near start
        pages = [1, 2, 3, 4, "...", pageCount];
      } else if (currentPage >= pageCount - 2) {
        // Near end
        pages = [
          1,
          "...",
          pageCount - 3,
          pageCount - 2,
          pageCount - 1,
          pageCount,
        ];
      } else {
        // Middle
        pages = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          pageCount,
        ];
      }
    }

    return pages;
  };

  const pageNumbers = generatePagination(currentPage, pageCount);

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

  const parkingTypes = Object.values(ParkingSpaceType);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center gap-4 py-4">
        <Input
          placeholder="Filter by Name"
          value={nameFilter}
          onChange={(event) => handleNameFilterChange(event.target.value)}
          className="md:max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="md:max-w-sm">
              {spaceTypeFilter !== ""
                ? `Type: ${spaceTypeFilter}`
                : "Filter by Space Type"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Space Types</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {parkingTypes.map((spaceType) => (
              <DropdownMenuRadioItem
                key={spaceType}
                value={spaceType}
                onSelect={() => handleSpaceTypeFilterChange(spaceType)}
                // Remove the 'checked' prop
              >
                {spaceType}
              </DropdownMenuRadioItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuRadioItem
              value="clear"
              onSelect={() => handleSpaceTypeFilterChange("")}
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
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 py-4">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{data.length}</span> of{" "}
          <span className="font-medium">{totalCount}</span> results.
          {pageCount > 1 && (
            <>
              {" "}
              Page <span className="font-medium">{currentPage}</span> of{" "}
              <span className="font-medium">{pageCount}</span>.
            </>
          )}
        </div>

        {pageCount > 1 && (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              Previous
            </Button>

            <div className="hidden md:flex items-center space-x-1">
              {pageNumbers.map((page, i) => (
                <React.Fragment key={i}>
                  {typeof page === "number" ? (
                    <Button
                      variant={currentPage === page ? "default" : "outline"}
                      size="icon"
                      className="w-8 h-8"
                      onClick={() => goToPage(page)}
                    >
                      {page}
                    </Button>
                  ) : (
                    <span className="px-2">...</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage >= pageCount}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
