import * as React from 'react';
import { cn } from '../../lib/utils';

interface SheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const Sheet: React.FC<SheetProps> = ({ open, onOpenChange, children }) => {
  return (
    <SheetContext.Provider value={{ open: open || false, onOpenChange: onOpenChange || (() => {}) }}>
      {children}
    </SheetContext.Provider>
  );
};

const SheetContext = React.createContext<{ open: boolean; onOpenChange: (open: boolean) => void }>({
  open: false,
  onOpenChange: () => {},
});

const SheetTrigger: React.FC<{ children: React.ReactNode; asChild?: boolean }> = ({ children, asChild }) => {
  const { onOpenChange } = React.useContext(SheetContext);
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
      onClick: () => onOpenChange(true),
    });
  }
  
  return <button onClick={() => onOpenChange(true)}>{children}</button>;
};

interface SheetContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: 'left' | 'right' | 'top' | 'bottom';
}

const SheetContent = React.forwardRef<HTMLDivElement, SheetContentProps>(
  ({ className, children, side = 'right', ...props }, ref) => {
    const { open, onOpenChange } = React.useContext(SheetContext);
    
    if (!open) return null;
    
    const sideClasses = {
      left: 'inset-y-0 left-0 h-full w-3/4 border-l data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
      right: 'inset-y-0 right-0 h-full w-3/4 border-r data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
      top: 'inset-x-0 top-0 border-b data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
      bottom: 'inset-x-0 bottom-0 border-t data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
    };
    
    return (
      <>
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => onOpenChange(false)}
        />
        <div
          ref={ref}
          className={cn(
            'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
            sideClasses[side],
            className
          )}
          data-state={open ? 'open' : 'closed'}
          {...props}
        >
          {children}
        </div>
      </>
    );
  }
);
SheetContent.displayName = 'SheetContent';

const SheetHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-right', className)} {...props} />
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 sm:space-x-reverse', className)} {...props} />
);
SheetFooter.displayName = 'SheetFooter';

const SheetTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn('text-lg font-semibold text-foreground', className)} {...props} />
  )
);
SheetTitle.displayName = 'SheetTitle';

const SheetDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
);
SheetDescription.displayName = 'SheetDescription';

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
