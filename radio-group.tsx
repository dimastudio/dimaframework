import * as React from 'react';
import { cn } from '../../lib/utils';

// Simple Radio Group implementation
interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
}

const RadioGroupContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
}>({});

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, defaultValue, children, ...props }, ref) => {
    const [selectedValue, setSelectedValue] = React.useState(value || defaultValue);
    
    const handleValueChange = React.useCallback((newValue: string) => {
      setSelectedValue(newValue);
      onValueChange?.(newValue);
    }, [onValueChange]);
    
    return (
      <RadioGroupContext.Provider value={{ value: selectedValue, onValueChange: handleValueChange }}>
        <div
          ref={ref}
          className={cn('grid gap-2', className)}
          role="radiogroup"
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = 'RadioGroup';

const RadioGroupItem = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { value: string }
>(({ className, value, ...props }, ref) => {
  const context = React.useContext(RadioGroupContext);
  const isChecked = context.value === value;
  
  return (
    <input
      type="radio"
      ref={ref}
      value={value}
      checked={isChecked}
      onChange={() => context.onValueChange?.(value)}
      name={context.name}
      className={cn(
        'h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 accent-primary',
        className
      )}
      {...props}
    />
  );
});
RadioGroupItem.displayName = 'RadioGroupItem';

export { RadioGroup, RadioGroupItem };
