"use client";

import { format } from "date-fns";
import { CalendarIcon, X } from "lucide-react";
import { parseAsString, useQueryStates } from "nuqs";
import * as React from "react";
import type { DateRange } from "react-day-picker";

import { Button, type ButtonProps } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, formatToLocalDate } from "@/lib/utils";

interface DateRangePickerProps
  extends React.ComponentPropsWithoutRef<typeof PopoverContent> {
  defaultDateRange?: DateRange;
  placeholder?: string;
  triggerVariant?: Exclude<ButtonProps["variant"], "destructive" | "link">;
  triggerSize?: Exclude<ButtonProps["size"], "icon">;
  triggerClassName?: string;
  shallow?: boolean;
  showClear?: boolean;
}

export function DateRangePicker({
  defaultDateRange,
  placeholder = "Шүүлт хийх хугацааны интервал сонгох",
  triggerVariant = "outline",
  triggerSize = "default",
  triggerClassName,
  shallow = true,
  showClear = true,
  className,
  ...props
}: DateRangePickerProps) {
  const [dateParams, setDateParams] = useQueryStates(
    {
      from: parseAsString.withDefault(
        defaultDateRange?.from?.toISOString() ?? ""
      ),
      to: parseAsString.withDefault(defaultDateRange?.to?.toISOString() ?? ""),
    },
    {
      clearOnDefault: true,
      shallow,
    }
  );

  const date = React.useMemo(() => {
    function parseDate(dateString: string | null) {
      if (!dateString) return undefined;
      const parsedDate = new Date(dateString);
      return Number.isNaN(parsedDate.getTime()) ? undefined : parsedDate;
    }

    return {
      from: parseDate(dateParams.from) ?? defaultDateRange?.from,
      to: parseDate(dateParams.to) ?? defaultDateRange?.to,
    };
  }, [dateParams, defaultDateRange]);

  return (
    <div className="flex gap-2 items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={triggerVariant}
            size={triggerSize}
            className={cn(
              "w-full justify-start gap-2 truncate text-left font-normal",
              !date && "text-muted-foreground",
              triggerClassName
            )}
          >
            <CalendarIcon className="size-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className={cn("w-auto p-0", className)}
          {...props}
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(newDateRange) => {
              if (!newDateRange?.from) {
                void setDateParams({ from: "", to: "" });
                return;
              }

              const maxEndDate = new Date(newDateRange.from);
              maxEndDate.setMonth(maxEndDate.getMonth() + 1);
              maxEndDate.setDate(maxEndDate.getDate() - 1);

              void setDateParams({
                from: formatToLocalDate(newDateRange.from),
                to:
                  newDateRange.to && newDateRange.to <= maxEndDate
                    ? formatToLocalDate(newDateRange.to)
                    : "", // Allow single-day selection
              });
            }}
            disabled={(date) => {
              if (!dateParams.from) return false;

              const fromDate = new Date(dateParams.from);
              const maxDate = new Date(fromDate);
              maxDate.setMonth(maxDate.getMonth() + 1);
              maxDate.setDate(maxDate.getDate() - 1);

              return date < fromDate || date > maxDate;
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      {showClear && dateParams.from && dateParams.to && (
        <X
          onClick={() => {
            void setDateParams({ from: "", to: "" });
          }}
          size={16}
          color="black"
          className="cursor-pointer"
        />
      )}
    </div>
  );
}
