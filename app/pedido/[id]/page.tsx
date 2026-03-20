"use client";

import Link from "next/link";

const steps = [
  { id: 1, label: "Pedido recebido", icon: "✅", done: true },
  { id: 2, label: "Em preparo na cozinha", icon: "👨‍🍳", done: true },
  { id: 3, label: "Saiu para entrega", icon: "🛵", done: false },
  { id: 4, label: "Entregue", icon: "🏠", done: false },
];

export default function OrderPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      <header className="bg-[#1A3028] h-14 flex items-center px-4">
        <h1 className="text-white font-bold text-lg">Acompanhe seu pedido</h1>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-8 space-y-6">
        {/* Success card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 text-center space-y-3">
          <div className="text-6xl">🎉</div>
          <h2 className="text-xl font-extrabold text-[#1A0000]">Pedido confirmado!</h2>
          <p className="text-gray-500 text-sm">
            Obrigado por pedir no Adara Café. Já começamos a preparar o seu pedido com muito carinho!
          </p>
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 inline-block">
            <p className="text-xs text-gray-500 mb-1">Código do pedido</p>
            <p className="text-2xl font-extrabold text-[#C01818] tracking-widest">
              #{params.id}
            </p>
          </div>
        </div>

        {/* Estimated time */}
        <div className="bg-[#C01818] rounded-2xl p-4 flex items-center gap-4">
          <span className="text-4xl">⏱️</span>
          <div>
            <p className="text-white font-bold text-lg">Previsão de entrega</p>
            <p className="text-red-100 text-sm">20 – 40 minutos</p>
          </div>
        </div>

        {/* Order tracking */}
        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
          <h3 className="font-bold text-[#1A0000]">Status do pedido</h3>
          <ol className="space-y-4">
            {steps.map((step, idx) => (
              <li key={step.id} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-lg border-2 ${
                      step.done
                        ? "border-[#C01818] bg-red-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                  >
                    {step.icon}
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className={`w-0.5 h-6 mt-1 ${
                        step.done ? "bg-[#C01818]" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
                <div className="pt-1.5">
                  <p
                    className={`text-sm font-semibold ${
                      step.done ? "text-[#1A0000]" : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </p>
                  {step.done && step.id === 2 && (
                    <p className="text-xs text-[#C01818] font-medium animate-pulse mt-0.5">
                      Em andamento...
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-2xl shadow-sm p-4 flex items-center gap-3">
          <span className="text-3xl">📞</span>
          <div>
            <p className="text-sm font-semibold text-[#1A0000]">Precisa de ajuda?</p>
            <p className="text-xs text-gray-500">Entre em contato pelo WhatsApp</p>
          </div>
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto bg-green-500 hover:bg-green-600 transition-colors text-white text-xs font-bold px-3 py-2 rounded-full"
          >
            WhatsApp
          </a>
        </div>

        <Link
          href="/"
          className="block w-full text-center bg-[#C01818] hover:bg-[#8B0000] transition-colors text-white py-3 rounded-full font-bold"
        >
          ☕ Fazer novo pedido
        </Link>
      </main>
    </div>
  );
}
