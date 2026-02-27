import * as React from 'react';
import { cn } from '../../lib/utils';

interface AccordionContextValue {
  openItems: string[];
  toggleItem: (value: string) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  defaultValue?: string;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, type = 'single', collapsible = true, defaultValue, children, ...props }, ref) => {
    const [openItems, setOpenItems] = React.useState<string[]>(defaultValue ? [defaultValue] : []);
    
    const toggleItem = (value: string) => {
      if (type === 'single') {
        setOpenItems(prev => prev.includes(value) ? (collapsible ? [] : prev) : [value]);
      } else {
        setOpenItems(prev =>
          prev.includes(value)
            ? prev.filter(v => v !== value)
            : [...prev, value]
        );
      }
    };
    
    return (
      <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
        <div ref={ref} className={cn('space-y-1', className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);
Accordion.displayName = 'Accordion';

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = React.useContext(AccordionContext);
    const isOpen = context?.openItems.includes(value) || false;
    
    return (
      <AccordionItemContext.Provider value={{ isOpen, value }}>
        <div
          ref={ref}
          className={cn('border rounded-lg overflow-hidden', className)}
          data-state={isOpen ? 'open' : 'closed'}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);
AccordionItem.displayName = 'AccordionItem';

const AccordionItemContext = React.createContext<{ isOpen: boolean; value: string } | null>(null);

const AccordionTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    const itemContext = React.useContext(AccordionItemContext);
    const accordionContext = React.useContext(AccordionContext);
    
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'flex w-full items-center justify-between p-4 font-medium transition-all hover:bg-muted [&[data-state=open]>svg]:rotate-180',
          className
        )}
        onClick={() => itemContext && accordionContext?.toggleItem(itemContext.value)}
        data-state={itemContext?.isOpen ? 'open' : 'closed'}
        {...props}
      >
        {children}
        <svg
          className="h-4 w-4 shrink-0 transition-transform duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    );
  }
);
AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const itemContext = React.useContext(AccordionItemContext);
    
    if (!itemContext?.isOpen) return null;
    
    return (
      <div
        ref={ref}
        className={cn('overflow-hidden px-4 pb-4 text-sm', className)}
        data-state={itemContext.isOpen ? 'open' : 'closed'}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
