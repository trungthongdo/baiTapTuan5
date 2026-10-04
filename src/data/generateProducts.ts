import type { Product } from "../types";

const CATEGORIES = [
  "Điện tử",
  "Thời trang",
  "Gia dụng",
  "Sách",
  "Thể thao",
  "Làm đẹp",
  "Đồ chơi",
  "Thực phẩm",
];

export function generateProducts(count: number): Product[] {
  const products: Product[] = [];
  for (let i = 0; i < count; i++) {
    products.push({
      id: i + 1,
      name: `Sản phẩm ${i + 1}`,
      category: CATEGORIES[i % CATEGORIES.length],
      price: Math.round((Math.random() * 2_000_000 + 50_000) / 1000) * 1000,
      stock: Math.floor(Math.random() * 200),
    });
  }
  return products;
}
