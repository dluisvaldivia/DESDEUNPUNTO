// ⚠️ DATOS DE CONTACTO DEL SITIO — reemplazar los placeholders con los reales.

export const sitio = {
  nombre: 'Desde un Punto',
  // ⚠️ Nombre real de la artista
  artista: 'Nombre de la Artista',
  lema: 'Mandalas en puntillismo, hechos a mano punto a punto',
  // ⚠️ WhatsApp real: código de país + número, solo dígitos (Perú: 51 + 9 dígitos)
  whatsapp: '51999999999',
  // ⚠️ Email real
  email: 'hola@desdeunpunto.pe',
  // ⚠️ Redes reales (si alguna no se usa, poner null y desaparece del sitio)
  instagram: 'https://www.instagram.com/desdeunpunto',
  facebook: 'https://www.facebook.com/desdeunpunto',
}

export function enlaceWhatsApp(mensaje = 'Hola, vengo de la página Desde un Punto y quiero hacer una consulta.') {
  return `https://wa.me/${sitio.whatsapp}?text=${encodeURIComponent(mensaje)}`
}

export function enlaceEmail(asunto = 'Consulta desde la página Desde un Punto') {
  return `mailto:${sitio.email}?subject=${encodeURIComponent(asunto)}`
}
