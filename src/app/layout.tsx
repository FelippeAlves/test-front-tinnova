import HeaderComponent from "@/components/HeaderComponent/HeaderComponent";
import "./globals.css";
import type { Metadata } from "next";
import FooterComponent from "@/components/FooterComponent/FooterComponent";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Teste front-end Tinnova",
  description: "Criado por Felippe Alves de Paula"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen">
        <HeaderComponent />
        {children}
        <Toaster richColors position="bottom-right" />
        <FooterComponent />
      </body>
    </html>
  );
}
