import * as React from 'react';
import { cn } from '../../lib/utils';

interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  fallback?: string;
}

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, src, alt, fallback, children, ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);
    
    return (
      <span
        ref={ref}
        className={cn(
          'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
          className
        )}
        {...props}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="aspect-square h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : null}
        {(!src || imageError) && (fallback || children) ? (
          <span className="flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium">
            {fallback || children}
          </span>
        ) : null}
      </span>
    );
  }
);
Avatar.displayName = 'Avatar';

const AvatarImage = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, ...props }, ref) => (
    <img
      ref={ref}
      className={cn('aspect-square h-full w-full object-cover', className)}
      {...props}
    />
  )
);
AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium',
        className
      )}
      {...props}
    />
  )
);
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback };
