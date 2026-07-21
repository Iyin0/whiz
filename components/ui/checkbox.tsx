'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';

import { cn } from '@/lib/utils';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow transition-[background-color,border-color,box-shadow,transform] duration-200 hover:border-[#04af9f] hover:bg-[#04af9f]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#04af9f] focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-90 disabled:cursor-not-allowed disabled:scale-100 disabled:opacity-50 data-[state=checked]:border-[#04af9f] data-[state=checked]:bg-[#04af9f] data-[state=checked]:text-white motion-reduce:transform-none motion-reduce:transition-none',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn('flex items-center justify-center text-current')}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
