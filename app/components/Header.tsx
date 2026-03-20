"use client";

import Link from "next/link";
import { useCart } from "../lib/cart-context";

export default function Header() {
  const { count, setIsOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-[#1A3028] shadow-lg">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-[#C01818] flex items-center justify-center font-bold text-lg text-white">
            A
          </div>
          <div>
            <p className="text-white font-bold text-lg leading-tight tracking-wide">Adara Café</p>
            <p className="text-green-300 text-xs leading-tight">Pinheiros · Delivery grátis</p>
          </div>
        </Link>

        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2 bg-[#C01818] hover:bg-[#A01010] transition-colors text-white px-4 py-2 rounded-full text-sm font-semibold"
        >
          <span>🛒</span>
          <span>Carrinho</span>
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-[#C01818] text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold border border-[#C01818]">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
