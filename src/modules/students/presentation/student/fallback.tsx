import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/components/card";

export function Fallback() {
  return (
    <Card size="sm" className="w-full bg-card shadow-sm">
      <CardHeader>
        <CardTitle>Ученик</CardTitle>
        <CardDescription>Страница ученика</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-dashed border-border bg-table px-6 py-10 text-center">
          <h2 className="text-sm">Не удалось загрузить страницу ученика</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Попробуйте обновить страницу чуть позже.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
