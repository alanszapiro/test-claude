import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./lib/cart-context";

export const metadata: Metadata = {
  title: "Adara Café — Delivery",
  description: "Peça agora no Adara Café. Delivery próprio, sem taxas, direto para você.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
