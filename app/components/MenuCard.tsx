"use client";

import type { MenuItem } from "../lib/menu-data";
import { useCart } from "../lib/cart-context";

const bgColors: Record<string, string> = {
  cafes: "bg-amber-50",
  lanches: "bg-orange-50",
  refeicoes: "bg-green-50",
  sobremesas: "bg-pink-50",
  bebidas: "bg-blue-50",
};

export default function MenuCard({ item }: { item: MenuItem }) {
  const { addItem, items } = useCart();
  const cartItem = items.find((i) => i.id === item.id);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div className={`${bgColors[item.category] ?? "bg-gray-50"} h-28 flex items-center justify-center text-5xl relative`}>
        {item.badge && (
          <span className="absolute top-2 left-2 bg-[#C8860A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            {item.badge}
          </span>
        )}
        {item.emoji}
      </div>

      <div className="p-3 flex flex-col flex-1 gap-1">
        <h3 className="font-bold text-[#3D1A00] text-sm leading-tight">{item.name}</h3>
        <p className="text-gray-500 text-xs leading-relaxed flex-1">{item.description}</p>

        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-[#3D1A00] text-base">
            R$ {item.price.toFixed(2).replace(".", ",")}
          </span>

          {cartItem ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#C8860A] font-semibold">
                {cartItem.quantity} no carrinho
              </span>
              <button
                onClick={() => addItem(item)}
                className="w-8 h-8 rounded-full bg-[#C8860A] text-white flex items-center justify-center text-lg font-bold hover:bg-[#B5750A] transition-colors"
                aria-label="Adicionar mais"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={() => addItem(item)}
              className="w-8 h-8 rounded-full bg-[#C8860A] text-white flex items-center justify-center text-lg font-bold hover:bg-[#B5750A] transition-colors"
              aria-label="Adicionar ao carrinho"
            >
              +
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
