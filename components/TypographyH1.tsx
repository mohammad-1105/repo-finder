import { cn } from "@/lib/utils";

export function TypographyH1({
  children,
  className,
}: {
  children: any;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        " text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
}
