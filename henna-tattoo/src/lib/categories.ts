export type PriceItem = {
  name: string;
  description?: string;
  price: string;
};

export type Category = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  accent: string;
  image?: string;
  heroImage?: string;
  priceChart?: string;
  gallery: string[];
  priceList: PriceItem[];
  startingAt: string;
};

export const categories: Category[] = [
  {
    slug: 'jagua-henna',
    title: 'Jagua Henna',
    tagline: 'Black to dark blue — lasts 7 to 21 days',
    description:
      'A natural alternative to traditional henna, made from the jagua fruit. Leaves a bold black to dark-blue stain that resembles a real tattoo.',
    longDescription:
      'Jagua is extracted from the Genipa americana fruit and produces the darkest natural skin stain available. Colour deepens over 48 hours to a rich black-blue and lasts 7 to 21 days. Perfect for anyone who loves the look of a black-ink tattoo without the permanence.',
    accent: 'from-slate-800 to-slate-950',
    image: '/images/jagua_category.jpg',
    priceChart: '/images/jagua.png',
    gallery: [
      '/images/jagua/137F2BF8-00FB-4E57-8B00-D82C41F2AB7D.JPG',
      '/images/jagua/340FA425-F74C-49F1-91A0-BFF6E53FCD00.JPG',
      '/images/jagua/IMG_0003.jpeg',
      '/images/jagua/IMG_0010.jpeg',
      '/images/jagua/IMG_1206.jpeg',
      '/images/jagua/IMG_2975.jpg',
      '/images/jagua/IMG_2977.jpg',
      '/images/jagua/IMG_2978.jpg',
      '/images/jagua/IMG_2979.jpg',
      '/images/jagua/IMG_2980.jpg',
      '/images/jagua/IMG_2981.jpg',
      '/images/jagua/IMG_2986.jpg',
      '/images/jagua/IMG_2988.jpg',
      '/images/jagua/IMG_2989.jpg',
      '/images/jagua/IMG_2990.jpg',
      '/images/jagua/IMG_2991.jpg',
      '/images/jagua/IMG_2993.jpg',
      '/images/jagua/IMG_2998.jpg',
      '/images/jagua/IMG_2999.jpg',
      '/images/jagua/IMG_3022.jpeg',
      '/images/jagua/IMG_3025.jpeg',
      '/images/jagua/IMG_3100.jpeg',
      '/images/jagua/IMG_3114.jpeg',
      '/images/jagua/IMG_3192.JPG',
      '/images/jagua/IMG_4574.jpeg',
      '/images/jagua/IMG_5553.jpeg',
      '/images/jagua/IMG_5571.jpeg',
      '/images/jagua/IMG_5572.jpeg',
      '/images/jagua/IMG_6134.jpeg',
      '/images/jagua/IMG_7269.jpeg',
      '/images/jagua/IMG_7355.jpeg',
      '/images/jagua/IMG_7979.jpg',
      '/images/jagua/IMG_7980.jpg',
      '/images/jagua/IMG_7981.jpg',
      '/images/jagua/IMG_8300.jpeg',
      '/images/jagua/IMG_8602.jpeg',
      '/images/jagua/jagua.jpg',
    ],
    startingAt: '15€',
    priceList: [
      { name: 'Small design',  description: 'Finger, wrist or ankle piece',           price: '15€' },
      { name: 'Small-medium',  description: 'Wrist with extension or small forearm',  price: '20€' },
      { name: 'Medium design', description: 'Forearm or back of hand',                price: '25€' },
      { name: 'Large design',  description: 'Full hand or calf',                      price: '40€' },
      { name: 'Extra-large',   description: 'Sleeve or bespoke piece',                price: '45€' },
    ],
  },
  {
    slug: 'brown-henna',
    title: 'Brown Henna',
    tagline: 'Organic reddish-brown — lasts 7 to 14 days',
    description:
      'Traditional organic henna paste. Safe, skin-friendly, and the classic choice for bridal and festival designs.',
    longDescription:
      'Made from pure Lawsonia inermis, brown henna develops from orange to a deep reddish-brown over 24 to 48 hours and lasts 7 to 14 days. The hallmark of bridal mehndi — intricate, detailed, and timeless.',
    accent: 'from-henna-400 to-henna-700',
    image: '/images/naturalhenna_category.jpg',
    priceChart: '/images/natural.png',
    gallery: [
      '/images/natural/2FECCD93-FF52-4CD5-B3C3-8DA53E9971AC%20(1).JPG',
      '/images/natural/IMG_0413.jpeg',
      '/images/natural/IMG_2995.jpg',
      '/images/natural/IMG_2996.jpg',
      '/images/natural/IMG_2997.jpg',
      '/images/natural/IMG_6028.jpeg',
      '/images/natural/IMG_6758.jpeg',
      '/images/natural/IMG_7968.jpeg',
      '/images/natural/IMG_7969.jpeg',
      '/images/natural/IMG_7982.jpg',
      '/images/natural/IMG_8145.jpeg',
      '/images/natural/IMG_8147.jpeg',
      '/images/natural/IMG_8176.jpeg',
      '/images/natural/IMG_8218.jpeg',
      '/images/natural/IMG_8222.jpeg',
      '/images/natural/IMG_8231.jpeg',
      '/images/natural/IMG_8239.jpeg',
      '/images/natural/IMG_8240.jpeg',
      '/images/natural/IMG_8244.jpeg',
      '/images/natural/IMG_8288.jpeg',
      '/images/natural/IMG_8295.jpeg',
      '/images/natural/IMG_8301.jpeg',
      '/images/natural/IMG_8303.jpeg',
      '/images/natural/IMG_8318.jpeg',
      '/images/natural/IMG_8324.jpeg',
      '/images/natural/IMG_8330.jpeg',
      '/images/natural/IMG_8333.jpeg',
      '/images/natural/IMG_8336.jpeg',
      '/images/natural/IMG_8338.jpeg',
      '/images/natural/IMG_8340.jpeg',
      '/images/natural/IMG_8342.jpeg',
      '/images/natural/IMG_8343%20(1).jpeg',
      '/images/natural/IMG_8343.jpeg',
      '/images/natural/IMG_8346.jpeg',
      '/images/natural/IMG_8349.jpeg',
      '/images/natural/IMG_8351.jpeg',
      '/images/natural/IMG_8376.JPG',
      '/images/natural/IMG_8514.jpeg',
      '/images/natural/IMG_8664.jpeg',
      '/images/natural/IMG_8691.jpeg',
    ],
    startingAt: '10€',
    priceList: [
      { name: 'Small design',   description: 'Single motif, wrist or ankle',      price: '10€' },
      { name: 'Medium design',  description: 'Forearm or back of hand',           price: '15€' },
      { name: 'Large design',   description: 'Full hand or calf',                 price: '25€' },
      { name: 'Bridal hands',   description: 'Hands + forearm, both sides',       price: '35€' },
      { name: 'Bridal package', description: 'Hands + feet, full bridal motif',   price: '40€' },
    ],
  },
  {
    slug: 'white-henna',
    title: 'White Henna',
    tagline: 'Elegant lace — bridal, photograph-ready',
    description:
      'A body-safe white adhesive paste that sits on the skin like lace. Stunning against bronzed skin and beloved for weddings.',
    longDescription:
      'White henna is not a stain — it is a raised, pearly design that lasts 1 to 3 days, making it ideal for weddings, photoshoots and events. Pairs beautifully with gemstones and glitter accents.',
    accent: 'from-stone-100 to-stone-300',
    image: '/images/white_category.jpg',
    priceChart: '/images/whiteglitter.png',
    gallery: [
      '/images/white/IMG_0592.jpg',
      '/images/white/IMG_0596.jpeg',
      '/images/white/IMG_0602.jpg',
      '/images/white/IMG_0603.jpg',
      '/images/white/IMG_0604.jpg',
      '/images/white/IMG_0960.JPG',
      '/images/white/IMG_2984.jpg',
      '/images/white/IMG_2994.jpg',
      '/images/white/IMG_5463.jpeg',
      '/images/white/IMG_5465.jpeg',
    ],
    startingAt: '10€',
    priceList: [
      { name: 'Small design',   description: 'Finger or wrist accent',           price: '10€' },
      { name: 'Medium design',  description: 'Forearm or shoulder',              price: '15€' },
      { name: 'Large design',   description: 'Full hand or back',                price: '20€' },
      { name: 'Bridal piece',   description: 'Extended bridal design',           price: '30€' },
      { name: 'With gems & glitter', description: 'Full design with gem accents', price: '35€' },
    ],
  },
  {
    slug: 'glitter-henna',
    title: 'Glitter Henna',
    tagline: 'Sparkle that lasts the whole night',
    description:
      'Cosmetic-grade glitter layered over henna or on its own. A crowd favourite at parties, festivals and birthdays.',
    longDescription:
      'Glitter henna adds shimmer to classic or white henna designs, or stands alone as a dazzling temporary tattoo. Skin-safe, waterproof on light contact, and photographs beautifully under stage and event lighting.',
    accent: 'from-pink-400 via-fuchsia-500 to-amber-400',
    image: '/images/glitter_category.JPG',
    priceChart: '/images/whiteglitter.png',
    gallery: [
      '/images/glitter/IMG_0596.jpeg',
      '/images/glitter/IMG_0597.jpeg',
      '/images/glitter/IMG_0603.jpg',
      '/images/glitter/IMG_0604.jpg',
      '/images/glitter/IMG_0960.JPG',
      '/images/glitter/IMG_1930.jpeg',
      '/images/glitter/IMG_1932.jpeg',
      '/images/glitter/IMG_8091.jpeg',
      '/images/glitter/IMG_8097.PNG',
    ],
    startingAt: '10€',
    priceList: [
      { name: 'Small glitter tattoo',  description: 'Single motif',                price: '10€' },
      { name: 'Medium glitter design', description: 'Forearm or shoulder',         price: '15€' },
      { name: 'Large glitter piece',   description: 'Full hand or back',           price: '20€' },
      { name: 'Glitter bridal',        description: 'Extended festival design',    price: '30€' },
      { name: 'Premium glitter set',   description: 'Full design with accents',    price: '35€' },
    ],
  },
  {
    slug: 'colorful-henna',
    title: 'Colorful Henna',
    tagline: 'Neon & colour — every shade you can imagine',
    description:
      'Non-natural, body-safe coloured paste in every shade. Playful, bold, and perfect for festivals, events and kids.',
    longDescription:
      'Coloured henna uses cosmetic body paint in a henna-style paste: reds, blues, greens, golds, neons and pastels. Fun, vivid, and completely temporary — washes off within a few days. Also available as UV neon henna for parties and events.',
    accent: 'from-rose-400 via-violet-500 to-cyan-400',
    image: '/images/neon_category.jpg',
    gallery: [
      '/images/colorful/8B465C99-5C98-437D-B9D3-BA2DDAD2AFE8.JPG',
      '/images/colorful/96394DFF-6C88-41A1-81DC-A8115472A9BE.JPG',
      '/images/colorful/IMG_1274.jpeg',
      '/images/colorful/IMG_2982.jpg',
      '/images/colorful/IMG_2983.jpg',
      '/images/colorful/IMG_2987.jpg',
      '/images/colorful/IMG_2992.jpg',
      '/images/colorful/IMG_5573.jpeg',
      '/images/colorful/IMG_8214.jpeg',
      '/images/colorful/IMG_9997.JPG',
    ],
    startingAt: '15€',
    priceList: [
      { name: 'Small colour design',  description: 'Finger, wrist or cheek',       price: '15€' },
      { name: 'Medium colour design', description: 'Forearm or back of hand',      price: '25€' },
      { name: 'Large / multi-colour', description: 'Full hand, back or sleeve',    price: '35€' },
      { name: 'Kids party package',   description: 'Per child — group bookings',   price: 'from 10€' },
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
