import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "tw:group/button tw:inline-flex tw:shrink-0 tw:items-center tw:justify-center tw:rounded-md tw:border tw:border-transparent tw:bg-clip-padding tw:text-sm tw:font-medium tw:whitespace-nowrap tw:transition-all tw:outline-none tw:select-none tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/80 tw:active:bg-primary/90",
        outline:
          "tw:text-primary tw:border-primary tw:bg-background tw:shadow-xs tw:hover:bg-primary tw:hover:text-background tw:aria-expanded:bg-muted tw:aria-expanded:text-foreground",
        secondary:
          "tw:bg-secondary tw:text-secondary-foreground tw:hover:bg-secondary/80 tw:active:bg-secondary/90 tw:aria-expanded:bg-secondary tw:aria-expanded:text-secondary-foreground",
        ghost:
          "tw:hover:bg-muted tw:hover:text-foreground tw:aria-expanded:bg-muted tw:aria-expanded:text-foreground",
        destructive:
          "tw:bg-destructive tw:text-destructive-foreground tw:hover:bg-destructive/80 tw:active:bg-destructive/90 tw:focus-visible:border-destructive/40 tw:focus-visible:ring-destructive/20",
        link: "tw:text-primary tw:underline-offset-4 tw:hover:underline",
      },
      size: {
        default:
          "tw:h-9 tw:gap-1.5 tw:px-2.5 tw:in-data-[slot=button-group]:rounded-md tw:has-data-[icon=inline-end]:pr-2 tw:has-data-[icon=inline-start]:pl-2",
        xs: "tw:h-6 tw:gap-1 tw:rounded-md tw:px-2 tw:text-xs tw:in-data-[slot=button-group]:rounded-md tw:has-data-[icon=inline-end]:pr-1.5 tw:has-data-[icon=inline-start]:pl-1.5 tw:[&_svg:not([class*='size-'])]:size-3",
        sm: "tw:h-8 tw:gap-1 tw:rounded-md tw:px-2.5 tw:in-data-[slot=button-group]:rounded-md tw:has-data-[icon=inline-end]:pr-1.5 tw:has-data-[icon=inline-start]:pl-1.5",
        lg: "tw:h-10 tw:gap-1.5 tw:px-2.5 tw:has-data-[icon=inline-end]:pr-3 tw:has-data-[icon=inline-start]:pl-3",
        icon: "tw:size-9",
        "icon-xs":
          "tw:size-6 tw:rounded-[min(var(--radius-md),8px)] tw:in-data-[slot=button-group]:rounded-md tw:[&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "tw:size-8 tw:rounded-[min(var(--radius-md),10px)] tw:in-data-[slot=button-group]:rounded-md",
        "icon-lg": "tw:size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export type ButtonVariantsProps = VariantProps<typeof buttonVariants>;
