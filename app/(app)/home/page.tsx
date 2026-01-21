"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { columns, Payment } from "./payments-table";
import { usePanel } from "@/components/ui/panel";

import { HugeiconsIcon } from '@hugeicons/react'
import { Add02Icon } from '@hugeicons/core-free-icons'
import { NativeSelect } from "@/components/ui/native-select";
import { SearchInput } from "./search-input";
import { Pagination } from "@/components/ui/pagination";

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@example.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@example.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@example.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@example.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@example.com",
  },
];

export default function Home() {
  const [query, setQuery] = React.useState("");
  const { openPanel } = usePanel();
  const filteredData = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return data;
    return data.filter((payment) =>
      payment.email.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  return (
    <div className="flex h-full min-w-0 flex-1 flex-col rounded-md border shadow-md">
      <header className="flex items-center gap-2 p-4">
        <div className="flex min-w-0 flex-1">
          <SearchInput
            className="h-9 rounded-md border-primary bg-primary text-primary-foreground placeholder:text-primary-foreground/70 focus-visible:ring-primary/30"
            value={query}
            onValueChange={setQuery}
          />
        </div>
        <div className="shrink-0">
          <NativeSelect className="w-44 rounded-md border-primary bg-primary text-primary-foreground focus-visible:ring-primary/30" />
        </div>
        <div className="shrink-0">
          <NativeSelect className="w-44 rounded-md border-primary bg-primary text-primary-foreground focus-visible:ring-primary/30" />
        </div>
        <Button
          size="icon"
          className="shrink-0 rounded-md"
          onClick={() =>
            openPanel({
              title: "Panel",
              content: (
                "nothing"
              ),
            })
          }
        >
          <HugeiconsIcon icon={Add02Icon} size={18} fill="true" />
        </Button>
      </header>

      <div className="px-3">
        <DataTable data={filteredData} columns={columns} />
      </div>

      <Pagination />
    </div>
  );
}
