import * as React from 'react';
import { cn } from '../../lib/utils';

interface DropdownMenuProps {
  children: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children }) => {
  return <>{children}</>;
};

interface DropdownMenuTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ children, asChild, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const menuRef = React.useRef<HTMLDivElement>(null);
    
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    return (
      <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
        <div ref={menuRef} className="relative inline-block">
          {asChild && React.isValidElement(children) ? (
            React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
              onClick: () => setIsOpen(!isOpen),
            })
          ) : (
            <button ref={ref} onClick={() => setIsOpen(!isOpen)} {...props}>
              {children}
            </button>
          )}
        </div>
      </DropdownMenuContext.Provider>
    );
  }
);
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

const DropdownMenuContext = React.createContext<{ isOpen: boolean; setIsOpen: (open: boolean) => void }>({
  isOpen: false,
  setIsOpen: () => {},
});

const DropdownMenuContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { isOpen, setIsOpen } = React.useContext(DropdownMenuContext);
    
    if (!isOpen) return null;
    
    return (
      <div
        ref={ref}
        className={cn(
          'absolute left-0 top-full z-50 mt-2 min-w-[8rem] overflow-hidden rounded-lg border bg-popover p-1 text-popover-foreground shadow-lg',
          className
        )}
        {...props}
      >
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<{ onClick?: () => void }>, {
              onClick: () => setIsOpen(false),
            });
          }
          return child;
        })}
      </div>
    );
  }
);
DropdownMenuContent.displayName = 'DropdownMenuContent';

const DropdownMenuLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('px-2 py-1.5 text-sm font-semibold', className)} {...props} />
  )
);
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

const DropdownMenuItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
        className
      )}
      {...props}
    />
  )
);
DropdownMenuItem.displayName = 'DropdownMenuItem';

const DropdownMenuSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('-mx-1 my-1 h-px bg-muted', className)} {...props} />
  )
);
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
};
