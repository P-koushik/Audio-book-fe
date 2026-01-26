"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { usePanel } from "@/components/ui/panel";

import { HugeiconsIcon } from "@hugeicons/react";
import { Add02Icon } from "@hugeicons/core-free-icons";
import { NativeSelect } from "@/components/ui/native-select";
import { SearchInput } from "../../../components/search-input";
import FileUpload from "@/components/file-upload";
import { useGetAllPdfs } from "@/hooks/api/pdfs";
import { pdfColumns } from "./pdf-columns";

export default function Home() {
  const [query, setQuery] = React.useState("");
  const { openPanel } = usePanel();
  const pdfsQuery = useGetAllPdfs();

  const filteredData = React.useMemo(() => {
    const allPdfs = pdfsQuery.data ?? [];
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return allPdfs;
    return allPdfs.filter((pdf) => pdf.filename.toLowerCase().includes(normalizedQuery));
  }, [pdfsQuery.data, query]);

  return (
    <div className="flex h-full min-w-0 flex-1 flex-col rounded-md border shadow-md">
      <header className="flex items-center gap-2 p-4">
        <div className="flex min-w-0 flex-1">
          <SearchInput
            className="h-9 rounded-md"
            value={query}
            onValueChange={setQuery}
          />
        </div>
        <div className="shrink-0">
          <NativeSelect className="w-44 rounded-md" />
        </div>
        <div className="shrink-0">
          <NativeSelect className="w-44 rounded-md" />
        </div>
        <Button
          size="sm"
          className="shrink-0 rounded-md"
          onClick={() =>
            openPanel({
              title: "File upload",
              content: <FileUpload />,
            })
          }
        >
          <HugeiconsIcon icon={Add02Icon} size={18} fill="true" />
        </Button>
      </header>

      <div className="px-3">
        {pdfsQuery.isLoading ? (
          <div className="py-12 text-center text-sm text-muted-foreground">Loading files…</div>
        ) : pdfsQuery.isError ? (
          <div className="py-12 text-center text-sm text-destructive">
            Failed to load files.
          </div>
        ) : (
          <DataTable data={filteredData} columns={pdfColumns} />
        )}
      </div>
    </div>
  );
}
