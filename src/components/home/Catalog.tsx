import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import { useProducts } from "../../hooks/useProducts"
import { PRODUCT_CATEGORIES } from "../../types/product"
import ProductCard from "./ProductCard"

export default function Catalog() {
  const { products, loading, error } = useProducts({ onlyActive: true })
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<string>("Todos")

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = category === "Todos" || p.category === category
      const matchesSearch =
        search.trim() === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [products, search, category])

  return (
    <section id="catalogo" className="bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest-lg text-gold-dark">Catálogo</p>
          <h2 className="mt-3 text-3xl text-ink md:text-4xl">Nossas fragrâncias</h2>
        </div>

        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft/50" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nome ou marca..."
              className="w-full border border-black/10 bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-gold"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {["Todos", ...PRODUCT_CATEGORIES].map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`border px-4 py-2 text-xs uppercase tracking-wide transition-colors ${
                  category === c
                    ? "border-ink bg-ink text-cream"
                    : "border-black/10 text-ink-soft hover:border-ink"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10">
          {loading && (
            <p className="py-16 text-center text-sm text-ink-soft">Carregando produtos...</p>
          )}

          {error && (
            <p className="py-16 text-center text-sm text-red-600">
              Não foi possível carregar o catálogo agora. Tente novamente em instantes.
            </p>
          )}

          {!loading && !error && filtered.length === 0 && (
            <p className="py-16 text-center text-sm text-ink-soft">
              Nenhum produto encontrado para essa busca.
            </p>
          )}

          {!loading && !error && filtered.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
