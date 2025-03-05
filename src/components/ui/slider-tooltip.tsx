"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  tooltipFormatter?: (values: number[]) => React.ReactNode;
}

const SliderTooltip = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, tooltipFormatter, ...props }, ref) => {
  const [isGrabbing, setIsGrabbing] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [activeThumb, setActiveThumb] = React.useState<number | null>(null);
  const [values, setValues] = React.useState(
    (props.defaultValue as number[]) || [props.min || 0, props.max || 100],
  );

  React.useEffect(() => {
    const handlePointerUp = () => {
      setIsGrabbing(false);
      setOpen(false);
      setActiveThumb(null);
    };
    const handlePointerCancel = () => {
      setIsGrabbing(false);
      setOpen(false);
      setActiveThumb(null);
    };

    if (isGrabbing) {
      document.addEventListener("pointerup", handlePointerUp);
      document.addEventListener("pointercancel", handlePointerCancel);
    }

    return () => {
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointercancel", handlePointerCancel);
    };
  }, [isGrabbing]);

  const handleValueChange = (newValues: number[]) => {
    setValues(newValues);
    if (props.onValueChange) {
      props.onValueChange(newValues);
    }
  };

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className,
      )}
      onPointerDown={() => {
        setIsGrabbing(true);
        setOpen(true);
      }}
      {...props}
      onValueChange={handleValueChange}
    >
      <SliderPrimitive.Track className="relative h-0.5 w-full grow overflow-hidden rounded-full bg-primary/20">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {[0, 1].map((index) => (
        <TooltipProvider key={index}>
          <Tooltip open={open && activeThumb === index}>
            <TooltipTrigger asChild>
              <SliderPrimitive.Thumb
                className={cn(
                  "block h-[10px] w-[10px] rounded-full border border-primary bg-muted-foreground shadow transition-colors hover:border-card focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                  isGrabbing && activeThumb === index
                    ? "cursor-grabbing"
                    : "cursor-grab",
                )}
                onMouseEnter={() => {
                  setOpen(true);
                  setActiveThumb(index);
                }}
                onMouseLeave={() => !isGrabbing && setOpen(false)}
                onPointerDown={() => setActiveThumb(index)}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs font-semibold">
                {tooltipFormatter
                  ? tooltipFormatter(values)
                  : `${values[index]}`}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </SliderPrimitive.Root>
  );
});

SliderTooltip.displayName = SliderPrimitive.Root.displayName;

export { SliderTooltip };
