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
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
import { AccountType, type College, type GPOAccount } from "@prisma/client";
import AccountCreationDialog from "./account-creation-dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";

export type GPOAccountData = GPOAccount & {
  collegeName: College | null;
};

export function AccountsTable({
  data,
  colleges,
  totalCount = 0,
  pageCount = 1,
  currentPage = 1,
}: {
  data: GPOAccountData[];
  colleges: College[];
  totalCount: number;
  pageCount: number;
  currentPage: number;
}) {
  const columns: ColumnDef<GPOAccountData>[] = [
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
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <div
          className={`${
            row.getValue("isActive") ? "text-green-500" : "text-destructive"
          }`}
        >{`${row.getValue("isActive") === true ? "ACTIVE" : "INACTIVE"}`}</div>
      ),
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [gpoNumberFilter, setGpoNumberFilter] = React.useState<string>(
    searchParams.get("gatePassNumber") || ""
  );

  const [emailFilter, setEmailFilter] = React.useState<string>(
    searchParams.get("email") || ""
  );

  const [accountTypeFilter, setAccountTypeFilter] = React.useState<
    string | undefined
  >(searchParams.get("accountType") || "");

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
  const handleGpoNumberFilterChange = (value: string) => {
    setGpoNumberFilter(value);

    const timeout = setTimeout(() => {
      router.push(
        `${pathname}?${createQueryString({
          page: 1, // Reset to first page on filter change
          email: emailFilter || null,
          gatePassNumber: value || null,
          accountType: accountTypeFilter || null,
        })}`
      );
    }, 500);

    return () => clearTimeout(timeout);
  };

  // Handle filter changes with debounce
  const handleEmailFilterChange = (value: string) => {
    setEmailFilter(value);

    const timeout = setTimeout(() => {
      router.push(
        `${pathname}?${createQueryString({
          page: 1, // Reset to first page on filter change
          email: value || null,
          gatePassNumber: gpoNumberFilter || null,
          accountType: accountTypeFilter || null,
        })}`
      );
    }, 500);

    return () => clearTimeout(timeout);
  };

  // Handle filter changes with debounce
  const handleAccountTypeFilterChange = (value: string) => {
    setAccountTypeFilter(value);

    const timeout = setTimeout(() => {
      router.push(
        `${pathname}?${createQueryString({
          page: 1, // Reset to first page on filter change
          email: emailFilter || null,
          gatePassNumber: gpoNumberFilter || null,
          accountType: value || null,
        })}`
      );
    }, 500);

    return () => clearTimeout(timeout);
  };

  // Navigate to specific page
  const goToPage = (page: number) => {
    router.push(
      `${pathname}?${createQueryString({
        page,
        email: emailFilter || null,
        gatePassNumber: gpoNumberFilter || null,
        accountType: accountTypeFilter || null,
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

  const accountTypes = Object.values(AccountType);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center gap-4 py-4">
        <Input
          placeholder="Filter by Gate Pass Number"
          value={gpoNumberFilter}
          onChange={(event) => handleGpoNumberFilterChange(event.target.value)}
          className="max-w-sm"
        />
        <Input
          placeholder="Filter by Corporate Email"
          value={emailFilter}
          onChange={(event) => handleEmailFilterChange(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="md:max-w-sm">
              {accountTypeFilter !== ""
                ? `Account Type: ${accountTypeFilter}`
                : "Filter by Account Type"}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {accountTypes.map((type) => (
              <DropdownMenuRadioItem
                key={type}
                value={type}
                onSelect={() => handleAccountTypeFilterChange(type)}
                // Remove the 'checked' prop
              >
                {type}
              </DropdownMenuRadioItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuRadioItem
              value="clear"
              onSelect={() => handleAccountTypeFilterChange("")}
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
        <AccountCreationDialog colleges={colleges} />
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
                    router.push(`/admin/dashboard/accounts/${row.original.id}`)
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
