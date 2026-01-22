<<<<<<< HEAD
"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

type SearchInputProps = Omit<
  React.ComponentProps<typeof Input>,
  "type" | "value" | "onChange"
> & {
  value?: string
  onValueChange?: (value: string) => void
}
=======
"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchInputProps = Omit<React.ComponentProps<typeof Input>, "type" | "value" | "onChange"> & {
  value?: string;
  onValueChange?: (value: string) => void;
};
>>>>>>> d2ca8fadbde81a3c5a8fbb5f0743a7b65d19c913

export function SearchInput({
  className,
  value,
  onValueChange,
  placeholder = "Search...",
  ...props
}: SearchInputProps) {
  return (
    <Input
      type="search"
      value={value}
      onChange={(event) => onValueChange?.(event.target.value)}
      placeholder={placeholder}
      className={cn(className)}
      {...props}
    />
<<<<<<< HEAD
  )
}

=======
  );
}
>>>>>>> d2ca8fadbde81a3c5a8fbb5f0743a7b65d19c913
