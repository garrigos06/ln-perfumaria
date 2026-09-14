import { useState } from "react"
import { Link } from "react-router-dom"
import { Plus } from "lucide-react"
import logo from "../../assets/media/logo.png"
import { useAuth } from "../../lib/AuthContext"
import { useProducts } from "../../hooks/useProducts"
import ProductForm from "../../components/admin/ProductForm"
import ProductTable from "../../components/admin/ProductTable"
import type { Product } from "../../types/product"

export default function Dashboard() {
  const { signOut } = useAuth()
  const { products, loading, refetch } = useProducts()
  const [editing, setEditing] = useState<Product | null | undefined>(undefined)

  const showForm = editing !== undefined

  function handleSaved() {
    setEditing(undefined)
    refetch()
  }

  return (
    <div className="min-h-screen bg-cream-dark">
      <header className="flex items-center justify-between bg-ink px-5 py-4 text-cream md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Perfumaria LN" className="h-9 w-9 rounded-full object-cover" />
          <span className="font-display text-lg">Painel Administrativo</span>
        </Link>
        <button
          onClick={signOut}
          className="text-xs uppercase tracking-widest text-cream/70 hover:text-cream"
        >
          Sair
        </button>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10 md:px-8">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl text-ink">Produtos</h1>
          {!showForm && (
            <button
              onClick={() => setEditing(null)}
              className="flex items-center gap-2 bg-ink px-5 py-2.5 text-xs uppercase tracking-widest text-cream hover:bg-gold-dark"
            >
              <Plus size={16} />
              Novo produto
            </button>
          )}
        </div>

        <div className="mt-6">
          {showForm ? (
            <ProductForm product={editing} onSaved={handleSaved} onCancel={() => setEditing(undefined)} />
          ) : loading ? (
            <p className="py-10 text-center text-sm text-ink-soft">Carregando...</p>
          ) : (
            <ProductTable products={products} onEdit={(p) => setEditing(p)} onChanged={refetch} />
          )}
        </div>
      </main>
    </div>
  )
}
