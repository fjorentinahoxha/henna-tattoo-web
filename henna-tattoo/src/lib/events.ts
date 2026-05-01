import type { Lang, Bilingual } from './i18n';

export type LocalizedEventReel = {
  title: Bilingual;
  description?: Bilingual;
  url: string;
};

export type EventReel = {
  title: string;
  description?: string;
  url: string;
};

export const localizedEvents: LocalizedEventReel[] = [
  {
    title: { en: 'Birthday parties', sq: 'Festa ditëlindjesh' },
    description: {
      en: 'Henna tables for kids & adult birthday celebrations.',
      sq: 'Tavolina me këna për festat e ditëlindjeve të fëmijëve dhe të rriturve.',
    },
    url: 'https://www.instagram.com/reel/Chp6GuGsYfj/',
  },
  {
    title: {
      en: 'Fair — "Lumturo Dhimbjen"',
      sq: 'Panairi — "Lumturo Dhimbjen"',
    },
    description: {
      en: 'Live henna at the charity fair supporting cancer patients.',
      sq: 'Këna drejtpërdrejt në panairin bamirës në mbështetje të pacientëve me kancer.',
    },
    url: 'https://www.instagram.com/reel/DGC_rrMNWKV/',
  },
  {
    title: { en: 'Bridal Henna Events', sq: 'Evente kënaje për nuse' },
    description: {
      en: 'Celebrating important days with henna love.',
      sq: 'Festojmë ditë të rëndësishme me dashurinë e kënasë.',
    },
    url: 'https://www.instagram.com/reel/DNonvG2M7RE/',
  },
  {
    title: { en: 'Namazgah Mosque Fair', sq: 'Panairi i Xhamisë Namazgah' },
    description: {
      en: 'Traditional henna at the Namazgah community fair.',
      sq: 'Këna tradicionale në panairin e komunitetit të Namazgahut.',
    },
    url: 'https://www.instagram.com/reel/DPKQWiBDD6O/',
  },
  {
    title: {
      en: 'Saudi Arabia National Day',
      sq: 'Dita Kombëtare e Arabisë Saudite',
    },
    description: {
      en: 'Celebrating Saudi Arabia National Day with traditional designs.',
      sq: 'Festojmë Ditën Kombëtare të Arabisë Saudite me dizajne tradicionale.',
    },
    url: 'https://www.instagram.com/reel/CxoUNjlNNY_/',
  },
  {
    title: { en: 'Behind the scenes', sq: 'Pas perdes' },
    description: {
      en: 'A beautiful moment from the studio.',
      sq: 'Një moment i bukur nga studio.',
    },
    url: 'https://www.instagram.com/reel/DJnRATcINMz/',
  },
];

export function getEvents(lang: Lang): EventReel[] {
  return localizedEvents.map((e) => ({
    title: e.title[lang],
    description: e.description?.[lang],
    url: e.url,
  }));
}

export const events: EventReel[] = getEvents('en');
