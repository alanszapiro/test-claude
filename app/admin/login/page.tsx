"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Senha incorreta");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-sm space-y-6">
        <div className="text-center space-y-1">
          <div className="text-5xl">☕</div>
          <h1 className="text-xl font-extrabold text-[#1A0000]">Adara Café</h1>
          <p className="text-sm text-gray-500">Painel do restaurante</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-[#1A0000]">Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C01818] ${
                error ? "border-red-400 bg-red-50" : "border-gray-300"
              }`}
              autoFocus
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-[#C01818] hover:bg-[#8B0000] disabled:opacity-60 text-white py-3 rounded-full font-bold text-sm transition-colors"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
