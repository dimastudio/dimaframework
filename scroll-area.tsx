import * as React from 'react';
import { cn } from '../../lib/utils';

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('relative', className)} {...props}>
      <div className="h-full w-full overflow-auto [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb]:hover:bg-border/80">
        {children}
      </div>
    </div>
  )
);
ScrollArea.displayName = 'ScrollArea';

export { ScrollArea };
