import Link from "next/link";
import { Button } from "@/shared/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/components/card";
import { cn } from "@/shared/ui/lib/utils";

export function AssistantLink({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <Card
      className={cn("w-full bg-card text-center justify-center", className)}
    >
      <CardHeader>
        <CardTitle>ИИ - Ассистент</CardTitle>
        <CardDescription>
          Получите помощь от Ассистента на основе данных ученика и его карточек занятий
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild size="lg" className={`shadow-md`}>
          <Link href={href}>Перейти к Ассистенту</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
