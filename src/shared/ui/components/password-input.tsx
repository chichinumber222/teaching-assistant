"use client";

import { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { Button } from "@/shared/ui/components/button";
import { Input } from "@/shared/ui/components/input";
import { cn } from "@/shared/ui/lib/utils";

const PasswordInput = ({
  className,
  ...props
}: React.ComponentProps<"input">) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-sm relative">
      <Input
        {...props}
        className={cn(className, "bg-background")}
        type={showPassword ? "text" : "password"}
      />
      <Button
        className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
        onClick={() => setShowPassword(!showPassword)}
        size="icon"
        type="button"
        variant="ghost"
      >
        {showPassword ? (
          <IconEyeOff className="h-4 w-4 text-muted-foreground" />
        ) : (
          <IconEye className="h-4 w-4 text-muted-foreground" />
        )}
      </Button>
    </div>
  );
};

export { PasswordInput };
