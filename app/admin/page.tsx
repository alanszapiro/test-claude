"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase, type Order, type OrderStatus } from "../lib/supabase";

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; color: string; bg: string }
> = {
  recebido: { label: "Recebido", color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
  preparando: { label: "Preparando", color: "text-orange-700", bg: "bg-orange-50 border-orange-200" },
  saiu: { label: "Saiu para entrega", color: "text-purple-700", bg: "bg-purple-50 border-purple-200" },
  entregue: { label: "Entregue", color: "text-green-700", bg: "bg-green-50 border-green-200" },
  cancelado: { label: "Cancelado", color: "text-red-700", bg: "bg-red-50 border-red-200" },
};

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  recebido: "preparando",
  preparando: "saiu",
  saiu: "entregue",
};

const NEXT_LABEL: Partial<Record<OrderStatus, string>> = {
  recebido: "Iniciar preparo",
  preparando: "Saiu para entrega",
  saiu: "Marcar entregue",
};

const PAYMENT_LABELS: Record<string, string> = {
  pix: "PIX",
  cartao_credito: "Cartão crédito",
  cartao_debito: "Cartão débito",
  dinheiro: "Dinheiro",
};

function timeAgo(date: string) {
  const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (diff < 60) return `${diff}s atrás`;
  if (diff < 3600) return `${Math.floor(diff / 60)}min atrás`;
  return `${Math.floor(diff / 3600)}h atrás`;
}

export default function AdminPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [filter, setFilter] = useState<OrderStatus | "todos">("todos");
  const [expanded, setExpanded] = useState<string | null>(null);

  async function fetchOrders() {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);
    if (data) setOrders(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 15000);
    return () => clearInterval(interval);
  }, []);

  async function updateStatus(orderId: string, newStatus: OrderStatus) {
    setUpdating(orderId);
    await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    await fetchOrders();
    setUpdating(null);
  }

  async function cancelOrder(orderId: string) {
    if (!confirm("Cancelar este pedido?")) return;
    await updateStatus(orderId, "cancelado");
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const filtered =
    filter === "todos" ? orders : orders.filter((o) => o.status === filter);

  const counts = {
    recebido: orders.filter((o) => o.status === "recebido").length,
    preparando: orders.filter((o) => o.status === "preparando").length,
    saiu: orders.filter((o) => o.status === "saiu").length,
    entregue: orders.filter((o) => o.status === "entregue").length,
    cancelado: orders.filter((o) => o.status === "cancelado").length,
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4]">
      {/* Header */}
      <header className="bg-[#1A3028] px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <span className="text-2xl">☕</span>
          <div>
            <h1 className="text-white font-bold text-base leading-none">Adara Café</h1>
            <p className="text-green-300 text-xs">Painel de pedidos</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchOrders}
            className="text-white text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors"
          >
            Atualizar
          </button>
          <button
            onClick={handleLogout}
            className="text-white/60 hover:text-white text-xs transition-colors"
          >
            Sair
          </button>
        </div>
      </header>

      {/* Stats bar */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex gap-4 overflow-x-auto">
        {(
          [
            ["todos", "Todos", orders.length, "text-gray-700"],
            ["recebido", "Recebidos", counts.recebido, "text-blue-700"],
            ["preparando", "Preparando", counts.preparando, "text-orange-700"],
            ["saiu", "Na rua", counts.saiu, "text-purple-700"],
            ["entregue", "Entregues", counts.entregue, "text-green-700"],
          ] as [OrderStatus | "todos", string, number, string][]
        ).map(([key, label, count, color]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`flex-shrink-0 flex flex-col items-center px-3 py-1 rounded-xl transition-colors ${
              filter === key ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
          >
            <span className={`text-xl font-extrabold ${color}`}>{count}</span>
            <span className="text-xs text-gray-500">{label}</span>
          </button>
        ))}
      </div>

      {/* Orders list */}
      <main className="max-w-2xl mx-auto px-4 py-4 space-y-3">
        {loading ? (
          <p className="text-center text-gray-400 text-sm py-12 animate-pulse">
            Carregando pedidos...
          </p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-12">
            Nenhum pedido {filter !== "todos" ? `com status "${STATUS_CONFIG[filter as OrderStatus]?.label}"` : "ainda"}
          </p>
        ) : (
          filtered.map((order) => {
            const cfg = STATUS_CONFIG[order.status];
            const nextStatus = NEXT_STATUS[order.status];
            const isExpanded = expanded === order.id;

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                {/* Order header */}
                <div
                  className="p-4 cursor-pointer select-none"
                  onClick={() => setExpanded(isExpanded ? null : order.id)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="font-extrabold text-[#C01818] text-base tracking-wide">
                        #{order.id}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${cfg.bg} ${cfg.color}`}
                      >
                        {cfg.label}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {timeAgo(order.created_at)}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#1A0000]">
                        {order.customer_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {order.items.length} item{order.items.length !== 1 ? "s" : ""} •{" "}
                        R${" "}
                        {order.total.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}{" "}
                        • {PAYMENT_LABELS[order.payment_method] ?? order.payment_method}
                      </p>
                    </div>
                    <span className="text-gray-400 text-sm">
                      {isExpanded ? "▲" : "▼"}
                    </span>
                  </div>
                </div>

                {/* Expanded details */}
                {isExpanded && (
                  <div className="border-t border-gray-100 p-4 space-y-3">
                    {/* Items */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Itens
                      </p>
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-gray-700">
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
                    </div>

                    {/* Address */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Endereço
                      </p>
                      <p className="text-sm text-gray-700">
                        {order.address}, {order.number}
                        {order.complement ? ` — ${order.complement}` : ""}
                      </p>
                      <p className="text-sm text-gray-700">
                        {order.neighborhood} — {order.city}
                      </p>
                    </div>

                    {/* Contact */}
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Contato
                      </p>
                      <a
                        href={`https://wa.me/55${order.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-green-700 underline"
                      >
                        {order.phone}
                      </a>
                    </div>

                    {order.payment_method === "dinheiro" && order.change_amount && (
                      <p className="text-sm text-gray-700">
                        💵 Troco para: {order.change_amount}
                      </p>
                    )}
                  </div>
                )}

                {/* Actions */}
                {order.status !== "entregue" && order.status !== "cancelado" && (
                  <div className="border-t border-gray-100 px-4 py-3 flex gap-2">
                    {nextStatus && (
                      <button
                        onClick={() => updateStatus(order.id, nextStatus)}
                        disabled={updating === order.id}
                        className="flex-1 bg-[#1A3028] hover:bg-[#0f2019] disabled:opacity-60 text-white py-2.5 rounded-xl text-sm font-bold transition-colors"
                      >
                        {updating === order.id
                          ? "Atualizando..."
                          : NEXT_LABEL[order.status]}
                      </button>
                    )}
                    <button
                      onClick={() => cancelOrder(order.id)}
                      disabled={updating === order.id}
                      className="px-4 py-2.5 rounded-xl text-sm font-bold text-red-600 border border-red-200 hover:bg-red-50 transition-colors disabled:opacity-60"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </main>
    </div>
  );
}
