export const WHATSAPP_NUMBER = "5567991460814"

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  if (!message) return base
  return `${base}?text=${encodeURIComponent(message)}`
}

export function productWhatsappLink(productName: string) {
  return whatsappLink(
    `Olá! Tenho interesse no perfume "${productName}" que vi no site da Perfumaria LN. Ainda está disponível?`
  )
}
