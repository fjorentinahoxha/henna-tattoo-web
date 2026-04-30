export type Lang = 'sq' | 'en';

export const LANGS: Lang[] = ['sq', 'en'];
export const DEFAULT_LANG: Lang = 'sq';
export const PREFIX: Record<Lang, string> = { sq: '', en: '/en' };

export type Bilingual<T = string> = { sq: T; en: T };

export function pick<T>(value: Bilingual<T>, lang: Lang): T {
  return value[lang];
}

export function getLangFromPath(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'sq';
}

export function getLang(astro: { url: URL }): Lang {
  return getLangFromPath(astro.url.pathname);
}

export function localizePath(path: string, lang: Lang): string {
  const stripped = path.startsWith('/en/')
    ? path.slice(3)
    : path === '/en'
      ? '/'
      : path;
  if (lang === 'sq') return stripped;
  if (stripped === '/') return '/en/';
  return `/en${stripped}`;
}

export function altLangPath(pathname: string): string {
  const lang = getLangFromPath(pathname);
  return localizePath(pathname, lang === 'en' ? 'sq' : 'en');
}

const dict = {
  nav: {
    categories:  { en: 'Categories', sq: 'Kategoritë' },
    gallery:     { en: 'Gallery',    sq: 'Galeria' },
    events:      { en: 'Events',     sq: 'Eventet' },
    about:       { en: 'About',      sq: 'Rreth' },
    hours:       { en: 'Hours',      sq: 'Oraret' },
    contact:     { en: 'Contact',    sq: 'Kontakti' },
    bookNow:     { en: 'Book now',   sq: 'Rezervo' },
    main:        { en: 'Main',       sq: 'Kryesore' },
    toggleMenu:  { en: 'Toggle menu', sq: 'Hap/mbyll menynë' },
    switchTo:    { en: 'Shqip',      sq: 'English' },
  },
  hero: {
    headlineLine1: { en: 'Henna tattoos,', sq: 'Tatuazhe me kana,' },
    headlineLine2: { en: 'made for you.',  sq: 'të bëra për ty.' },
    intro: {
      en: 'Jagua, brown, white, glitter and colourful henna — all designed and drawn by hand in {place}. Perfect for weddings, festivals, events and everything in between.',
      sq: 'Kana jagua, kafe, e bardhë, me xixëllima dhe me ngjyra — të gjitha të dizajnuara dhe vizatuara me dorë në {place}. Të përsosura për dasma, festivale, evente dhe gjithçka mes tyre.',
    },
    bookSession:   { en: 'Book a session', sq: 'Rezervo një seancë' },
    exploreStyles: { en: 'Explore styles', sq: 'Eksploro stilet' },
    statStyles:    { en: 'Henna styles',     sq: 'Stile kanaje' },
    statSafe:      { en: 'Skin-safe paste',  sq: 'Pastë e sigurt për lëkurën' },
    statCustom:    { en: 'Custom designs',   sq: 'Dizajne me porosi' },
    tileBrown:     { en: 'Brown henna',       sq: 'Kana kafe' },
    tileJagua:     { en: 'Jagua',             sq: 'Jagua' },
    tileWhite:     { en: 'White lace',        sq: 'Dantellë e bardhë' },
    tileColor:     { en: 'Glitter & colour',  sq: 'Xixëllima & ngjyra' },
    tileBrownAlt:  { en: 'Brown henna design',     sq: 'Dizajn me kana kafe' },
    tileJaguaAlt:  { en: 'Jagua henna design',     sq: 'Dizajn me kana jagua' },
    tileWhiteAlt:  { en: 'White henna design',     sq: 'Dizajn me kana të bardhë' },
    tileColorAlt:  { en: 'Colourful henna design', sq: 'Dizajn me kana me ngjyra' },
  },
  home: {
    stylesEyebrow: { en: 'Styles', sq: 'Stilet' },
    stylesTitle:   { en: 'Five ways to wear your story', sq: 'Pesë mënyra për të treguar historinë tënde' },
    stylesIntro: {
      en: 'From traditional bridal mehndi to festival-ready glitter and colour, every category is a different mood. Tap one to see full pricing and designs.',
      sq: 'Nga mehndi tradicional për nuse, te xixëllimat dhe ngjyrat e gatshme për festival, çdo kategori ka shpirtin e vet. Trokit njërën për të parë çmimet dhe dizajnet e plota.',
    },
    galleryEyebrow: { en: 'Featured work', sq: 'Punimet e zgjedhura' },
    galleryTitle:   { en: 'A glimpse at the portfolio', sq: 'Një vështrim në portofol' },
    galleryCta:     { en: 'Request a design', sq: 'Kërko një dizajn' },
    eventsEyebrow:  { en: 'Events & fairs', sq: 'Evente & panaire' },
    eventsTitle:    { en: 'On stage, at the fair, at your party', sq: 'Në skenë, në panair, në festën tënde' },
    eventsIntro: {
      en: 'From birthday tables to national celebrations and major expos — a look at recent events where {name} has been featured.',
      sq: 'Nga tavolinat e ditëlindjeve te festat kombëtare dhe ekspozitat e mëdha — një vështrim te eventet e fundit ku ka qenë pjesë {name}.',
    },
    eventsCtaPrefix: { en: 'Planning an event?', sq: 'Po planifikon një event?' },
    eventsCtaLink: {
      en: 'Book a henna station for your next fair or party →',
      sq: 'Rezervo një stacion kanaje për panairin ose festën tënde të radhës →',
    },
    eventsWatch: { en: 'Watch on Instagram', sq: 'Shiko në Instagram' },
    aboutEyebrow: { en: 'About the studio', sq: 'Rreth studios' },
    aboutTitle:   { en: 'A modern take on an ancient art', sq: 'Një qasje moderne ndaj një arti të lashtë' },
    aboutP1: {
      en: '{site} is the work of {artist} — a certified henna artist based in {place}. Every design is drawn freehand, tailored to your body and the occasion, using natural, skin-safe paste.',
      sq: '{site} është puna e {artist} — artiste e certifikuar e kanasë, me bazë në {place}. Çdo dizajn vizatohet me dorë të lirë, i përshtatur trupit tënd dhe rastit, me pastë natyrale të sigurt për lëkurën.',
    },
    aboutP2: {
      en: "From quiet wrist motifs to full bridal sets, festival glitter to neon event henna — you'll leave with artwork that feels like yours.",
      sq: 'Nga motive të vogla në kyçin e dorës te paketa të plota nuseje, nga xixëllimat e festivaleve te kana neon për evente — do të largohesh me një art që ndihet vërtet i yti.',
    },
    aboutCta1: { en: 'Book a session', sq: 'Rezervo një seancë' },
    aboutCta2: { en: 'See gallery',    sq: 'Shiko galerinë' },
    aboutCertAlt: {
      en: 'Certification of {artist} as a professional henna artist',
      sq: 'Çertifikata e {artist} si artiste profesioniste e kanasë',
    },
    aboutCertCaption: {
      en: 'Certified henna artist — Dubai Henna Master Course 2025.',
      sq: 'Artiste e certifikuar e kanasë — Dubai Henna Master Course 2025.',
    },
    hoursEyebrow: { en: 'Studio hours', sq: 'Oraret e studios' },
    hoursTitle:   { en: 'When you can find me', sq: 'Kur mund të më gjesh' },
    hoursIntroPrefix: {
      en: 'The studio is',
      sq: 'Studio funksionon',
    },
    hoursStrong: { en: 'by appointment only', sq: 'vetëm me rezervim' },
    hoursIntroSuffix: {
      en: '— it is not open for walk-ins. Please book before coming so your session is confirmed and ready for you.',
      sq: '— nuk është e hapur për kalimtarë. Të lutem rezervo para se të vish, që seanca jote të jetë e konfirmuar dhe gati për ty.',
    },
    hoursFooter: {
      en: 'Book via the contact form or WhatsApp to reserve your time',
      sq: 'Rezervo orarin tënd përmes formularit ose WhatsApp',
    },
    days: {
      mon: { en: 'Monday',    sq: 'E hënë' },
      tue: { en: 'Tuesday',   sq: 'E martë' },
      wed: { en: 'Wednesday', sq: 'E mërkurë' },
      thu: { en: 'Thursday',  sq: 'E enjte' },
      fri: { en: 'Friday',    sq: 'E premte' },
      satSun: { en: 'Sat & Sun', sq: 'Sht. & Diel' },
    },
    twentyFourHours: { en: '24 hours', sq: '24 orë' },
    ctaTitle: { en: 'Ready for your design?', sq: 'Gati për dizajnin tënd?' },
    ctaIntro: {
      en: "Tell me the occasion, the style and how much space you want covered. I'll come back with a sketch and a quote.",
      sq: 'Më trego rastin, stilin dhe sa hapësirë dëshiron të mbulosh. Do të kthehem me një skicë dhe një ofertë.',
    },
    ctaButton: { en: 'Start a booking', sq: 'Fillo rezervimin' },
  },
  category: {
    backLink: { en: 'All categories', sq: 'Të gjitha kategoritë' },
    aboutEyebrow: { en: 'About this style', sq: 'Rreth këtij stili' },
    galleryEyebrow: { en: 'Gallery', sq: 'Galeria' },
    designsHeading: { en: 'Designs', sq: 'Dizajne' },
    pricingEyebrow: { en: 'Pricing', sq: 'Çmimet' },
    pricingFromPrefix: { en: 'From', sq: 'Nga' },
    pricingNote: {
      en: 'Final price depends on size, detail and placement. Custom quotes on request.',
      sq: 'Çmimi final varet nga madhësia, detajet dhe vendndodhja. Oferta me porosi sipas kërkesës.',
    },
    bookCtaPrefix: { en: 'Book', sq: 'Rezervo' },
    occasionsHeading: { en: 'Perfect for', sq: 'E përsosur për' },
    otherTitle: { en: 'Other styles you might love', sq: 'Stile të tjera që mund të të pëlqejnë' },
    viewAll: { en: 'View all →', sq: 'Shikoji të gjitha →' },
    fromPrefix: { en: 'From', sq: 'Nga' },
    inTirana: { en: 'in Tirana', sq: 'në Tiranë' },
    breadcrumbHome: { en: 'Home', sq: 'Kryefaqja' },
    breadcrumbCategories: { en: 'Categories', sq: 'Kategoritë' },
    faqHeading: { en: 'Frequently asked questions', sq: 'Pyetjet më të shpeshta' },
  },
  card: {
    fromPrefix: { en: 'From', sq: 'Nga' },
    viewLink:   { en: 'View designs & pricing', sq: 'Shiko dizajnet & çmimet' },
  },
  priceChart: {
    label:   { en: 'Size & price guide', sq: 'Udhëzues madhësish & çmimesh' },
    badge:   { en: 'Visual', sq: 'Vizuale' },
    altSuffix: { en: '— size and price guide', sq: '— udhëzues madhësish dhe çmimesh' },
    caption: {
      en: 'Approximate size-to-price scale. Final quote depends on detail, placement and time.',
      sq: 'Shkallë e përafërt madhësi-çmim. Oferta përfundimtare varet nga detajet, vendndodhja dhe koha.',
    },
  },
  gallery: {
    soonTitle: { en: 'Gallery coming soon', sq: 'Galeria së shpejti' },
    altSuffix: { en: 'design', sq: 'dizajn' },
  },
  contact: {
    metaTitlePrefix: { en: 'Book a session', sq: 'Rezervo një seancë' },
    metaDescription: {
      en: 'Request a henna tattoo booking in Tirana, Albania: weddings, festivals, parties and custom designs.',
      sq: 'Kërko një rezervim për tatuazh me kana në Tiranë, Shqipëri: dasma, festivale, festa dhe dizajne me porosi.',
    },
    eyebrow: { en: 'Get in touch', sq: 'Na kontakto' },
    title:   { en: "Let's design something together.", sq: 'Le të dizajnojmë diçka së bashku.' },
    intro: {
      en: "Tell me about the occasion, the style you're drawn to and when you'd like to book. I'll reply within 48 hours with a sketch direction and a quote.",
      sq: 'Më trego për rastin, stilin që të tërheq dhe se kur dëshiron të rezervosh. Do të të përgjigjem brenda 48 orëve me një drejtim skicimi dhe një ofertë.',
    },
    fieldEmail: { en: 'Email', sq: 'Email' },
    fieldPhone: { en: 'Phone', sq: 'Telefon' },
    fieldInsta: { en: 'Instagram', sq: 'Instagram' },
    fieldTiktok: { en: 'TikTok', sq: 'TikTok' },
    fieldStudio: { en: 'Studio', sq: 'Studio' },
    workingHours: { en: 'Working hours', sq: 'Oraret e punës' },
    monFri: { en: 'Mon – Fri', sq: 'E hënë – E premte' },
    satSun: { en: 'Sat & Sun', sq: 'Sht. & Diel' },
    twentyFour: { en: '24 hours', sq: '24 orë' },
    apptOnly: {
      en: '✦ By appointment only — the studio does not accept walk-ins. Please book before coming.',
      sq: '✦ Vetëm me rezervim — studio nuk pranon kalimtarë. Të lutem rezervo para se të vish.',
    },
    mapTitle: { en: 'Studio location on Google Maps', sq: 'Vendndodhja e studios në Google Maps' },
    name: { en: 'Name', sq: 'Emri' },
    style: { en: "Style you're interested in", sq: 'Stili që të intereson' },
    chooseCategory: { en: 'Choose a category…', sq: 'Zgjidh një kategori…' },
    notSure: { en: 'Not sure yet', sq: 'Ende nuk jam i sigurt' },
    eventDate: { en: 'Event date', sq: 'Data e eventit' },
    placement: { en: 'Placement', sq: 'Vendi i aplikimit' },
    placementPlaceholder: { en: 'e.g. forearm, full hand', sq: 'p.sh. parakrah, dora e plotë' },
    tellMe: { en: 'Tell me about your design', sq: 'Më trego për dizajnin tënd' },
    messagePlaceholder: { en: 'Occasion, size, inspiration, references…', sq: 'Rasti, madhësia, frymëzimi, referencat…' },
    sendBtn: { en: 'Send via WhatsApp', sq: 'Dërgo përmes WhatsApp' },
    sendNotePrefix: {
      en: 'Submitting opens WhatsApp with your details pre-filled — just press send. Prefer email? Write directly to',
      sq: 'Klikimi hap WhatsApp me të dhënat e tua të mbushura paraprakisht — vetëm shtyp dërgo. Preferon email? Shkruaj drejtpërdrejt te',
    },
    notSureFitPrefix: { en: 'Not sure which style fits?', sq: 'Nuk je i sigurt cili stil të përshtatet?' },
    browseAll: { en: 'Browse all categories →', sq: 'Shfleto të gjitha kategoritë →' },
    waHeader: { en: '🌿 *New Booking Request*', sq: '🌿 *Kërkesë e re rezervimi*' },
    waName: { en: 'Name', sq: 'Emri' },
    waEmail: { en: 'Email', sq: 'Email' },
    waStyle: { en: 'Style', sq: 'Stili' },
    waDate: { en: 'Date', sq: 'Data' },
    waPlacement: { en: 'Placement', sq: 'Vendi' },
    waMessage: { en: 'Message', sq: 'Mesazhi' },
  },
  notFound: {
    metaTitle: { en: 'Page not found', sq: 'Faqja nuk u gjet' },
    metaDescription: {
      en: "The page you're looking for doesn't exist.",
      sq: 'Faqja që po kërkon nuk ekziston.',
    },
    title: { en: 'This design got washed off.', sq: 'Ky dizajn u lye fare.' },
    intro: {
      en: "The page you're looking for doesn't exist or has moved. Let's get you back to something beautiful.",
      sq: 'Faqja që po kërkon nuk ekziston ose është zhvendosur. Le të të kthejmë te diçka e bukur.',
    },
    home: { en: 'Back to home', sq: 'Kthehu te faqja kryesore' },
    browse: { en: 'Browse categories', sq: 'Shfleto kategoritë' },
  },
  footer: {
    blurb: {
      en: 'Handcrafted henna tattoos for weddings, festivals, events and everyday magic. Based in {place}.',
      sq: 'Tatuazhe me kana të punuara me dorë për dasma, festivale, evente dhe magjinë e çdo dite. Me bazë në {place}.',
    },
    explore:    { en: 'Explore',     sq: 'Eksploro' },
    categories: { en: 'Categories',  sq: 'Kategoritë' },
    about:      { en: 'About',       sq: 'Rreth' },
    gallery:    { en: 'Gallery',     sq: 'Galeria' },
    bookSession:{ en: 'Book a session', sq: 'Rezervo një seancë' },
    getInTouch: { en: 'Get in touch', sq: 'Na kontakto' },
    rights:     { en: 'All rights reserved.', sq: 'Të gjitha të drejtat e rezervuara.' },
    artist:     { en: 'Artist:',      sq: 'Artistja:' },
  },
} as const;

export type Dict = typeof dict;

export { dict };

export function fmt(
  template: string,
  vars: Record<string, string>
): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? '');
}
