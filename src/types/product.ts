export interface Product {
  id: string;
  sku: string;
  name: string;
  mainCategory: string;
  description: string;
  brand: string;
  category: string;
  stock: number;
  thumbnail: string;
  images?: string[];
}
