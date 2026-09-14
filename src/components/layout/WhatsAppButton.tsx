import whatsappIcon from "../../assets/media/whatsapp-icon.png"
import { whatsappLink } from "../../lib/whatsapp"

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("Olá! Vim pelo site da Perfumaria LN e gostaria de mais informações.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg shadow-black/20 ring-1 ring-black/5 transition-transform hover:scale-110 md:bottom-8 md:right-8"
    >
      <img src={whatsappIcon} alt="WhatsApp" className="h-9 w-9" />
    </a>
  )
}
