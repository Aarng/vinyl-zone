import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils"; 

export const InteractiveHoverButton = React.forwardRef(({ children, className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "group relative w-auto cursor-pointer overflow-hidden rounded-full border bg-background p-2 px-8 text-center font-semibold",
        className
      )}
      {...props}>
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "h-2 w-2 rounded-full transition-all duration-500 group-hover:scale-[100.8]",
            props.ballColor || "bg-primary"
          )}></div>
        <span
          className={cn(
            "inline-block transition-all duration-500 group-hover:translate-x-12 group-hover:opacity-0",
            props.textColor1 || ""
          )}>
          {children}
        </span>
      </div>
      <div
        className={cn(
          "absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-500 group-hover:-translate-x-4 group-hover:opacity-100",
          props.textColor2 || "text-primary-foreground"
        )}>
        <span>{children}</span>
        <ArrowRight />

      </div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";
