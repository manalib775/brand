
import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const notificationBadgeVariants = cva(
  "absolute -top-1 -right-1 flex items-center justify-center text-xs font-bold text-white rounded-full",
  {
    variants: {
      variant: {
        default: "bg-red-500",
        secondary: "bg-blue-500",
        outline: "bg-white text-primary border border-primary",
      },
      size: {
        default: "h-5 w-5 min-w-[1.25rem]",
        sm: "h-4 w-4 min-w-[1rem] text-[0.65rem]",
        lg: "h-6 w-6 min-w-[1.5rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface NotificationBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof notificationBadgeVariants> {
  count?: number;
  max?: number;
}

const NotificationBadge = React.forwardRef<HTMLSpanElement, NotificationBadgeProps>(
  ({ className, variant, size, count = 0, max = 99, ...props }, ref) => {
    if (count === 0) return null;
    
    const displayCount = count > max ? `${max}+` : count;
    
    return (
      <span
        ref={ref}
        className={cn(notificationBadgeVariants({ variant, size, className }))}
        {...props}
      >
        {displayCount}
      </span>
    );
  }
);

NotificationBadge.displayName = "NotificationBadge";

export { NotificationBadge };
