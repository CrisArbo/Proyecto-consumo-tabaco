import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["SOFT", "opsz"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prevalencia · Tabaco y vapeo en Colombia",
  description:
    "Plataforma para consultar y visualizar el consumo de tabaco y cigarrillos electrónicos en Colombia.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${sans.variable} ${display.variable} ${mono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">
        <TooltipProvider>
          <div className="flex min-h-svh">
            <AppSidebar />
            <div className="flex min-w-0 flex-1 flex-col">
              <SiteHeader />
              <main id="contenido" className="flex-1">
                {children}
              </main>
              <SiteFooter />
            </div>
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
