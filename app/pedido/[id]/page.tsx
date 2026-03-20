"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { supabase, type Order, type OrderStatus } from "../../lib/supabase";

const STEPS: { status: OrderStatus; label: string; icon: string }[] = [
  { status: "recebido", label: "Pedido recebido", icon: "✅" },
  { status: "preparando", label: "Em preparo na cozinha", icon: "👨‍🍳" },
  { status: "saiu", label: "Saiu para entrega", icon: "🛵" },
  { status: "entregue", label: "Entregue", icon: "🏠" },
];

const STATUS_INDEX: Record<OrderStatus, number> = {
  recebido: 0,
  preparando: 1,
  saiu: 2,
  entregue: 3,
  cancelado: -1,
};

const PAYMENT_LABELS: Record<string, string> = {
  pix: "PIX",
  cartao_credito: "Cartão de crédito",
  cartao_debito: "Cartão de débito",
  dinheiro: "Dinheiro",
};

function buildWhatsAppText(order: Order): string {
  const itemsText = order.items
    .map(
      (i) =>
        `${i.quantity}x ${i.name} — R$${(i.price * i.quantity)
          .toFixed(2)
          .replace(".", ",")}`
    )
    .join("\n");

  const address = [
    `${order.address}, ${order.number}`,
    order.complement,
    `${order.neighborhood} — ${order.city}`,
  ]
    .filter(Boolean)
    .join("\n");

  return encodeURIComponent(
    `🛵 *Novo Pedido — Adara Café*\n` +
      `*Pedido:* #${order.id}\n` +
      `*Cliente:* ${order.customer_name}\n` +
      `*Tel:* ${order.phone}\n\n` +
      `*Itens:*\n${itemsText}\n\n` +
      `*Total:* R$${order.total.toFixed(2).replace(".", ",")}\n` +
      `*Pagamento:* ${PAYMENT_LABELS[order.payment_method] ?? order.payment_method}\n\n` +
      `*Endereço de entrega:*\n${address}`
  );
}

export default function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [whatsappOpened, setWhatsappOpened] = useState(false);

  useEffect(() => {
    async function fetchOrder() {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .single();
      setOrder(data);
      setLoading(false);
    }
    fetchOrder();

    // Poll every 30s to update status
    const interval = setInterval(fetchOrder, 30000);
    return () => clearInterval(interval);
  }, [id]);

  const currentStepIndex =
    order ? (STATUS_INDEX[order.status] ?? 0) : 0;

  const handleWhatsApp = () => {
    if (!order) return;
    const text = buildWhatsAppText(order);
    window.open(`https://wa.me/5511987980003?text=${text}`, "_blank");
    setWhatsappOpened(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F4] flex items-center justify-center">
        <span className="text-gray-400 text-sm animate-pulse">Carregando pedido...</span>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FAF8F4] flex flex-col items-center justify-center gap-4 p-6">
        <span className="text-5xl">😕</span>
        <h1 className="text-xl font-bold text-[#1A0000]">Pedido não encontrado</h1>
        <Link href="/" className="text-[#C01818] underline text-sm">
          Voltar ao cardápio
        </Link>
      </div>
    );
  }

  if (order.status === "cancelado") {
    return (
      <div className="min-h-screen bg-[#FAF8F4] flex flex-col items-center justify-center gap-4 p-6">
        <span className="text-5xl">❌</span>
        <h1 className="text-xl font-bold text-[#1A0000]">Pedido cancelado</h1>
        <p className="text-gray-500 text-sm text-center">
          Entre em contato pelo Instagram para mais informações.
        </p>
        <a
          href="https://www.instagram.com/adaracafe.sp/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1A3028] text-white px-6 py-3 rounded-full font-bold text-sm"
        >
          @adaracafe.sp
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4] flex flex-col">
      <header className="bg-[#1A3028] h-14 flex items-center px-4">
        <h1 className="text-white font-bold text-lg">Acompanhe seu pedido</h1>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-8 space-y-4">
        {/* Success card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 text-center space-y-3">
          <div className="text-6xl">🎉</div>
          <h2 className="text-xl font-extrabold text-[#1A0000]">Pedido confirmado!</h2>
          <p className="text-gray-500 text-sm">
            Obrigado por pedir no Adara Café. Já começamos a preparar o seu pedido com muito carinho!
          </p>
          <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 inline-block">
            <p className="text-xs text-gray-400 mb-1">Código do pedido</p>
            <p className="text-2xl font-extrabold text-[#C01818] tracking-widest">
              #{order.id}
            </p>
          </div>
        </div>

        {/* WhatsApp confirmation */}
        {!whatsappOpened ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-3xl">💬</span>
              <div>
                <p className="font-bold text-green-800 text-sm">Confirme pelo WhatsApp</p>
                <p className="text-green-700 text-xs mt-1">
                  Envie os detalhes do seu pedido para o café pelo WhatsApp para garantir a entrega.
                </p>
              </div>
            </div>
            <button
              onClick={handleWhatsApp}
              className="w-full bg-green-600 hover:bg-green-700 transition-colors text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
            >
              📲 Enviar pedido pelo WhatsApp
            </button>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <p className="text-green-700 text-sm font-medium">
              Pedido enviado pelo WhatsApp!
            </p>
          </div>
        )}

        {/* Estimated time */}
        <div className="bg-[#1A3028] rounded-2xl p-4 flex items-center gap-4">
          <span className="text-4xl">⏱️</span>
          <div>
            <p className="text-white font-bold text-lg">Previsão de entrega</p>
            <p className="text-green-300 text-sm">20 – 40 minutos</p>
          </div>
        </div>

        {/* Order tracking */}
        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
          <h3 className="font-bold text-[#1A0000]">Status do pedido</h3>
          <ol className="space-y-4">
            {STEPS.map((step, idx) => {
              const done = idx <= currentStepIndex;
              const active = idx === currentStepIndex;
              return (
                <li key={step.status} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-lg border-2 ${
                        done
                          ? "border-[#C01818] bg-red-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      {step.icon}
                    </div>
                    {idx < STEPS.length - 1 && (
                      <div
                        className={`w-0.5 h-6 mt-1 ${
                          done ? "bg-[#C01818]" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                  <div className="pt-1.5">
                    <p
                      className={`text-sm font-semibold ${
                        done ? "text-[#1A0000]" : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </p>
                    {active && order.status !== "entregue" && (
                      <p className="text-xs text-[#C01818] font-medium animate-pulse mt-0.5">
                        Em andamento...
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Order summary */}
        <div className="bg-white rounded-2xl shadow-sm p-4 space-y-2">
          <h3 className="font-bold text-[#1A0000] text-sm">Resumo do pedido</h3>
          {order.items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span className="text-gray-600">
                {item.quantity}× {item.name}
              </span>
              <span className="font-medium text-[#1A0000]">
                R${" "}
                {(item.price * item.quantity).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          ))}
          <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-[#1A0000]">
            <span>Total</span>
            <span>
              R${" "}
              {order.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Pagamento: {PAYMENT_LABELS[order.payment_method] ?? order.payment_method}
            {order.change_amount ? ` — troco para ${order.change_amount}` : ""}
          </p>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3">
          <span className="text-3xl">📸</span>
          <div>
            <p className="text-sm font-semibold text-[#1A0000]">Dúvidas ou problemas?</p>
            <p className="text-xs text-gray-500">Fale com a gente pelo Instagram</p>
          </div>
          <a
            href="https://www.instagram.com/adaracafe.sp/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto bg-[#1A3028] hover:bg-[#0f2019] transition-colors text-white text-xs font-bold px-3 py-2 rounded-full whitespace-nowrap"
          >
            @adaracafe.sp
          </a>
        </div>

        <Link
          href="/"
          className="block w-full text-center bg-[#C01818] hover:bg-[#A01010] transition-colors text-white py-3 rounded-full font-bold"
        >
          ☕ Fazer novo pedido
        </Link>
      </main>
    </div>
  );
}
