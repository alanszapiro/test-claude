"use client";

import Link from "next/link";
import { useCart } from "../lib/cart-context";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, total, updateQuantity, removeItem } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 bg-[#7A0A0A]">
          <h2 className="text-white font-bold text-lg">Seu Pedido 🛒</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white text-2xl hover:text-red-200 transition-colors leading-none"
            aria-label="Fechar carrinho"
          >
            ×
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center p-6">
            <span className="text-6xl">🛒</span>
            <p className="text-gray-500 font-medium">Seu carrinho está vazio</p>
            <p className="text-gray-400 text-sm">Adicione itens do menu para começar seu pedido</p>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-[#C01818] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#8B0000] transition-colors"
            >
              Ver cardápio
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto divide-y divide-gray-100">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3 px-4 py-3">
                  <span className="text-2xl">{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1A0000] truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      R${" "}
                      {item.price.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      cada
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-sm font-bold"
                    >
                      −
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full bg-[#C01818] text-white flex items-center justify-center text-sm font-bold hover:bg-[#8B0000] transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-[#1A0000]">
                      R${" "}
                      {(item.price * item.quantity).toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-red-400 hover:text-red-600 transition-colors"
                    >
                      remover
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-200 p-4 space-y-3 bg-gray-50">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>
                  R${" "}
                  {total.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Taxa de entrega</span>
                <span className="text-[#C01818] font-medium">Grátis</span>
              </div>
              <div className="flex justify-between font-bold text-[#1A0000]">
                <span>Total</span>
                <span className="text-lg">
                  R${" "}
                  {total.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <Link
                href="/checkout"
                onClick={() => setIsOpen(false)}
                className="block w-full bg-[#C01818] hover:bg-[#8B0000] transition-colors text-white text-center py-3 rounded-full font-bold text-base"
              >
                Finalizar pedido →
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
