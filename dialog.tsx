import * as React from 'react';
import { cn } from '../../lib/utils';

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  const [isOpen, setIsOpen] = React.useState(open || false);
  
  React.useEffect(() => {
    if (open !== undefined) setIsOpen(open);
  }, [open]);
  
  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
  };
  
  return (
    <DialogContext.Provider value={{ open: isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
};

const DialogContext = React.createContext<{ open: boolean; onOpenChange: (open: boolean) => void }>({
  open: false,
  onOpenChange: () => {},
});

const DialogTrigger: React.FC<{ children: React.ReactNode; asChild?: boolean }> = ({ children, asChild }) => {
  const { onOpenChange } = React.useContext(DialogContext);
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
      onClick: () => onOpenChange(true),
    });
  }
  
  return <button onClick={() => onOpenChange(true)}>{children}</button>;
};

const DialogPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { open } = React.useContext(DialogContext);
  if (!open) return null;
  
  return <>{children}</>;
};

const DialogOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { onOpenChange } = React.useContext(DialogContext);
    
    return (
      <div
        ref={ref}
        className={cn(
          'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
          className
        )}
        onClick={() => onOpenChange(false)}
        {...props}
      />
    );
  }
);
DialogOverlay.displayName = 'DialogOverlay';

const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <DialogPortal>
        <DialogOverlay />
        <div
          ref={ref}
          className={cn(
            'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg',
            className
          )}
          {...props}
        >
          {children}
        </div>
      </DialogPortal>
    );
  }
);
DialogContent.displayName = 'DialogContent';

const DialogHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-right', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 sm:space-x-reverse', className)} {...props} />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props} />
  )
);
DialogTitle.displayName = 'DialogTitle';

const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
);
DialogDescription.displayName = 'DialogDescription';

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
