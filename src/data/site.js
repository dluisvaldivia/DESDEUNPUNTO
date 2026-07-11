// ⚠️ DATOS DE CONTACTO DEL SITIO — reemplazar los placeholders con los reales.

export const sitio = {
  nombre: 'Todo comienza con un punto',
  artista: 'Lilian De La Sotta',
  lema: 'Mandalas en puntillismo, hechos a mano punto a punto',
  // Dirección pública del sitio, sin barra final. Se usa para armar los enlaces
  // absolutos que exigen WhatsApp y las redes al generar la vista previa.
  url: 'https://dluisvaldivia.github.io/DESDEUNPUNTO',
  // WhatsApp: código de país + número, solo dígitos (Perú: 51 + 9 dígitos)
  whatsapp: '51948849148',
  // ⚠️ Redes reales (si alguna no se usa, poner null y desaparece del sitio)
  instagram: 'https://www.instagram.com/desdeunpunto',
  facebook: 'https://www.facebook.com/desdeunpunto',
}

export function enlaceWhatsApp(mensaje = 'Hola, vengo de la página Todo comienza con un punto y quiero hacer una consulta.') {
  return `https://wa.me/${sitio.whatsapp}?text=${encodeURIComponent(mensaje)}`
}

// Enlace público de una obra. Cada uno es una página propia (con barra final,
// que es como GitHub Pages sirve la carpeta) para que WhatsApp y las redes
// encuentren su vista previa; al abrirla, la app la muestra en la galería.
export function enlaceObra(id) {
  return `${sitio.url}/obra/${id}/`
}
