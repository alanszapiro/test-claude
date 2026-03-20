import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  const body = await request.json();

  const orderId = Math.random().toString(36).slice(2, 8).toUpperCase();

  const { error } = await supabase.from("orders").insert({
    id: orderId,
    customer_name: body.name,
    phone: body.phone,
    address: body.address,
    number: body.number,
    complement: body.complement || null,
    neighborhood: body.neighborhood,
    city: body.city,
    payment_method: body.payment,
    change_amount: body.change || null,
    items: body.items,
    total: body.total,
    status: "recebido",
  });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ id: orderId });
}
