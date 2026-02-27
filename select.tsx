import * as React from 'react';
import { cn } from '../../lib/utils';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  value?: string;
  onValueChange?: (value: string) => void;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ value, onValueChange, children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = 'Select';

const SelectTrigger = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('relative', className)} {...props}>
      {children}
    </div>
  )
);
SelectTrigger.displayName = 'SelectTrigger';

const SelectValue = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement> & { placeholder?: string }>(
  ({ placeholder, ...props }, ref) => (
    <span ref={ref} {...props}>{placeholder}</span>
  )
);
SelectValue.displayName = 'SelectValue';

const SelectContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { children?: React.ReactNode }>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props}>
      {children}
    </div>
  )
);
SelectContent.displayName = 'SelectContent';

const SelectItem = React.forwardRef<HTMLOptionElement, React.OptionHTMLAttributes<HTMLOptionElement>>(
  ({ className, ...props }, ref) => (
    <option ref={ref} className={cn('', className)} {...props} />
  )
);
SelectItem.displayName = 'SelectItem';

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
