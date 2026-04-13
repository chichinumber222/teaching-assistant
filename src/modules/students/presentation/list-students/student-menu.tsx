"use client";

import Link from "next/link";
import React from "react";
import { Student } from "@/modules/students/domain/student";
import { APP_ROUTES } from "@/shared/config/routes";
import { Button } from "@/shared/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/components/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/components/popover";
import { cn } from "@/shared/ui/lib/utils";

const MenuTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(function MenuTrigger({ className, ...props }, ref) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      {...props}
      ref={ref}
      className={cn(
        "text-muted-foreground hover:bg-muted hover:text-foreground",
        className,
      )}
      aria-label="Открыть меню действий"
    >
      <span aria-hidden="true">⋮</span>
    </Button>
  );
});

type StudentActionsProps = {
  assistantHref: string;
  onDeleteStudent: () => void;
};

const StudentActions = ({
  assistantHref,
  onDeleteStudent,
}: StudentActionsProps) => {
  return (
    <>
      <Button asChild variant="ghost" size="sm">
        <Link href={assistantHref}>ИИ-ассистент</Link>
      </Button>
      <Button
        type="button"
        variant="destructive"
        size="sm"
        onClick={onDeleteStudent}
      >
        Удалить ученика
      </Button>
    </>
  );
};

export type TableCellMenuProps = {
  student: Student;
};

export function TableActionsMenu({ student }: TableCellMenuProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <MenuTrigger />
      </PopoverTrigger>

      <PopoverContent align="end" className={"p-1.5"}>
        <div className="flex flex-col gap-1">
          <StudentActions
            assistantHref={APP_ROUTES.studentAssistant(student.id)}
            onDeleteStudent={() => {}}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export type ItemActionsMenuProps = {
  student: Student;
};

export function ItemActionsMenu({ student }: ItemActionsMenuProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <MenuTrigger />
      </DialogTrigger>
      <DialogContent
        className={
          "w-full left-0 right-0 top-auto bottom-0 translate-x-0 translate-y-0 max-w-none rounded-none rounded-t-2xl px-4 pt-4 pb-6"
        }
      >
        <DialogHeader>
          <DialogTitle>Действия с учеником</DialogTitle>
          <DialogDescription className="[overflow-wrap:anywhere] line-clamp-2">
            {student.fullName}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <StudentActions
            assistantHref={APP_ROUTES.studentAssistant(student.id)}
            onDeleteStudent={() => {}}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
