"use client";

import Link from "next/link";
import { useCart } from "../lib/cart-context";

export default function Header() {
  const { count, setIsOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-[#3D1A00] shadow-lg">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-[#C8860A] flex items-center justify-center text-white font-bold text-lg">
            A
          </div>
          <div>
            <p className="text-white font-bold text-lg leading-tight">Adara Café</p>
            <p className="text-[#D4A04A] text-xs leading-tight">Delivery próprio</p>
          </div>
        </Link>

        <button
          onClick={() => setIsOpen(true)}
          className="relative flex items-center gap-2 bg-[#C8860A] hover:bg-[#B5750A] transition-colors text-white px-4 py-2 rounded-full text-sm font-semibold"
        >
          <span>🛒</span>
          <span>Carrinho</span>
          {count > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
