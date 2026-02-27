import * as React from 'react';
import { cn } from '../../lib/utils';

const Pagination = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
  )
);
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn('', className)} {...props} />
);
PaginationItem.displayName = 'PaginationItem';

const PaginationLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement> & { isActive?: boolean }>(
  ({ className, isActive, ...props }, ref) => (
    <a
      ref={ref}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-foreground h-9 px-3',
        isActive && 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground',
        className
      )}
      {...props}
    />
  )
);
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, ...props }, ref) => (
    <a
      ref={ref}
      className={cn('inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-foreground h-9 px-3 gap-1', className)}
      {...props}
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
      <span>قبلی</span>
    </a>
  )
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, ...props }, ref) => (
    <a
      ref={ref}
      className={cn('inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-foreground h-9 px-3 gap-1', className)}
      {...props}
    >
      <span>بعدی</span>
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </a>
  )
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span aria-hidden className={cn('flex h-9 w-9 items-center justify-center', className)} {...props}>
    ...
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
