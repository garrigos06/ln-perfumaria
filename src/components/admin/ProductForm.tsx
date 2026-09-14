import { useState, type FormEvent } from "react"
import { supabase, PRODUCTS_BUCKET } from "../../lib/supabase"
import { PRODUCT_CATEGORIES, type Product, type ProductCategory } from "../../types/product"

interface ProductFormProps {
  product?: Product | null
  onSaved: () => void
  onCancel: () => void
}

export default function ProductForm({ product, onSaved, onCancel }: ProductFormProps) {
  const [name, setName] = useState(product?.name ?? "")
  const [brand, setBrand] = useState(product?.brand ?? "")
  const [category, setCategory] = useState<ProductCategory>(product?.category ?? PRODUCT_CATEGORIES[0])
  const [price, setPrice] = useState(product ? String(product.price) : "")
  const [description, setDescription] = useState(product?.description ?? "")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(product?.image_url ?? null)
  const [active, setActive] = useState(product?.active ?? true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleImageChange(file: File | null) {
    setImageFile(file)
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    }
  }

  async function uploadImage(): Promise<string | null> {
    if (!imageFile) return product?.image_url ?? null

    const ext = imageFile.name.split(".").pop()
    const fileName = `${crypto.randomUUID()}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from(PRODUCTS_BUCKET)
      .upload(fileName, imageFile, { cacheControl: "3600", upsert: false })

    if (uploadError) {
      throw new Error(`Falha ao enviar imagem: ${uploadError.message}`)
    }

    const { data } = supabase.storage.from(PRODUCTS_BUCKET).getPublicUrl(fileName)
    return data.publicUrl
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const imageUrl = await uploadImage()
      const priceNumber = Number(price.replace(",", "."))

      if (Number.isNaN(priceNumber) || priceNumber < 0) {
        throw new Error("Informe um preço válido.")
      }

      const payload = {
        name: name.trim(),
        brand: brand.trim(),
        category,
        price: priceNumber,
        description: description.trim(),
        image_url: imageUrl,
        active,
      }

      if (product) {
        const { error: updateError } = await supabase.from("products").update(payload).eq("id", product.id)
        if (updateError) throw new Error(updateError.message)
      } else {
        const { error: insertError } = await supabase.from("products").insert(payload)
        if (insertError) throw new Error(insertError.message)
      }

      onSaved()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado ao salvar o produto.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 shadow-sm">
      <h2 className="font-display text-xl text-ink">{product ? "Editar produto" : "Novo produto"}</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-ink-soft">Nome do perfume *</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-ink-soft">Marca *</label>
          <input
            required
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-ink-soft">Categoria *</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as ProductCategory)}
            className="w-full border border-black/10 bg-white px-3 py-2.5 text-sm outline-none focus:border-gold"
          >
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wide text-ink-soft">Preço (R$) *</label>
          <input
            required
            inputMode="decimal"
            placeholder="0,00"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-gold"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs uppercase tracking-wide text-ink-soft">Descrição curta</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-gold"
        />
      </div>

      <div>
        <label className="mb-1 block text-xs uppercase tracking-wide text-ink-soft">Foto do produto</label>
        <div className="flex items-center gap-4">
          {imagePreview && (
            <img src={imagePreview} alt="Pré-visualização" className="h-20 w-20 rounded object-cover" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
            className="text-sm"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-ink-soft">
        <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} className="h-4 w-4" />
        Visível no site (em estoque)
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="mt-2 flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-ink px-6 py-2.5 text-xs uppercase tracking-widest text-cream transition-colors hover:bg-gold-dark disabled:opacity-50"
        >
          {saving ? "Salvando..." : "Salvar produto"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="border border-black/10 px-6 py-2.5 text-xs uppercase tracking-widest text-ink-soft hover:border-ink"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
