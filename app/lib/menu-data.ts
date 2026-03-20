export type Category = {
  id: string;
  name: string;
  emoji: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  emoji: string;
  badge?: string;
  image?: string;
};

export const categories: Category[] = [
  { id: "sanduiches", name: "Sanduíches", emoji: "🥪" },
  { id: "bowls", name: "Saladas & Bowls", emoji: "🥗" },
  { id: "paes", name: "Pães", emoji: "🍞" },
  { id: "doces", name: "Doces", emoji: "🍫" },
  { id: "sucos", name: "Sucos e Chás", emoji: "🥤" },
  { id: "cafes", name: "Cafés", emoji: "☕" },
];

export const menuItems: MenuItem[] = [
  // Sanduíches
  {
    id: "spicy-tuna",
    name: "Spicy Tuna",
    description: "Pasta de atum, picles de jalapeño",
    price: 46,
    category: "sanduiches",
    emoji: "🥪",
  },
  {
    id: "spicy-tuna-avocado",
    name: "Spicy Tuna com Avocado",
    description: "Pasta de atum, picles de jalapeño e avocado",
    price: 54,
    category: "sanduiches",
    emoji: "🥪",
    badge: "Favorito",
  },
  {
    id: "tuna-melt",
    name: "Tuna Melt",
    description: "Pasta de atum, tomate, colby-jack",
    price: 48.5,
    category: "sanduiches",
    emoji: "🥪",
  },
  {
    id: "egg-salad",
    name: "Egg Salad",
    description: "Salada de ovos temperada",
    price: 41.5,
    category: "sanduiches",
    emoji: "🥪",
  },
  {
    id: "egg-salad-avocado",
    name: "Egg Salad com Avocado",
    description: "Salada de ovos temperada com avocado",
    price: 49.5,
    category: "sanduiches",
    emoji: "🥪",
  },
  {
    id: "salmao-defumado",
    name: "Salmão Defumado",
    description: "Salmão defumado, picles de maçã verde, cream cheese temperado, mini agrião",
    price: 54,
    category: "sanduiches",
    emoji: "🥪",
    badge: "Especial",
  },
  {
    id: "queijo-quente",
    name: "Queijo Quente",
    description: "Colby-jack, emmental, parmesão",
    price: 38,
    category: "sanduiches",
    emoji: "🥪",
  },
  {
    id: "queijo-quente-picles",
    name: "Queijo Quente com Picles e Mostarda à L'Ancienne",
    description: "Colby-jack, emmental, parmesão, picles de pepino, mostarda à l'ancienne",
    price: 44,
    category: "sanduiches",
    emoji: "🥪",
  },

  // Saladas & Bowls
  {
    id: "hommus",
    name: "Hommus",
    description: "Hommus, conservas variadas, tomatinhos, castanha de caju — acompanha pão tostado",
    price: 45,
    category: "bowls",
    emoji: "🥗",
  },
  {
    id: "salada-verde-boursin",
    name: "Salada Verde com Boursin",
    description: "Folhas e ervas, queijo boursin, picles de cebola roxa, amêndoas laminadas",
    price: 48.5,
    category: "bowls",
    emoji: "🥗",
  },
  {
    id: "salada-verde-boursin-salmao",
    name: "Salada Verde com Boursin e Salmão Defumado",
    description: "Folhas e ervas, queijo boursin, picles de cebola roxa, amêndoas laminadas e salmão defumado",
    price: 64.5,
    category: "bowls",
    emoji: "🥗",
    badge: "Premium",
  },

  // Pães
  {
    id: "pao-queijo",
    name: "Pão de Queijo",
    description: "Pão de queijo com queijo canastra",
    price: 11.5,
    category: "paes",
    emoji: "🧀",
  },
  {
    id: "pao-queijo-requeijao",
    name: "Pão de Queijo com Requeijão",
    description: "Pão de queijo com queijo canastra, na chapa e com requeijão na entrada",
    price: 17,
    category: "paes",
    emoji: "🧀",
  },
  {
    id: "pao-chapa",
    name: "Pão na Chapa",
    description: "Pão de fermentação natural na chapa",
    price: 16,
    category: "paes",
    emoji: "🍞",
  },
  {
    id: "pao-chapa-requeijao",
    name: "Pão na Chapa com Requeijão",
    description: "Pão de fermentação natural com requeijão na chapa",
    price: 21.5,
    category: "paes",
    emoji: "🍞",
  },

  // Doces
  {
    id: "rabanada-chocolate",
    name: "Rabanada de Chocolate",
    description: "Nossa rabanada brûlée, com ganache de chocolate 65% e farofinha de castanha de caju",
    price: 27,
    category: "doces",
    emoji: "🍫",
    badge: "Irresistível",
  },
  {
    id: "rabanada-morango",
    name: "Rabanada de Morango",
    description: "Nossa rabanada brûlée, com compota de morango",
    price: 27,
    category: "doces",
    emoji: "🍓",
  },
  {
    id: "brigadeiro",
    name: "Brigadeiro Tradicional",
    description: "Nosso brigadeiro tradicional com chocolate e granulado meio-amargo",
    price: 9.5,
    category: "doces",
    emoji: "🍬",
  },

  // Sucos e Chás
  {
    id: "limonada-rosa",
    name: "Limonada Rosa",
    description: "Limonada suíça com hibisco — Para melhor experiência, beba gelado",
    price: 19.5,
    category: "sucos",
    emoji: "🍋",
  },
  {
    id: "mate-limao",
    name: "Mate com Limão",
    description: "Chá Mate com limonada suíça — Para melhor experiência, beba gelado",
    price: 18.5,
    category: "sucos",
    emoji: "🍵",
  },
  {
    id: "cha-hibisco",
    name: "Chá de Hibisco Gelado",
    description: "Chá de hibisco gelado — Para melhor experiência, beba gelado",
    price: 17,
    category: "sucos",
    emoji: "🌺",
  },
  {
    id: "soda-roma",
    name: "Soda de Romã e Limão Siciliano",
    description: "Soda feita com melaço de romã e compota de limão siciliano",
    price: 22,
    category: "sucos",
    emoji: "🍹",
  },

  // Cafés
  {
    id: "latte-gelado",
    name: "Latte Gelado",
    description: "Espresso com leite integral — Para melhor experiência, beba gelado",
    price: 19.5,
    category: "cafes",
    emoji: "☕",
  },
  {
    id: "latte-caramelo",
    name: "Latte de Caramelo Gelado",
    description: "Espresso com leite integral e caramelo feito na casa — Para melhor experiência, beba gelado",
    price: 21,
    category: "cafes",
    emoji: "☕",
  },
  {
    id: "latte-caramelo-aveia",
    name: "Latte de Caramelo Gelado com Leite de Aveia",
    description: "Espresso com leite de aveia Nude e caramelo feito na casa — Para melhor experiência, beba gelado",
    price: 25.5,
    category: "cafes",
    emoji: "☕",
  },
  {
    id: "latte-flor-laranjeira",
    name: "Latte de Flor de Laranjeira Gelado",
    description: "Espresso com leite de aveia Nude e xarope de flor de laranjeira — Para melhor experiência, beba gelado",
    price: 26.5,
    category: "cafes",
    emoji: "🌸",
  },
];
