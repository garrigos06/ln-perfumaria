import logo from "../../assets/media/logo.png"
import instagramIcon from "../../assets/media/instagram-icon.jpg"
import whatsappIcon from "../../assets/media/whatsapp-icon.png"
import { whatsappLink } from "../../lib/whatsapp"

const INSTAGRAM_URL = "https://www.instagram.com/lea_nyke_perfumaria_ofc/"

const HOURS = [
  { day: "Segunda a Sexta", hours: "08:00 – 18:00" },
  { day: "Sábado", hours: "08:00 – 13:00" },
  { day: "Domingo", hours: "Fechado" },
]

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="Perfumaria LN" className="h-12 w-12 rounded-full object-cover" />
            <span className="font-display text-xl">Perfumaria LN</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
            Perfumaria em Corumbá, MS. Fragrâncias nacionais, importadas e nichadas selecionadas com cuidado para
            você.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg text-gold-light">Horário de funcionamento</h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            {HOURS.map((h) => (
              <li key={h.day} className="flex justify-between gap-6">
                <span>{h.day}</span>
                <span>{h.hours}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-gold-light">Fale conosco</h3>
          <div className="mt-4 flex items-center gap-3">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white transition-transform hover:scale-110"
            >
              <img src={whatsappIcon} alt="" className="h-7 w-7" />
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white transition-transform hover:scale-110"
            >
              <img src={instagramIcon} alt="" className="h-7 w-7" />
            </a>
          </div>
          <p className="mt-4 text-sm text-cream/70">@lea_nyke_perfumaria_ofc</p>
          <p className="text-sm text-cream/70">+55 67 99146-0814</p>
        </div>
      </div>

      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Perfumaria LN — Corumbá, MS. Todos os direitos reservados.
      </div>
    </footer>
  )
}
