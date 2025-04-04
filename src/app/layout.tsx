import Menu from "@/components/menu";
import "./globals.css";
import type { Metadata } from "next";

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
      <body>
        <Menu />
        {children}
      </body>
    </html>
  );
}
