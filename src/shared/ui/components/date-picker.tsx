"use client";

import { format } from "date-fns";
import type { Locale } from "date-fns";
import { ru } from "date-fns/locale";
import { IconArrowDown } from "@tabler/icons-react";

import { Button } from "@/shared/ui/components/button";
import { Calendar } from "@/shared/ui/components/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/components/popover";
import { cn } from "@/shared/ui/lib/utils";
import { useCallback, useState } from "react";

type ButtonProps = Omit<
  React.ComponentProps<typeof Button>,
  "children" | "value" | "onChange"
>;

type CalendarProps = Omit<
  React.ComponentProps<typeof Calendar>,
  "mode" | "selected" | "onSelect" | "defaultMonth"
>;

export type DatePickerProps = ButtonProps & {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: React.ReactNode;
  formatStr?: string;
  locale?: Locale;
  calendarProps?: CalendarProps;
};

export function DatePicker({
  value,
  onChange,
  placeholder = "Выберите дату",
  formatStr = "dd.MM.yyyy",
  locale = ru,
  className,
  calendarProps,
  ...buttonProps
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const handleSelect = useCallback(
    (date: Date | undefined) => {
      onChange?.(date);
      setOpen(false);
    },
    [onChange],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          data-empty={!value}
          className={cn(
            "justify-between text-left data-[empty=true]:text-muted-foreground bg-field",
            className,
          )}
          {...buttonProps}
        >
          {value ? (
            format(value, formatStr, { locale })
          ) : (
            <span>{placeholder}</span>
          )}
          <IconArrowDown className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleSelect}
          defaultMonth={value}
          locale={locale}
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  );
}
