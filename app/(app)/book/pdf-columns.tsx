"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import type { Pdf } from "@/types/pdf";

export const pdfColumns: ColumnDef<Pdf>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "filename",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        File
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const pdf = row.original;
      return (
        <p>{pdf.filename}</p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div className="capitalize">{String(row.getValue("status"))}</div>,
  },
  {
    id: "createdAt",
    header: "Uploaded",
    cell: ({ row }) => {
      const createdAt = row.original.createdAt;
      if (!createdAt) return <span className="text-muted-foreground">—</span>;
      return <span>{new Date(createdAt).toLocaleString()}</span>;
    },
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const pdf = row.original;
      return (
        <div className="flex justify-end gap-2">
          <Button asChild size="sm" variant="secondary">
            <a href={pdf.originalPdfUrl} target="_blank" rel="noreferrer">
              <ExternalLink className="size-4" />
            </a>
          </Button>
        </div>
      );
    },
  },
];
