import type { Lang, Bilingual } from './i18n';

const shared = {
  name: 'Henna Tattoo Albania',
  shortName: 'Henna Tattoo Albania',
  artist: 'Fjorentina Hoxha',

  location: {
    label: 'Kompleksi "Garden City", Rruga Kastriotet, Tirana, Albania',
    shortLabel: 'Garden City, Tirana',
    city: 'Tirana',
    country: 'Albania',
    countryCode: 'AL',
    postalCode: '1007',
    streetAddress: 'Rruga Kastriotet, Kompleksi "Garden City"',
    latitude: 41.3438275,
    longitude: 19.7783933,
    mapsUrl:
      'https://www.google.com/maps/place/Amer+Market,+Kompleksi,+Garden+City,+Rruga+Kastriotet,+Tiran%C3%AB+1007,+Albania/@41.3438275,19.7783933,16z',
    embedUrl:
      'https://www.google.com/maps?q=41.3438275,19.7783933&z=16&output=embed',
  },

  serviceAreas: [
    { name: 'Tirana',  nameSq: 'Tiranë'  },
    { name: 'Durrës',  nameSq: 'Durrës'  },
    { name: 'Vlorë',   nameSq: 'Vlorë'   },
    { name: 'Shkodër', nameSq: 'Shkodër' },
    { name: 'Korçë',   nameSq: 'Korçë'   },
    { name: 'Elbasan', nameSq: 'Elbasan' },
  ],

  contact: {
    email: 'fjorentina1998@gmail.com',
    phone: '0688178796',
    phoneIntl: '+355688178796',
    whatsappNumber: '355688178796',
  },

  social: {
    instagramHandle: 'henna_tattoo_albania',
    instagramUrl: 'https://www.instagram.com/henna_tattoo_albania/',
    tiktokHandle: 'henna_tattoo_albania',
    tiktokUrl: 'https://www.tiktok.com/@henna_tattoo_albania',
  },

  terms: {
    en: { henna: 'henna', tattoo: 'tattoo', bridal: 'bridal',  wedding: 'wedding'  },
    sq: { henna: 'këna',  tattoo: 'tatuazh', bridal: 'nuse',   wedding: 'dasmë'    },
  },

  keywords: {
    primary: [
      'henna tattoo Tirana',
      'henna Tirana',
      'mehndi Tirana',
      'kana Tiranë',
      'tatuazh me kana Tirana',
      'henna artist Tirana',
      'henna Albania',
    ],
    bridal: [
      'bridal henna Tirana',
      'henna për nuse',
      'kana për dasmë',
      'wedding mehndi Albania',
    ],
    longTail: [
      'how long does henna last',
      'is henna safe for skin',
      'best henna artist in Tirana',
      'henna prices Tirana',
      'where to get henna in Tirana',
    ],
  },
};

const i18n: Record<Lang, { tagline: string; description: string; credentials: string }> = {
  en: {
    tagline: 'Traditional & Modern Henna Art',
    credentials: 'Certified Henna Master — Dubai Henna Master Course (2025)',
    description:
      'Professional henna tattoo artist in Tirana, Albania. Bridal mehndi, jagua, white, glitter and colourful henna for weddings, festivals, parties and events. Booking nationwide.',
  },
  sq: {
    tagline: 'Art tradicional & modern me këna',
    credentials: 'Artiste e certifikuar e kënasë — Dubai Henna Master Course (2025)',
    description:
      'Artiste profesionale e tatuazheve me këna në Tiranë, Shqipëri. Këna për nuse (mehndi), jagua, e bardhë, me xixa dhe me ngjyra për dasma, festivale, festa dhe evente. Rezervime në të gjithë vendin.',
  },
};

export function getSite(lang: Lang) {
  return { ...shared, ...i18n[lang] };
}

export const site = { ...shared, ...i18n.en };

export type SiteConfig = ReturnType<typeof getSite>;
export type { Bilingual };
