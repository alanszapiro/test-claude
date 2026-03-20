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
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                  Pinheiros · SP
                </span>
              </div>
              <h1 className="text-white text-4xl sm:text-5xl font-extrabold tracking-tight leading-none drop-shadow-lg">
                Adara Café
              </h1>
              <p className="text-gray-200 text-sm mt-1.5">
                Sanduíches artesanais · Bowls · Doces · Pinheiros
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
      <footer className="bg-[#1A3028] mt-8 px-4 py-10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-8 items-start justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#C01818] flex items-center justify-center font-bold text-2xl text-white shrink-0">
              A
            </div>
            <div>
              <p className="font-bold text-white text-lg tracking-wide leading-tight">Adara Café</p>
              <p className="text-green-300 text-xs mt-0.5">Pinheiros, São Paulo</p>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col sm:flex-row gap-8 text-sm">
            <div>
              <p className="text-green-400 font-semibold text-xs uppercase tracking-widest mb-2">Endereço</p>
              <p className="text-gray-200">R. Dr. Virgílio de Carvalho Pinto, 179</p>
              <p className="text-gray-400">Pinheiros · São Paulo – SP</p>
              <p className="text-gray-400">CEP 05415-030</p>
            </div>
            <div>
              <p className="text-green-400 font-semibold text-xs uppercase tracking-widest mb-2">Horários</p>
              <p className="text-gray-200">Terça a Sábado</p>
              <p className="text-gray-400">08:00 – 19:30</p>
              <p className="text-gray-200 mt-1">Domingo</p>
              <p className="text-gray-400">08:00 – 17:00</p>
            </div>
            <div>
              <p className="text-green-400 font-semibold text-xs uppercase tracking-widest mb-2">Redes</p>
              <a
                href="https://www.instagram.com/adaracafe.sp/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-200 hover:text-white transition-colors"
              >
                @adaracafe.sp
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto border-t border-white/10 mt-8 pt-4 text-center">
          <p className="text-gray-600 text-xs">
            © {new Date().getFullYear()} Adara Café — Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
}
