import { createClient } from "@supabase/supabase-js";
import type { NextRequest } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return Response.json({ error: "Pedido não encontrado" }, { status: 404 });
  }

  return Response.json(data);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookie = request.cookies.get("admin_session");
  if (cookie?.value !== "authenticated") {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const { status } = await request.json();

  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ ok: true });
}
