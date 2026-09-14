export type ProductCategory =
  | "Feminino"
  | "Masculino"
  | "Unissex"
  | "Importado"
  | "Nichado"
  | "Kit / Presente"

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Feminino",
  "Masculino",
  "Unissex",
  "Importado",
  "Nichado",
  "Kit / Presente",
]

export interface Product {
  id: string
  name: string
  brand: string
  category: ProductCategory
  price: number
  description: string
  image_url: string | null
  active: boolean
  created_at: string
}

export type ProductInput = Omit<Product, "id" | "created_at">
