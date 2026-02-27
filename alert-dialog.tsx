// Alert Dialog - simplified version based on Dialog
export {
  Dialog as AlertDialog,
  DialogTrigger as AlertDialogTrigger,
  DialogContent as AlertDialogContent,
  DialogHeader as AlertDialogHeader,
  DialogFooter as AlertDialogFooter,
  DialogTitle as AlertDialogTitle,
  DialogDescription as AlertDialogDescription,
} from './dialog';

// Additional Alert Dialog specific exports
import * as React from 'react';
import { cn } from '../../lib/utils';
import { DialogContext } from './dialog';

const AlertDialogAction = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const { onOpenChange } = React.useContext(DialogContext);
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex h-10 items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          className
        )}
        onClick={() => onOpenChange(false)}
        {...props}
      />
    );
  }
);
AlertDialogAction.displayName = 'AlertDialogAction';

const AlertDialogCancel = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => {
    const { onOpenChange } = React.useContext(DialogContext);
    return (
      <button
        ref={ref}
        className={cn(
          'mt-2 sm:mt-0 inline-flex h-10 items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-sm font-semibold ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          className
        )}
        onClick={() => onOpenChange(false)}
        {...props}
      />
    );
  }
);
AlertDialogCancel.displayName = 'AlertDialogCancel';

export { AlertDialogAction, AlertDialogCancel };
