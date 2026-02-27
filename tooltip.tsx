import * as React from 'react';
import { cn } from '../../lib/utils';

interface TooltipProviderProps {
  children: React.ReactNode;
  delayDuration?: number;
}

const TooltipProvider: React.FC<TooltipProviderProps> = ({ children }) => {
  return <>{children}</>;
};

interface TooltipProps {
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children }) => {
  return <>{children}</>;
};

const TooltipTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, ...props }, ref) => {
    const [showTooltip, setShowTooltip] = React.useState(false);
    
    return (
      <TooltipContext.Provider value={{ showTooltip, setShowTooltip }}>
        <button
          ref={ref}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          className="relative inline-block"
          {...props}
        >
          {children}
        </button>
      </TooltipContext.Provider>
    );
  }
);
TooltipTrigger.displayName = 'TooltipTrigger';

const TooltipContext = React.createContext<{ showTooltip: boolean; setShowTooltip: (show: boolean) => void }>({
  showTooltip: false,
  setShowTooltip: () => {},
});

const TooltipContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { showTooltip } = React.useContext(TooltipContext);
    
    if (!showTooltip) return null;
    
    return (
      <div
        ref={ref}
        className={cn(
          'absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TooltipContent.displayName = 'TooltipContent';

export { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent };
