import { cn } from "@/lib/utils"

export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-lg border border-neutral-200 bg-white text-neutral-950 shadow-xs dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50",
        className,
      )}
      data-slot="card"
      {...props}
    />
  )
}

export function CardHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      data-slot="card-header"
      {...props}
    />
  )
}

export function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    // oxlint-disable-next-line jsx-a11y/heading-has-content -- children come through props
    <h3
      className={cn(
        "text-2xl leading-none font-semibold tracking-tight",
        className,
      )}
      data-slot="card-title"
      {...props}
    />
  )
}

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-sm text-neutral-500 dark:text-neutral-400",
        className,
      )}
      data-slot="card-description"
      {...props}
    />
  )
}

export function CardContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("p-6 pt-0", className)}
      data-slot="card-content"
      {...props}
    />
  )
}

export function CardFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center p-6 pt-0", className)}
      data-slot="card-footer"
      {...props}
    />
  )
}

export function CardAction({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      data-slot="card-action"
      {...props}
    />
  )
}
