import { createClient } from "@supabase/supabase-js";

export type OrderStatus =
  | "recebido"
  | "preparando"
  | "saiu"
  | "entregue"
  | "cancelado";

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
};

export type Order = {
  id: string;
  created_at: string;
  customer_name: string;
  phone: string;
  address: string;
  number: string;
  complement: string | null;
  neighborhood: string;
  city: string;
  payment_method: string;
  change_amount: string | null;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
