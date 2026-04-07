import { Card, CardContent } from "@/shared/ui/components/card";
import { Item, ItemContent, ItemTitle } from "@/shared/ui/components/item";

export default function NotFound() {
  return (
    <Card className="min-h-[60vh] w-full grid place-items-center">
      <CardContent>
        <Item className="flex flex-col items-center justify-center gap-3">
          <ItemTitle className="text-7xl font-semibold text-warning">
            404
          </ItemTitle>
          <ItemContent className="text-center">
            <h1 className="text-xl font-medium">Такой страницы нет</h1>
            <p className="text-sm text-muted-foreground">
              Но есть много других полезных страниц
            </p>
          </ItemContent>
        </Item>
      </CardContent>
    </Card>
  );
}
