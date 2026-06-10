// Toda la data hardcodeada de la demo — Hotel Azul Marino, Cartagena de Indias.
// Imágenes vía Unsplash (URLs directas). Copy curado, NO lorem ipsum.

const u = (id, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const hotelImages = {
  hero: u('photo-1571896349842-33c89424de2d', 1600),
  exterior: u('photo-1566073771259-6a8506099945', 1400),
  pool: u('photo-1540541338287-41700207dee6', 1200),
  terrace: u('photo-1582719478250-c89cae4dc85b', 1200),
  restaurant: u('photo-1414235077428-338989a2e8c0', 1200),
  detail: u('photo-1578683010236-d716f9a3f461', 1000),
  bar: u('photo-1551918120-9739cb430c6d', 1200),
  spa: u('photo-1540555700478-4be289fbecef', 1200),
  beach: u('photo-1507525428034-b723cf961d3e', 1400),
  facade: u('photo-1568084680786-a84f91d1153c', 1200),
  room1: u('photo-1631049307264-da0ec9d70304', 1200),
  room2: u('photo-1611892440504-42a792e24d32', 1200),
  room3: u('photo-1590490360182-c33d57733427', 1200),
}

export const initialHotel = {
  name: 'Hotel Azul Marino',
  city: 'Cartagena de Indias',
  country: 'Colombia',
  category: 'Boutique',
  stars: 4,
  description:
    'Hotel boutique frente al mar en la ciudad amurallada. 18 habitaciones, diseño de autor, gastronomía local y experiencia íntima a metros de la playa.',
  rooms: [
    'Superior Vista Ciudad',
    'Suite Junior Vista Mar',
    'Suite Master con Terraza Privada',
  ],
}

export const brandDNA = {
  palette: [
    { hex: '#1A3C5E', name: 'Azul Marino' },
    { hex: '#D4A853', name: 'Dorado Arena' },
    { hex: '#F7F3EE', name: 'Blanco Roto' },
    { hex: '#2C2C2C', name: 'Carbón' },
  ],
  typography: {
    display: 'Cormorant Garamond',
    body: 'Inter',
  },
  voice: 'Sofisticado, cercano, evocador del lugar',
  category: 'Hotel boutique de playa — 4 estrellas',
  valueProp: 'Experiencia local, diseño de autor, ubicación privilegiada',
  roomCategories: 3,
}

export const generationSteps = [
  { id: 'web', label: 'Sitio web generado', durationMs: 700 },
  { id: 'ig', label: 'Posts para Instagram (12 activos)', durationMs: 650 },
  { id: 'fb', label: 'Posts para Facebook (8 activos)', durationMs: 550 },
  { id: 'gbp', label: 'Ficha Google Business completada', durationMs: 600 },
  { id: 'ota', label: 'Perfil Booking.com / OTA optimizado', durationMs: 700 },
  { id: 'email', label: 'Campaña de email (bienvenida + oferta)', durationMs: 800 },
]

// ---------- Sitio Web ----------
export const websiteMeta = {
  domain: 'hotelazulmarino.presence.io',
  lastEdited: 'hace 2 minutos',
  seoScore: 94,
  webVitals: 'Passed',
  mobileOptimized: true,
  headline: 'Cartagena como pocos la conocen.',
  subheadline:
    'Un boutique de 18 habitaciones dentro de la muralla, frente al mar, donde cada detalle fue elegido a mano.',
  sections: [
    { id: 'rooms', label: 'Habitaciones' },
    { id: 'experiences', label: 'Experiencias' },
    { id: 'location', label: 'Ubicación' },
    { id: 'contact', label: 'Contacto' },
  ],
  rooms: [
    {
      name: 'Superior Vista Ciudad',
      pitch: 'Balcón sobre el casco histórico, 28 m²',
      price: 'desde USD 180 / noche',
      image: hotelImages.room1,
    },
    {
      name: 'Suite Junior Vista Mar',
      pitch: 'Ventanal panorámico al Caribe, 42 m²',
      price: 'desde USD 280 / noche',
      image: hotelImages.room2,
    },
    {
      name: 'Suite Master con Terraza',
      pitch: 'Terraza privada con jacuzzi, 65 m²',
      price: 'desde USD 480 / noche',
      image: hotelImages.room3,
    },
  ],
  experiences: [
    {
      title: 'Cena de degustación local',
      copy: 'Siete pasos con productos de pescadores de Bocachica.',
      image: hotelImages.restaurant,
    },
    {
      title: 'Recorrido por la muralla al atardecer',
      copy: 'Guía local, copa de vino y la mejor luz del día.',
      image: hotelImages.facade,
    },
    {
      title: 'Spa frente al mar',
      copy: 'Tratamientos con coco, café y arcillas del Caribe.',
      image: hotelImages.spa,
    },
  ],
}

// ---------- Redes sociales ----------
const igPosts = [
  {
    type: 'Post',
    size: '1080×1080',
    image: hotelImages.pool,
    overlay: 'Mañanas que no se apuran.',
    sub: 'Hotel Azul Marino · Cartagena',
  },
  {
    type: 'Post',
    size: '1080×1080',
    image: hotelImages.terrace,
    overlay: 'Terraza propia. Cielo prestado.',
    sub: 'Suite Master',
  },
  {
    type: 'Post',
    size: '1080×1080',
    image: hotelImages.restaurant,
    overlay: 'La cena de hoy:',
    sub: 'Pargo, plátano maduro, ají dulce.',
  },
  {
    type: 'Post',
    size: '1080×1080',
    image: hotelImages.detail,
    overlay: 'Cada detalle, elegido a mano.',
    sub: 'Diseño de autor',
  },
  {
    type: 'Story',
    size: '1080×1920',
    image: hotelImages.beach,
    overlay: 'A 40 pasos del mar.',
    sub: 'Desliza ↑',
  },
  {
    type: 'Story',
    size: '1080×1920',
    image: hotelImages.bar,
    overlay: 'Happy hour, 6 a 8 PM',
    sub: 'Bar de la terraza',
  },
  {
    type: 'Story',
    size: '1080×1920',
    image: hotelImages.spa,
    overlay: 'Reservá tu masaje',
    sub: 'Spa Azul',
  },
  {
    type: 'Reel cover',
    size: '1080×1920',
    image: hotelImages.facade,
    overlay: 'Un día en Azul Marino',
    sub: '▶ 0:47',
  },
  {
    type: 'Reel cover',
    size: '1080×1920',
    image: hotelImages.pool,
    overlay: '¿Y si te tomás 3 días?',
    sub: '▶ 0:30',
  },
  {
    type: 'Ad banner',
    size: '1080×1350',
    image: hotelImages.hero,
    overlay: 'Verano 2026 — 15% off',
    sub: 'Reservá antes del 30/06',
  },
]

const fbPosts = [
  {
    type: 'Post',
    size: '1200×630',
    image: hotelImages.hero,
    overlay: 'Tu próximo fin de semana, en Cartagena.',
    sub: 'Hotel Azul Marino · Reservas abiertas',
  },
  {
    type: 'Post',
    size: '1200×630',
    image: hotelImages.restaurant,
    overlay: 'Gastronomía local, con vista al Caribe.',
    sub: 'Restaurante Azul',
  },
  {
    type: 'Post',
    size: '1200×630',
    image: hotelImages.terrace,
    overlay: 'Suite Master — terraza privada con jacuzzi.',
    sub: 'Desde USD 480 / noche',
  },
  {
    type: 'Event cover',
    size: '1920×1080',
    image: hotelImages.bar,
    overlay: 'Cena maridada — 14 de julio',
    sub: 'Cupos limitados',
  },
  {
    type: 'Event cover',
    size: '1920×1080',
    image: hotelImages.spa,
    overlay: 'Semana de bienestar — agosto',
    sub: 'Yoga, spa y silencio',
  },
  {
    type: 'Page banner',
    size: '1640×624',
    image: hotelImages.beach,
    overlay: 'Hotel Azul Marino',
    sub: 'Cartagena de Indias',
  },
  {
    type: 'Ad creative',
    size: '1200×1200',
    image: hotelImages.pool,
    overlay: 'Última oportunidad — junio',
    sub: '20% off · Reservá ahora',
  },
]

const ttPosts = [
  {
    type: 'Video thumb',
    size: '1080×1920',
    image: hotelImages.pool,
    overlay: 'POV: te despertaste en Cartagena',
    sub: '▶ 0:22',
  },
  {
    type: 'Video thumb',
    size: '1080×1920',
    image: hotelImages.restaurant,
    overlay: 'Probamos los 7 pasos',
    sub: '▶ 0:38',
  },
  {
    type: 'Profile banner',
    size: '1080×1080',
    image: hotelImages.facade,
    overlay: '@hotelazulmarino',
    sub: 'Cartagena de Indias 🌊',
  },
]

export const socialPosts = {
  Instagram: igPosts,
  Facebook: fbPosts,
  TikTok: ttPosts,
}

export const campaignOptions = [
  'Promoción de verano',
  'Lanzamiento de nueva suite',
  'Oferta last-minute',
  'Semana de bienestar',
  'Día del viajero',
]

// ---------- Google Business ----------
export const googleBusiness = {
  name: 'Hotel Azul Marino',
  category: 'Hotel',
  secondaryCategories: ['Spa', 'Restaurante', 'Bar'],
  shortDescription:
    'Boutique de 18 habitaciones frente al mar, en la ciudad amurallada. Diseño de autor, gastronomía local y servicio personalizado.',
  hours: '24 horas · Recepción atendida',
  phone: '+57 5 664 0000',
  whatsapp: '+57 300 555 0123',
  website: 'hotelazulmarino.presence.io',
  address: 'Calle del Curato 38-42, Centro Histórico, Cartagena de Indias',
  attributes: [
    { id: 'pets', label: 'Se admiten mascotas', on: true },
    { id: 'wifi', label: 'WiFi gratis', on: true },
    { id: 'parking', label: 'Estacionamiento', on: true },
    { id: 'pool', label: 'Piscina', on: true },
    { id: 'spa', label: 'Spa', on: true },
    { id: 'restaurant', label: 'Restaurante en sitio', on: true },
    { id: 'bar', label: 'Bar', on: true },
    { id: 'breakfast', label: 'Desayuno incluido', on: false },
    { id: 'gym', label: 'Gimnasio', on: false },
    { id: 'accessible', label: 'Accesible en silla de ruedas', on: true },
  ],
  photos: [
    hotelImages.facade,
    hotelImages.pool,
    hotelImages.room2,
    hotelImages.restaurant,
    hotelImages.terrace,
    hotelImages.spa,
  ],
  reviews: [
    {
      author: 'María Fernández',
      stars: 5,
      date: 'hace 3 días',
      text: 'Una estadía perfecta. El personal estuvo atento sin ser invasivo, la habitación con vista al mar es un sueño, y la cena del restaurante todavía la recordamos. Volveríamos sin dudarlo.',
      aiReply:
        'María, muchísimas gracias por elegirnos y por tomarte el tiempo de escribirnos. Nos alegra que la Suite Vista Mar y la cena de degustación hayan sido parte de tu recuerdo. El equipo entero te agradece. Te esperamos pronto. — Camila, Hotel Azul Marino',
    },
    {
      author: 'Andrés Quintero',
      stars: 4.5,
      date: 'hace 1 semana',
      text: 'Excelente ubicación, dentro de la muralla pero tranquilo. La decoración es realmente cuidada. Solo un detalle: el desayuno podría tener más opciones locales.',
      aiReply:
        'Andrés, gracias por la reseña y por la observación sobre el desayuno — es feedback que estamos incorporando este mes con más opciones de la región. Será un gusto recibirte de nuevo para que veas el cambio. — Camila, Hotel Azul Marino',
    },
    {
      author: 'Lucía Restrepo',
      stars: 3,
      date: 'hace 2 semanas',
      text: 'La habitación es linda pero el aire acondicionado hacía ruido toda la noche. Lo reportamos a recepción y vinieron pero no se solucionó del todo.',
      aiReply:
        'Lucía, lamentamos sinceramente que la experiencia con el aire no haya estado a la altura. Ya cambiamos el equipo de esa habitación y reforzamos el protocolo de mantenimiento nocturno. Nos gustaría compensarte con una próxima estadía — escribinos a hola@hotelazulmarino.com. — Camila',
    },
  ],
}

// ---------- OTAs ----------
export const otas = {
  'Booking.com': {
    badge: 'Optimizado para Booking.com',
    description:
      'Hotel Azul Marino es un boutique de 18 habitaciones ubicado dentro de la ciudad amurallada de Cartagena, frente al mar Caribe. Combina arquitectura colonial restaurada con diseño contemporáneo de autor. Cuenta con piscina en el patio interior, restaurante de gastronomía local, spa y terraza con bar. WiFi gratuito, recepción 24 horas y estacionamiento privado disponibles.',
    completeness: 87,
    missing: ['Política de desayuno', 'Foto de baño en Superior', 'Precio temporada alta'],
  },
  Expedia: {
    badge: 'Optimizado para Expedia',
    description:
      'Boutique hotel of 18 rooms inside the walled old town of Cartagena, facing the Caribbean. Local-design rooms with restored balconies, an inner courtyard pool, a farm-to-table restaurant, spa services and a rooftop bar. Family-friendly, with 24-hour front desk and on-site parking.',
    completeness: 78,
    missing: ['Versión inglés de políticas', 'Tarifas con desayuno', 'Mapa de planta'],
  },
  Airbnb: {
    badge: 'Optimizado para Airbnb',
    description:
      'Te hospedamos en una de nuestras 18 habitaciones — pensá en quedarte como en una casa, no como en un hotel. Cocinamos con lo que trae el pescador, conocemos al chef de la esquina y te armamos el itinerario de tu visita. Si venís en pareja, pedí la Suite Junior. Si venís con tu gente, hablamos.',
    completeness: 92,
    missing: ['Reglas de la casa', 'Manual de bienvenida'],
  },
  TripAdvisor: {
    badge: 'Optimizado para TripAdvisor',
    description:
      'Premiado entre los 10 mejores boutiques de Cartagena por viajeros en 2025. Servicio personalizado, gastronomía destacada, ubicación inmejorable dentro de la muralla. Ideal para parejas, viajes de aniversario y escapadas culturales.',
    completeness: 81,
    missing: ['Respuestas a últimas 3 reseñas', 'Tour 360°'],
  },
}

export const otaRooms = [
  {
    name: 'Superior Vista Ciudad',
    description:
      'Habitación de 28 m² con balcón francés sobre el casco histórico. Cama king, baño en mármol, escritorio y minibar curado.',
    amenities: ['WiFi', 'Aire acondicionado', 'Caja fuerte', 'Smart TV', 'Minibar', 'Balcón'],
    price: 180,
    image: hotelImages.room1,
  },
  {
    name: 'Suite Junior Vista Mar',
    description:
      'Suite de 42 m² con ventanal panorámico al Caribe. Living independiente, cama king, baño con bañera profunda y amenities de autor.',
    amenities: ['WiFi', 'Aire acondicionado', 'Bañera', 'Living', 'Smart TV', 'Vista al mar'],
    price: 280,
    image: hotelImages.room2,
  },
  {
    name: 'Suite Master con Terraza',
    description:
      'Suite de 65 m² con terraza privada de 20 m², jacuzzi al aire libre y mayordomo asignado. La habitación insignia de la casa.',
    amenities: ['Terraza privada', 'Jacuzzi', 'Mayordomo', 'Bañera', 'Smart TV', 'Vista al mar'],
    price: 480,
    image: hotelImages.room3,
  },
]

// ---------- Email Marketing ----------
export const emailCampaigns = [
  {
    id: 'welcome',
    name: 'Email de bienvenida',
    detail: 'Serie de 1 email',
    status: 'Listo',
    subject: 'Te esperamos en Cartagena, [Nombre]',
    preheader: 'Lo que necesitás saber antes de llegar.',
    body: [
      'Hola [Nombre],',
      'Acabamos de confirmar tu reserva en Hotel Azul Marino del [check-in] al [check-out]. Estamos preparando todo para recibirte.',
      'Antes de llegar te dejamos tres cosas:',
      '· Cómo llegar desde el aeropuerto (te podemos enviar transfer privado, respondé este email).',
      '· Una reserva en el restaurante para tu primera noche, si querés. La cena local es 7 pasos y suele agotarse.',
      '· El número directo de Camila, tu host, por si te surge cualquier cosa: +57 300 555 0123.',
      'Nos vemos pronto.',
      'Camila — Hotel Azul Marino',
    ],
    cta: 'Confirmar mi llegada',
  },
  {
    id: 'high-season',
    name: 'Oferta de temporada alta',
    detail: 'Serie de 2 emails',
    status: 'Borrador',
    subject: 'Diciembre en Cartagena — antes de que se agote',
    preheader: '15% off si reservás antes del 30 de junio.',
    body: [
      'Hola,',
      'Diciembre en Cartagena es una de esas semanas que pasan rápido. Te escribimos antes de que se llene.',
      'Hasta el 30 de junio, podés reservar cualquier categoría con 15% off sobre la tarifa de temporada alta. La Suite Junior Vista Mar todavía tiene 4 noches disponibles en la última semana de diciembre.',
      'Si querés, te apartamos la habitación por 48 horas mientras lo pensás.',
      'Camila — Hotel Azul Marino',
    ],
    cta: 'Apartar mi habitación',
  },
  {
    id: 'review',
    name: 'Post-estadía: pedido de reseña',
    detail: '1 email automático',
    status: 'Listo',
    subject: 'Gracias por venir, [Nombre]',
    preheader: '¿Nos contás cómo fue?',
    body: [
      'Hola [Nombre],',
      'Esperamos que el viaje de regreso haya sido tranquilo. Para nosotros fue un gusto recibirte.',
      'Si tenés un minuto, nos ayudaría muchísimo que dejes una reseña en Google. Cada palabra que escribís pesa más que cualquier campaña que podamos hacer.',
      'Y si algo no estuvo a la altura, contámelo directamente a mí — prefiero saberlo y arreglarlo.',
      'Hasta la próxima.',
      'Camila — Hotel Azul Marino',
    ],
    cta: 'Dejar una reseña',
  },
  {
    id: 'newsletter',
    name: 'Newsletter mensual',
    detail: 'Template base',
    status: 'Borrador',
    subject: 'Lo que está pasando en Azul Marino este mes',
    preheader: 'Eventos, novedades y una receta nueva.',
    body: [
      'Hola,',
      'Tres cosas para contarte este mes:',
      '· La carta del restaurante cambió: agregamos un menú de cocina caribeña vegetariana, hecho con la huerta del Mercado de Bazurto.',
      '· El 14 de julio hacemos una cena maridada con un vinero de Valle de Uco. Quedan 6 cupos.',
      '· Lanzamos un programa de fines de semana largos con experiencias incluidas — escribinos si querés el detalle.',
      'Si pasás por Cartagena este mes, venite a tomar algo aunque no te quedes a dormir.',
      'Camila — Hotel Azul Marino',
    ],
    cta: 'Ver el calendario del mes',
  },
]

// ---------- Resumen / Dashboard ----------
export const summary = {
  channels: [
    {
      name: 'Sitio web',
      status: 'active',
      statusLabel: 'Activo',
      detail: 'hotelazulmarino.presence.io',
    },
    {
      name: 'Google Business',
      status: 'pending',
      statusLabel: 'Pendiente revisión',
      detail: '87% completo',
    },
    {
      name: 'Booking.com',
      status: 'active',
      statusLabel: 'Sincronizado',
      detail: '3 tipos de habitación',
    },
    {
      name: 'Instagram',
      status: 'ready',
      statusLabel: 'Assets listos',
      detail: '12 piezas generadas',
    },
    {
      name: 'Facebook',
      status: 'ready',
      statusLabel: 'Assets listos',
      detail: '8 piezas generadas',
    },
    {
      name: 'Email Marketing',
      status: 'pending',
      statusLabel: 'En borrador',
      detail: '4 campañas',
    },
  ],
  totalAssets: 47,
  activeChannels: 3,
  totalChannels: 6,
  presenceScore: 72,
}
