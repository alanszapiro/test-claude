"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "./components/Header";
import CartDrawer from "./components/CartDrawer";
import MenuCard from "./components/MenuCard";
import { categories, menuItems } from "./lib/menu-data";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("sanduiches");

  const filtered = menuItems.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      <Header />
      <CartDrawer />

      {/* Hero Banner — photo background */}
      <section className="relative h-72 sm:h-96 overflow-hidden">
        {/* Foto do café — salve como public/cafe.jpg */}
        <Image
          src="/cafe.jpg"
          alt="Adara Café"
          fill
          className="object-cover object-center"
          priority
          onError={() => {/* fallback handled by overlay */}}
        />
        {/* Fallback gradient (aparece caso a foto não exista) */}
        <div className="absolute inset-0 bg-[#1A3028]" />
        {/* Overlay escuro sobre a foto */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        {/* Conteúdo sobre a foto */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 pb-8 max-w-4xl mx-auto w-full left-0 right-0">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#C01818] text-white text-xs font-bold px-3 py-1 rounded-full">
                  Aberto agora
                </span>
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                  Ter – Dom
                </span>
              </div>
              <h1 className="text-white text-4xl sm:text-5xl font-extrabold tracking-tight leading-none drop-shadow-lg">
                Adara Café
              </h1>
              <p className="text-gray-200 text-sm mt-1.5">
                Sanduíches artesanais · Bowls frescos · Doces irresistíveis
              </p>
            </div>
            <div className="hidden sm:flex flex-col items-end gap-1 text-right shrink-0 ml-4">
              <div className="flex items-center gap-1 text-white text-sm">
                <span>⭐</span>
                <span className="font-bold">4.9</span>
                <span className="text-gray-300">(312)</span>
              </div>
              <div className="flex items-center gap-1 text-gray-200 text-sm">
                <span>🚴</span>
                <span>Entrega grátis</span>
              </div>
              <div className="flex items-center gap-1 text-gray-200 text-sm">
                <span>⏱️</span>
                <span>20–40 min</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info bar mobile */}
      <div className="sm:hidden flex justify-around bg-white border-b border-gray-100 py-2.5 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <span>⭐</span><span className="font-semibold">4.9</span>
        </div>
        <div className="flex items-center gap-1">
          <span>🚴</span><span>Entrega grátis</span>
        </div>
        <div className="flex items-center gap-1">
          <span>⏱️</span><span>20–40 min</span>
        </div>
      </div>

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
                    ? "bg-[#C01818] text-white"
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
        <h2 className="text-xl font-bold text-[#1A0000] mb-4">
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
      <footer className="bg-[#1A3028] text-center py-8 mt-8 px-4">
        <div className="w-10 h-10 rounded-full bg-[#C01818] flex items-center justify-center font-bold text-xl text-white mx-auto mb-2">
          A
        </div>
        <p className="font-bold text-white text-lg tracking-wide">Adara Café</p>
        <p className="text-green-300 text-xs mt-1">Ter – Sáb · Dom — Delivery próprio</p>
        <p className="text-gray-500 text-xs mt-3">
          © {new Date().getFullYear()} Adara Café — Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
}
