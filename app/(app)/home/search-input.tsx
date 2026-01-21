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
  )
}

