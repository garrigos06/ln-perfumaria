import { useState } from "react"
import { Pencil, Trash2 } from "lucide-react"
import { supabase } from "../../lib/supabase"
import type { Product } from "../../types/product"

interface ProductTableProps {
  products: Product[]
  onEdit: (product: Product) => void
  onChanged: () => void
}

export default function ProductTable({ products, onEdit, onChanged }: ProductTableProps) {
  const [busyId, setBusyId] = useState<string | null>(null)

  async function toggleActive(product: Product) {
    setBusyId(product.id)
    await supabase.from("products").update({ active: !product.active }).eq("id", product.id)
    setBusyId(null)
    onChanged()
  }

  async function handleDelete(product: Product) {
    if (!confirm(`Excluir "${product.name}" permanentemente?`)) return
    setBusyId(product.id)
    await supabase.from("products").delete().eq("id", product.id)
    setBusyId(null)
    onChanged()
  }

  if (products.length === 0) {
    return <p className="py-10 text-center text-sm text-ink-soft">Nenhum produto cadastrado ainda.</p>
  }

  return (
    <div className="overflow-x-auto bg-white shadow-sm">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-black/10 text-xs uppercase tracking-wide text-ink-soft">
            <th className="px-4 py-3">Foto</th>
            <th className="px-4 py-3">Nome</th>
            <th className="px-4 py-3">Marca</th>
            <th className="px-4 py-3">Categoria</th>
            <th className="px-4 py-3">Preço</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b border-black/5">
              <td className="px-4 py-3">
                {product.image_url ? (
                  <img src={product.image_url} alt="" className="h-12 w-12 rounded object-cover" />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded bg-cream-dark text-[10px] text-ink-soft/40">
                    LN
                  </div>
                )}
              </td>
              <td className="px-4 py-3 font-medium text-ink">{product.name}</td>
              <td className="px-4 py-3 text-ink-soft">{product.brand}</td>
              <td className="px-4 py-3 text-ink-soft">{product.category}</td>
              <td className="px-4 py-3 text-ink-soft">
                {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.price)}
              </td>
              <td className="px-4 py-3">
                <button
                  onClick={() => toggleActive(product)}
                  disabled={busyId === product.id}
                  className={`rounded-full px-3 py-1 text-xs ${
                    product.active ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {product.active ? "Visível" : "Oculto"}
                </button>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(product)}
                    aria-label="Editar"
                    className="rounded p-1.5 text-ink-soft hover:bg-cream-dark hover:text-ink"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(product)}
                    disabled={busyId === product.id}
                    aria-label="Excluir"
                    className="rounded p-1.5 text-ink-soft hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
