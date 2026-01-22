<<<<<<< HEAD
import * as React from "react"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants, type Button } from "@/components/ui/button"
=======
import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants, type Button } from "@/components/ui/button";
>>>>>>> d2ca8fadbde81a3c5a8fbb5f0743a7b65d19c913

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
<<<<<<< HEAD
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
=======
  );
}

function PaginationContent({ className, ...props }: React.ComponentProps<"ul">) {
>>>>>>> d2ca8fadbde81a3c5a8fbb5f0743a7b65d19c913
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
<<<<<<< HEAD
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
=======
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">;

function PaginationLink({ className, isActive, size = "icon", ...props }: PaginationLinkProps) {
>>>>>>> d2ca8fadbde81a3c5a8fbb5f0743a7b65d19c913
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
<<<<<<< HEAD
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
=======
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
>>>>>>> d2ca8fadbde81a3c5a8fbb5f0743a7b65d19c913
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
<<<<<<< HEAD
  )
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
=======
  );
}

function PaginationNext({ className, ...props }: React.ComponentProps<typeof PaginationLink>) {
>>>>>>> d2ca8fadbde81a3c5a8fbb5f0743a7b65d19c913
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
<<<<<<< HEAD
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
=======
  );
}

function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
>>>>>>> d2ca8fadbde81a3c5a8fbb5f0743a7b65d19c913
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
<<<<<<< HEAD
  )
=======
  );
>>>>>>> d2ca8fadbde81a3c5a8fbb5f0743a7b65d19c913
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
<<<<<<< HEAD
}
=======
};
>>>>>>> d2ca8fadbde81a3c5a8fbb5f0743a7b65d19c913
