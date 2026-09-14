import { useCallback, useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import type { Product } from "../types/product"

interface UseProductsOptions {
  onlyActive?: boolean
}

export function useProducts({ onlyActive = false }: UseProductsOptions = {}) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    let query = supabase.from("products").select("*").order("created_at", { ascending: false })
    if (onlyActive) {
      query = query.eq("active", true)
    }
    const { data, error } = await query
    if (error) {
      setError(error.message)
    } else {
      setProducts(data as Product[])
      setError(null)
    }
    setLoading(false)
  }, [onlyActive])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, loading, error, refetch: fetchProducts }
}
