import * as React from "react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "tw:peer tw:size-4 tw:shrink-0 tw:rounded-sm tw:border tw:border-input tw:shadow-xs tw:outline-none tw:transition-shadow tw:dark:bg-input/30 tw:data-[state=checked]:bg-primary tw:data-[state=checked]:border-primary tw:data-[state=checked]:text-primary-foreground tw:dark:data-[state=checked]:bg-primary tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-destructive/20 tw:dark:aria-invalid:ring-destructive/40 tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="tw:flex tw:items-center tw:justify-center tw:text-current tw:transition-none"
      >
        <CheckIcon className="tw:size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
