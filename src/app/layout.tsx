import type { Metadata } from "next";
import localFont from "next/font/local";
import { TooltipProvider } from "@/shared/ui/components/tooltip";
import "./globals.css";
import "katex/dist/katex.min.css";

const onestSans = localFont({
  src: "../shared/ui/assets/fonts/Onest-Variable.ttf",
  variable: "--font-onest-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tutor AI",
  description: "AI assistant for tutors.",
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ru" className={`${onestSans.variable} h-full antialiased`}>
      <body>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
