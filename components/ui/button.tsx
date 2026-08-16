import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none cursor-pointer',
  {
    variants: {
      variant: {
        primary:
          'bg-[#127485] text-white hover:bg-[#0e5c6a] focus-visible:ring-[#127485] shadow-sm hover:shadow',
        accent:
          'bg-[#7CB342] text-white hover:bg-[#689F38] focus-visible:ring-[#7CB342] shadow-sm hover:shadow',
        secondary:
          'bg-slate-100 text-slate-800 hover:bg-slate-200 focus-visible:ring-slate-400',
        outline:
          'border-2 border-[#127485] text-[#127485] hover:bg-[#127485]/10 focus-visible:ring-[#127485]',
        ghost:
          'text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-300',
        white:
          'bg-white text-[#127485] hover:bg-slate-50 focus-visible:ring-white shadow-md font-semibold',
      },
      size: {
        sm: 'h-9 px-4 text-sm rounded-lg gap-1.5',
        md: 'h-11 px-6 text-base rounded-xl gap-2',
        lg: 'h-13 px-8 text-lg rounded-xl gap-2.5 font-semibold',
        icon: 'h-10 w-10 rounded-lg p-0',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, id, ...props }, ref) => {
    return (
      <button
        id={id}
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | 'qualified'
    | 'review'
    | 'not_qualified'
    | 'switching'
    | 'active'
    | 'draft'
    | 'future'
    | 'neutral'
    | 'verified'
    | 'urgent';
}

export function Badge({
  className,
  variant = 'neutral',
  children,
  id,
  ...props
}: BadgeProps) {
  const variantStyles = {
    qualified: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    review: 'bg-amber-100 text-amber-900 border-amber-300',
    not_qualified: 'bg-slate-100 text-slate-700 border-slate-300',
    switching: 'bg-indigo-100 text-indigo-900 border-indigo-300 font-bold tracking-wide',
    active: 'bg-teal-50 text-[#127485] border-teal-200',
    draft: 'bg-slate-100 text-slate-700 border-slate-200',
    future: 'bg-purple-100 text-purple-900 border-purple-300',
    neutral: 'bg-slate-100 text-slate-800 border-slate-200',
    verified: 'bg-blue-50 text-blue-800 border-blue-200',
    urgent: 'bg-rose-100 text-rose-800 border-rose-300 font-bold',
  };

  return (
    <div
      id={id}
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border whitespace-nowrap',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function ClientApprovalTag({
  claimName,
  className = '',
}: {
  claimName: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200/80 rounded-md',
        className
      )}
      title="This proposed benefit requires explicit client verification before final publication."
    >
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
      {claimName} • <span className="font-semibold">Client Approval Required</span>
    </span>
  );
}
