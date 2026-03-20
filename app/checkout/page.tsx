"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../lib/cart-context";

type PaymentMethod = "pix" | "cartao_credito" | "cartao_debito" | "dinheiro";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
  });
  const [payment, setPayment] = useState<PaymentMethod>("pix");
  const [change, setChange] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center gap-4 p-6">
        <span className="text-7xl">🛒</span>
        <h1 className="text-2xl font-bold text-[#1A0000]">Carrinho vazio</h1>
        <p className="text-gray-500">Adicione itens antes de finalizar o pedido</p>
        <Link
          href="/"
          className="bg-[#C01818] text-white px-8 py-3 rounded-full font-bold hover:bg-[#8B0000] transition-colors"
        >
          Ver cardápio
        </Link>
      </div>
    );
  }

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Nome obrigatório";
    if (!form.phone.trim()) e.phone = "Telefone obrigatório";
    if (!form.address.trim()) e.address = "Rua obrigatória";
    if (!form.number.trim()) e.number = "Número obrigatório";
    if (!form.neighborhood.trim()) e.neighborhood = "Bairro obrigatório";
    if (!form.city.trim()) e.city = "Cidade obrigatória";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    const orderId = Math.random().toString(36).slice(2, 8).toUpperCase();
    clearCart();
    router.push(`/pedido/${orderId}`);
  };

  const field = (
    key: keyof typeof form,
    label: string,
    placeholder: string,
    className = ""
  ) => (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="text-sm font-semibold text-[#1A0000]">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={form[key]}
        onChange={(e) => {
          setForm((f) => ({ ...f, [key]: e.target.value }));
          setErrors((er) => ({ ...er, [key]: "" }));
        }}
        className={`border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C01818] ${
          errors[key] ? "border-red-400 bg-red-50" : "border-gray-300"
        }`}
      />
      {errors[key] && <p className="text-red-500 text-xs">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <header className="bg-[#C01818] h-14 flex items-center px-4 gap-3">
        <Link href="/" className="text-white text-2xl leading-none">←</Link>
        <h1 className="text-white font-bold text-lg">Finalizar pedido</h1>
      </header>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Order summary */}
        <section className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
          <h2 className="font-bold text-[#1A0000] text-base">Resumo do pedido</h2>
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between text-sm">
              <span className="text-gray-700">
                {item.quantity}× {item.name}
              </span>
              <span className="font-semibold text-[#1A0000]">
                R${" "}
                {(item.price * item.quantity).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          ))}
          <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-[#1A0000]">
            <span>Total</span>
            <span>
              R${" "}
              {total.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <p className="text-xs text-green-600 font-medium">✓ Entrega grátis</p>
        </section>

        {/* Delivery address */}
        <section className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
          <h2 className="font-bold text-[#1A0000] text-base">📍 Dados de entrega</h2>
          {field("name", "Seu nome", "Como você se chama?")}
          {field("phone", "Telefone / WhatsApp", "(00) 00000-0000")}
          <div className="grid grid-cols-3 gap-3">
            {field("address", "Rua", "Nome da rua", "col-span-2")}
            {field("number", "Número", "123")}
          </div>
          {field("complement", "Complemento (opcional)", "Apto, bloco...")}
          {field("neighborhood", "Bairro", "Seu bairro")}
          {field("city", "Cidade", "Sua cidade")}
        </section>

        {/* Payment */}
        <section className="bg-white rounded-2xl shadow-sm p-4 space-y-3">
          <h2 className="font-bold text-[#1A0000] text-base">💳 Forma de pagamento</h2>
          {(
            [
              { id: "pix", label: "PIX", icon: "📲", desc: "Pagamento instantâneo" },
              { id: "cartao_credito", label: "Cartão de crédito", icon: "💳", desc: "Maquininha na entrega" },
              { id: "cartao_debito", label: "Cartão de débito", icon: "💳", desc: "Maquininha na entrega" },
              { id: "dinheiro", label: "Dinheiro", icon: "💵", desc: "Troco na entrega" },
            ] as { id: PaymentMethod; label: string; icon: string; desc: string }[]
          ).map((opt) => (
            <label
              key={opt.id}
              className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                payment === opt.id
                  ? "border-[#C01818] bg-red-50"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name="payment"
                value={opt.id}
                checked={payment === opt.id}
                onChange={() => setPayment(opt.id)}
                className="accent-[#C01818]"
              />
              <span className="text-xl">{opt.icon}</span>
              <div>
                <p className="text-sm font-semibold text-[#1A0000]">{opt.label}</p>
                <p className="text-xs text-gray-500">{opt.desc}</p>
              </div>
            </label>
          ))}

          {payment === "dinheiro" && (
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#1A0000]">Troco para quanto?</label>
              <input
                type="text"
                placeholder="Ex: R$ 50,00"
                value={change}
                onChange={(e) => setChange(e.target.value)}
                className="border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C01818]"
              />
            </div>
          )}
        </section>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#C01818] hover:bg-[#8B0000] disabled:opacity-60 text-white py-4 rounded-full font-bold text-base transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="animate-spin">⏳</span>
              Processando pedido...
            </>
          ) : (
            `Confirmar pedido — R$ ${total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
          )}
        </button>
      </form>
    </div>
  );
}
