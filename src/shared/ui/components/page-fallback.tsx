import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/components/card";
import { cn } from "@/shared/ui/lib/utils";
import {
  Item,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/shared/ui/components/item";

type PageFallbackProps = {
  title?: string;
  description?: string;
  className?: string;
};

export function PageFallback({
  title,
  description,
  className,
}: PageFallbackProps) {
  return (
    <Card size="sm" className={cn("w-full max-w-lg mx-auto", className)}>
      {title || description ? (
        <CardHeader>
          {title ? <CardTitle>{title}</CardTitle> : null}
          {description ? (
            <CardDescription>{description}</CardDescription>
          ) : null}
        </CardHeader>
      ) : null}
      <CardContent>
        <ItemGroup className="rounded-lg border border-dashed bg-table">
          <Item
            size="sm"
            className="bg-transparent px-4 py-8 justify-center gap-1.5"
          >
            <ItemTitle>Не удалось загрузить данные</ItemTitle>
            <ItemDescription className="text-sm text-muted-foreground">
              Попробуйте обновить страницу чуть позже.
            </ItemDescription>
          </Item>
        </ItemGroup>
      </CardContent>
    </Card>
  );
}
