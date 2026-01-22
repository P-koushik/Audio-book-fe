<<<<<<< HEAD
"use client"

import * as React from "react"
=======
"use client";

import * as React from "react";
>>>>>>> d2ca8fadbde81a3c5a8fbb5f0743a7b65d19c913
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
<<<<<<< HEAD
} from "@tanstack/react-table"
=======
} from "@tanstack/react-table";
>>>>>>> d2ca8fadbde81a3c5a8fbb5f0743a7b65d19c913

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
<<<<<<< HEAD
} from "@/components/ui/table"

type DataTableProps<TData, TValue> = {
  data: TData[]
  columns: ColumnDef<TData, TValue>[]
}

export function DataTable<TData, TValue>({
  data,
  columns,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
=======
} from "@/components/ui/table";

type DataTableProps<TData, TValue> = {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
};

export function DataTable<TData, TValue>({ data, columns }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
>>>>>>> d2ca8fadbde81a3c5a8fbb5f0743a7b65d19c913

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
<<<<<<< HEAD
  })
=======
  });
>>>>>>> d2ca8fadbde81a3c5a8fbb5f0743a7b65d19c913

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
<<<<<<< HEAD
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
=======
                      : flexRender(header.column.columnDef.header, header.getContext())}
>>>>>>> d2ca8fadbde81a3c5a8fbb5f0743a7b65d19c913
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
<<<<<<< HEAD
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
=======
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
>>>>>>> d2ca8fadbde81a3c5a8fbb5f0743a7b65d19c913
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
<<<<<<< HEAD
  )
}

=======
  );
}
>>>>>>> d2ca8fadbde81a3c5a8fbb5f0743a7b65d19c913
