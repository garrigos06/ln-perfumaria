const ADDRESS = "Rua Exemplo, 123 - Centro, Corumbá - MS"
const MAPS_EMBED_SRC =
  "https://www.google.com/maps?q=Corumb%C3%A1%2C+MS&output=embed"
const MAPS_LINK = "https://www.google.com/maps/search/?api=1&query=Corumb%C3%A1%2C+MS"

export default function Location() {
  return (
    <section id="localizacao" className="bg-cream-dark">
      <div className="mx-auto grid max-w-6xl gap-0 md:grid-cols-2">
        <div className="flex flex-col justify-center px-5 py-16 md:px-8 lg:px-16">
          <p className="text-xs uppercase tracking-widest-lg text-gold-dark">Visite-nos</p>
          <h2 className="mt-3 text-3xl text-ink md:text-4xl">Nossa loja em Corumbá</h2>
          <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
            Venha conhecer pessoalmente nossa seleção de fragrâncias e receber um atendimento exclusivo.
          </p>
          <p className="mt-6 font-medium text-ink">{ADDRESS}</p>
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-fit items-center gap-2 border border-ink px-6 py-3 text-xs uppercase tracking-widest text-ink transition-colors hover:bg-ink hover:text-cream"
          >
            Ver rota no mapa
          </a>
        </div>
        <div className="h-80 w-full md:h-auto md:min-h-[420px]">
          <iframe
            title="Localização da Perfumaria LN"
            src={MAPS_EMBED_SRC}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}
