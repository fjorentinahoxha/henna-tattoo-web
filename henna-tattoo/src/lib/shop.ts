import type { Lang, Bilingual } from './i18n';
import { pick } from './i18n';

export type LocalizedProduct = {
  slug: string;
  title: Bilingual;
  description: Bilingual;
  /** Display price like '15€'. Used in UI and WhatsApp message. */
  price: string;
  /** What "1" of this product is — "per cone", "pack of 6", etc. */
  unit: Bilingual;
  /** Path under /public, no leading optimization. */
  image: string;
  imageAlt: Bilingual;
  width: number;
  height: number;
};

export type Product = {
  slug: string;
  title: string;
  description: string;
  price: string;
  unit: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
};

export const localizedProducts: LocalizedProduct[] = [
  {
    slug: 'brown-cone',
    title: { en: 'Brown henna cone', sq: 'Kon këna kafe' },
    description: {
      en: 'Freshly mixed organic brown henna paste in a hand-rolled cone (20–30 g per cone). Skin-safe, leaves a rich reddish-brown stain.',
      sq: 'Pastë organike e kënasë kafe, e përgatitur e freskët në kon të punuar me dorë (20–30 g për kon). E sigurt për lëkurën, lë një ngjyrë të pasur kuqërremë.',
    },
    price: '15€',
    unit: { en: 'per cone', sq: 'për kon' },
    image: '/images/shop/brown-cone.png',
    imageAlt: { en: 'Three brown henna cones with Henna Tattoo Albania label', sq: 'Tre konë me këna kafe me etiketën Henna Tattoo Albania' },
    width: 1410,
    height: 2250,
  },
  {
    slug: 'jagua-cone',
    title: { en: 'Jagua henna cone', sq: 'Kon këna jagua' },
    description: {
      en: 'Natural black-to-dark-blue jagua paste in a hand-rolled cone (20–30 g per cone). Long-lasting (7–21 days), perfect for a tattoo-like look.',
      sq: 'Pastë natyrale jagua, ngjyra e zezë në blu të errët, në kon të punuar me dorë (20–30 g për kon). Zgjat 7–21 ditë, e përsosur për një pamje si tatuazh.',
    },
    price: '30€',
    unit: { en: 'per cone', sq: 'për kon' },
    image: '/images/shop/jagua-cone.png',
    imageAlt: { en: 'Three jagua henna cones with Henna Tattoo Albania label', sq: 'Tre konë me këna jagua me etiketën Henna Tattoo Albania' },
    width: 1410,
    height: 2250,
  },
  {
    slug: 'white-cone',
    title: { en: 'White henna cone', sq: 'Kon këna e bardhë' },
    description: {
      en: 'Body-safe white henna paste in a hand-rolled cone (20–30 g per cone). Sits raised on the skin like lace — perfect for brides and photoshoots.',
      sq: 'Pastë e bardhë e kënasë, e sigurt për trupin, në kon të punuar me dorë (20–30 g për kon). Rri e ngritur mbi lëkurë si dantellë — e përsosur për nuse dhe fotosesione.',
    },
    price: '30€',
    unit: { en: 'per cone', sq: 'për kon' },
    image: '/images/shop/white-cone.png',
    imageAlt: { en: 'Three white henna cones with Henna Tattoo Albania label', sq: 'Tre konë me këna të bardhë me etiketën Henna Tattoo Albania' },
    width: 1410,
    height: 2250,
  },
  {
    slug: 'stencils',
    title: { en: 'Henna stencils — pack of 6', sq: 'Stencila kënaje — set me 6 copë' },
    description: {
      en: 'Set of 6 reusable hand stencils for clean, professional-looking designs. Perfect for beginners or events.',
      sq: 'Set me 6 stencila duarsh të ripërdorshëm për dizajne të pastra e profesionale. Ideale për fillestarë ose evente.',
    },
    price: '5€',
    unit: { en: '6 pieces', sq: '6 copë' },
    image: '/images/shop/stencils.jpg',
    imageAlt: { en: 'Set of 6 black henna hand stencils with floral patterns', sq: 'Set me 6 stencila të zinj duarsh për këna me motive lulesh' },
    width: 1320,
    height: 1316,
  },
];

export function getProducts(lang: Lang): Product[] {
  return localizedProducts.map((p) => ({
    slug:        p.slug,
    title:       pick(p.title, lang),
    description: pick(p.description, lang),
    price:       p.price,
    unit:        pick(p.unit, lang),
    image:       p.image,
    imageAlt:    pick(p.imageAlt, lang),
    width:       p.width,
    height:      p.height,
  }));
}
