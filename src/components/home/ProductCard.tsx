import type { Product } from "../../types/product"
import { productWhatsappLink } from "../../lib/whatsapp"

export default function ProductCard({ product }: { product: Product }) {
  const price = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(product.price)

  return (
    <div className="group flex flex-col overflow-hidden border border-black/5 bg-white transition-shadow hover:shadow-lg hover:shadow-black/5">
      <div className="aspect-square w-full overflow-hidden bg-cream-dark">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-ink-soft/30">
            <span className="font-display text-2xl">LN</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-[11px] uppercase tracking-widest text-gold-dark">{product.brand}</p>
        <h3 className="mt-1 font-display text-xl text-ink">{product.name}</h3>
        <p className="mt-1 text-xs uppercase tracking-wide text-ink-soft/60">{product.category}</p>
        {product.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">{product.description}</p>
        )}

        <div className="mt-4 flex flex-1 items-end justify-between gap-3">
          <span className="font-display text-lg text-ink">{price}</span>
          <a
            href={productWhatsappLink(product.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap border border-ink px-4 py-2 text-[11px] uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            Comprar via WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
