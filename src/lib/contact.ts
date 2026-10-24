export interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export const CONTACT_EMAIL = 'ramonmateus30@gmail.com'
export const WHATSAPP_NUMBER = '5531973102866'

const enc = encodeURIComponent

export function buildMailto(f: ContactForm): string {
  return `mailto:${CONTACT_EMAIL}?subject=${enc(f.subject)}&body=${enc(`Nome: ${f.name}\n\n${f.message}`)}`
}

export function buildWhatsAppUrl(f: ContactForm): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${enc(`Nome: ${f.name}\nAssunto: ${f.subject}\nMensagem: ${f.message}`)}`
}
