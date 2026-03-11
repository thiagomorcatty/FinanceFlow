import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinanceFlow | CRM Financeiro",
  description: "CRM para mediadores financeiros – crédito, seguros e contabilidade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
