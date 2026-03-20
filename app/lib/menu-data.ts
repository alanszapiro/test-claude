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
};

export const categories: Category[] = [
  { id: "cafes", name: "Cafés", emoji: "☕" },
  { id: "lanches", name: "Lanches", emoji: "🥪" },
  { id: "refeicoes", name: "Refeições", emoji: "🍽️" },
  { id: "sobremesas", name: "Sobremesas", emoji: "🍰" },
  { id: "bebidas", name: "Bebidas", emoji: "🥤" },
];

export const menuItems: MenuItem[] = [
  // Cafés
  {
    id: "espresso",
    name: "Espresso",
    description: "Café encorpado extraído sob pressão, intenso e aromático",
    price: 7,
    category: "cafes",
    emoji: "☕",
    badge: "Clássico",
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    description: "Espresso com leite vaporizado e espuma cremosa",
    price: 12,
    category: "cafes",
    emoji: "☕",
  },
  {
    id: "latte",
    name: "Café Latte",
    description: "Espresso suave com bastante leite vaporizado",
    price: 14,
    category: "cafes",
    emoji: "☕",
    badge: "Favorito",
  },
  {
    id: "americano",
    name: "Americano",
    description: "Espresso diluído em água quente, sabor suave",
    price: 9,
    category: "cafes",
    emoji: "☕",
  },
  {
    id: "macchiato",
    name: "Macchiato",
    description: "Espresso com uma camada de espuma de leite",
    price: 10,
    category: "cafes",
    emoji: "☕",
  },
  {
    id: "cold-brew",
    name: "Cold Brew",
    description: "Café extraído a frio por 12h, suave e refrescante",
    price: 16,
    category: "cafes",
    emoji: "🧊",
    badge: "Novidade",
  },

  // Lanches
  {
    id: "croissant-queijo",
    name: "Croissant de Queijo",
    description: "Croissant folhado recheado com queijo gruyère derretido",
    price: 14,
    category: "lanches",
    emoji: "🥐",
    badge: "Mais pedido",
  },
  {
    id: "pao-queijo",
    name: "Pão de Queijo",
    description: "Tradicional pão de queijo mineiro, crocante por fora e macio por dentro",
    price: 6,
    category: "lanches",
    emoji: "🧀",
  },
  {
    id: "sanduiche-natural",
    name: "Sanduíche Natural",
    description: "Pão integral, frango, cream cheese, alface e tomate",
    price: 18,
    category: "lanches",
    emoji: "🥪",
  },
  {
    id: "tapioca",
    name: "Tapioca",
    description: "Tapioca com queijo, presunto e tomate seco",
    price: 15,
    category: "lanches",
    emoji: "🫓",
  },
  {
    id: "toast-avocado",
    name: "Toast de Abacate",
    description: "Pão australiano tostado com creme de abacate e ovo mexido",
    price: 22,
    category: "lanches",
    emoji: "🥑",
    badge: "Saudável",
  },

  // Refeições
  {
    id: "prato-dia",
    name: "Prato do Dia",
    description: "Arroz, feijão, proteína grelhada, salada e sobremesa",
    price: 32,
    category: "refeicoes",
    emoji: "🍽️",
    badge: "Completo",
  },
  {
    id: "salada-caesar",
    name: "Salada Caesar",
    description: "Alface romana, croutons, parmesão e molho caesar",
    price: 26,
    category: "refeicoes",
    emoji: "🥗",
  },
  {
    id: "quiche-lorraine",
    name: "Quiche Lorraine",
    description: "Torta francesa com bacon, queijo e creme de leite",
    price: 24,
    category: "refeicoes",
    emoji: "🥧",
  },

  // Sobremesas
  {
    id: "brownie",
    name: "Brownie de Chocolate",
    description: "Brownie fudgy com nozes e calda de chocolate belga",
    price: 12,
    category: "sobremesas",
    emoji: "🍫",
    badge: "Irresistível",
  },
  {
    id: "cheesecake",
    name: "Cheesecake de Frutas",
    description: "Cheesecake cremoso com calda de frutas vermelhas",
    price: 16,
    category: "sobremesas",
    emoji: "🍰",
  },
  {
    id: "bolo-cenoura",
    name: "Bolo de Cenoura",
    description: "Bolo fofo com calda de chocolate, receita da vovó",
    price: 11,
    category: "sobremesas",
    emoji: "🎂",
    badge: "Caseiro",
  },
  {
    id: "tiramisu",
    name: "Tiramisù",
    description: "Sobremesa italiana com mascarpone, café e cacau",
    price: 18,
    category: "sobremesas",
    emoji: "🍮",
  },

  // Bebidas
  {
    id: "suco-laranja",
    name: "Suco de Laranja",
    description: "Suco natural de laranja espremido na hora",
    price: 10,
    category: "bebidas",
    emoji: "🍊",
  },
  {
    id: "vitamina",
    name: "Vitamina de Frutas",
    description: "Vitamina cremosa de banana, morango e mel",
    price: 14,
    category: "bebidas",
    emoji: "🥤",
  },
  {
    id: "agua-coco",
    name: "Água de Coco",
    description: "Água de coco natural gelada",
    price: 8,
    category: "bebidas",
    emoji: "🥥",
  },
  {
    id: "refrigerante",
    name: "Refrigerante",
    description: "Coca-Cola, Guaraná ou Sprite 350ml",
    price: 7,
    category: "bebidas",
    emoji: "🧃",
  },
];
