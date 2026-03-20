"use client";

import { useState } from "react";
import Header from "./components/Header";
import CartDrawer from "./components/CartDrawer";
import MenuCard from "./components/MenuCard";
import { categories, menuItems } from "./lib/menu-data";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("cafes");

  const filtered = menuItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FFF8F0]">
      <Header />
      <CartDrawer />

      {/* Hero Banner */}
      <section className="bg-[#3D1A00] text-white py-10 px-4">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-2">
              Bem-vindo ao<br />
              <span className="text-[#C8860A]">Adara Café</span>
            </h1>
            <p className="text-[#D4A04A] text-base mb-4">
              Peça agora e receba em até 40 minutos.<br />Sem taxas, direto do nosso café para você!
            </p>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span>⏱️</span>
                <span className="text-gray-300">20–40 min</span>
              </div>
              <div className="flex items-center gap-1">
                <span>🚴</span>
                <span className="text-gray-300">Entrega grátis</span>
              </div>
              <div className="flex items-center gap-1">
                <span>⭐</span>
                <span className="text-gray-300">4.9 (312 avaliações)</span>
              </div>
            </div>
          </div>
          <div className="text-8xl sm:text-9xl select-none">☕</div>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="flex gap-1 overflow-x-auto scrollbar-hide py-2" aria-label="Categorias">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? "bg-[#C8860A] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Menu Grid */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold text-[#3D1A00] mb-4">
          {categories.find((c) => c.id === activeCategory)?.emoji}{" "}
          {categories.find((c) => c.id === activeCategory)?.name}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#3D1A00] text-[#D4A04A] text-center py-6 mt-8 text-sm">
        <p className="font-semibold">Adara Café</p>
        <p className="text-xs text-gray-500 mt-1">© {new Date().getFullYear()} — Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
