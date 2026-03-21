"use client";

import { useState, useEffect } from "react";
import type { MenuItem } from "../lib/menu-data";

type Props = {
  item: MenuItem;
  currentNotes: string;
  isInCart: boolean;
  onConfirm: (notes: string) => void;
  onClose: () => void;
};

export default function ItemModal({ item, currentNotes, isInCart, onConfirm, onClose }: Props) {
  const [notes, setNotes] = useState(currentNotes);

  useEffect(() => {
    setNotes(currentNotes);
  }, [currentNotes]);

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />
      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 bg-white rounded-2xl z-50 shadow-2xl max-w-sm mx-auto p-5 space-y-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bold text-[#1A0000] text-base">{item.name}</h3>
            <p className="text-gray-500 text-xs mt-0.5">{item.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none flex-shrink-0"
            aria-label="Fechar"
          >
            ×
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-[#1A0000]">
            Alguma observação?
          </label>
          <textarea
            placeholder="Ex: sem jalapeño, sem cebola, sem tomate..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="border border-gray-300 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#C01818]"
          />
          <p className="text-xs text-gray-400">Opcional — deixe em branco se não houver</p>
        </div>

        <button
          onClick={() => onConfirm(notes.trim())}
          className="w-full bg-[#C01818] hover:bg-[#8B0000] transition-colors text-white py-3 rounded-full font-bold text-sm"
        >
          {isInCart ? "Adicionar mais 1" : "Adicionar ao carrinho"} —{" "}
          R${" "}
          {item.price.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </button>
      </div>
    </>
  );
}
