import * as React from 'react';
import { cn } from '../../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const alertBoxVariants = cva(
  'rounded-lg border p-4 my-4',
  {
    variants: {
      variant: {
        info: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800',
        warning: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800',
        success: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800',
        danger: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800',
        tip: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-800',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);

const iconColors = {
  info: 'text-blue-500',
  warning: 'text-amber-500',
  success: 'text-green-500',
  danger: 'text-red-500',
  tip: 'text-purple-500',
};

const titles = {
  info: 'اطلاعات',
  warning: 'هشدار',
  success: 'موفقیت',
  danger: 'خطا',
  tip: 'نکته',
};

interface AlertBoxProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertBoxVariants> {
  title?: string;
}

const AlertBox = React.forwardRef<HTMLDivElement, AlertBoxProps>(
  ({ variant = 'info', title, className, children, ...props }, ref) => {
    const Icon = {
      info: InfoIcon,
      warning: AlertTriangleIcon,
      success: CheckCircleIcon,
      danger: XCircleIcon,
      tip: LightbulbIcon,
    }[variant];
    
    return (
      <div ref={ref} className={cn(alertBoxVariants({ variant }), className)} {...props}>
        <div className="flex gap-3">
          <div className={cn('flex-shrink-0 mt-0.5', iconColors[variant])}>
            <Icon className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            {title && <h4 className={cn('font-semibold mb-1', iconColors[variant])}>{title || titles[variant]}</h4>}
            <div className="text-sm text-foreground/80">{children}</div>
          </div>
        </div>
      </div>
    );
  }
);
AlertBox.displayName = 'AlertBox';

// Convenience components
const InfoBox = React.forwardRef<HTMLDivElement, Omit<AlertBoxProps, 'variant'>>(
  ({ title = 'اطلاعات', ...props }, ref) => <AlertBox ref={ref} variant="info" title={title} {...props} />
);
InfoBox.displayName = 'InfoBox';

const WarningBox = React.forwardRef<HTMLDivElement, Omit<AlertBoxProps, 'variant'>>(
  ({ title = 'هشدار', ...props }, ref) => <AlertBox ref={ref} variant="warning" title={title} {...props} />
);
WarningBox.displayName = 'WarningBox';

const SuccessBox = React.forwardRef<HTMLDivElement, Omit<AlertBoxProps, 'variant'>>(
  ({ title = 'موفقیت', ...props }, ref) => <AlertBox ref={ref} variant="success" title={title} {...props} />
);
SuccessBox.displayName = 'SuccessBox';

const DangerBox = React.forwardRef<HTMLDivElement, Omit<AlertBoxProps, 'variant'>>(
  ({ title = 'خطا', ...props }, ref) => <AlertBox ref={ref} variant="danger" title={title} {...props} />
);
DangerBox.displayName = 'DangerBox';

const TipBox = React.forwardRef<HTMLDivElement, Omit<AlertBoxProps, 'variant'>>(
  ({ title = 'نکته', ...props }, ref) => <AlertBox ref={ref} variant="tip" title={title} {...props} />
);
TipBox.displayName = 'TipBox';

// Icons
function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function AlertTriangleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  );
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function XCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function LightbulbIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

export { AlertBox, InfoBox, WarningBox, SuccessBox, DangerBox, TipBox };
