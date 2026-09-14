import heroVideo from "../../assets/media/hero-video.mp4"

export default function Hero() {
  return (
    <section id="topo" className="relative flex h-[92vh] min-h-[560px] w-full items-center justify-center overflow-hidden">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60" />

      <div className="relative z-10 flex flex-col items-center px-5 text-center text-white">
        <p className="text-xs uppercase tracking-widest-lg text-gold-light">Corumbá · MS</p>
        <h1 className="mt-4 text-5xl leading-tight drop-shadow-md md:text-7xl">Perfumaria LN</h1>
        <p className="mt-5 max-w-md text-sm uppercase tracking-widest text-white/90 md:text-base">
          Fragrâncias que contam a sua história
        </p>
        <a
          href="#catalogo"
          className="mt-10 border border-white px-8 py-3 text-xs uppercase tracking-widest transition-colors hover:bg-white hover:text-ink"
        >
          Ver catálogo
        </a>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/80">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 4v16m0 0l-6-6m6 6l6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}
