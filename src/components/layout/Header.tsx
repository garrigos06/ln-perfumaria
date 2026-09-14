import { useEffect, useState } from "react"
import logo from "../../assets/media/logo.png"

const LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#catalogo", label: "Catálogo" },
  { href: "#localizacao", label: "Localização" },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled ? "bg-cream/95 shadow-sm backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
        <a href="#topo" className="flex items-center gap-3">
          <img src={logo} alt="Perfumaria LN" className="h-12 w-12 rounded-full object-cover md:h-14 md:w-14" />
          <span
            className={`font-display text-lg tracking-wide md:text-xl ${
              scrolled ? "text-ink" : "text-white drop-shadow"
            }`}
          >
            Perfumaria LN
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm uppercase tracking-widest transition-colors hover:text-gold ${
                scrolled ? "text-ink-soft" : "text-white drop-shadow"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Abrir menu"
          className={`flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden`}
        >
          <span className={`h-px w-6 transition-colors ${scrolled ? "bg-ink" : "bg-white"}`} />
          <span className={`h-px w-6 transition-colors ${scrolled ? "bg-ink" : "bg-white"}`} />
        </button>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 bg-cream px-5 pb-4 shadow-sm md:hidden">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-sm uppercase tracking-widest text-ink-soft"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
