import type { Lang, Bilingual } from './i18n';

export type LocalizedPriceItem = {
  name: Bilingual;
  description?: Bilingual;
  price: string;
};

export type PriceItem = {
  name: string;
  description?: string;
  price: string;
};

export type LocalizedFaq = { q: Bilingual; a: Bilingual };
export type Faq = { q: string; a: string };

export type LocalizedCategory = {
  slug: string;
  accent: string;
  image?: string;
  heroImage?: string;
  priceChart?: string;
  gallery: string[];
  startingAt: string;
  title: Bilingual;
  tagline: Bilingual;
  description: Bilingual;
  longDescription: Bilingual;
  metaTitle?: Bilingual;
  metaDescription?: Bilingual;
  h1?: Bilingual;
  intro?: Bilingual;
  occasions?: Bilingual<string[]>;
  faqs?: LocalizedFaq[];
  priceList: LocalizedPriceItem[];
  alternativeNames?: string[];
};

export type Category = {
  slug: string;
  accent: string;
  image?: string;
  heroImage?: string;
  priceChart?: string;
  gallery: string[];
  startingAt: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  metaTitle?: string;
  metaDescription?: string;
  h1?: string;
  intro?: string;
  occasions?: string[];
  faqs?: Faq[];
  priceList: PriceItem[];
  alternativeNames?: string[];
};

export const localizedCategories: LocalizedCategory[] = [
  {
    slug: 'jagua-henna',
    accent: 'from-slate-800 to-slate-950',
    image: '/images/jagua_category.jpg',
    priceChart: '/images/jagua.png',
    startingAt: '15€',
    alternativeNames: [
      'jagua tattoo', 'blue henna', 'black henna', 'temporary tattoo Tirana',
      'tatuazh me jagua', 'këna e zezë', 'jagua Tiranë',
    ],
    title: { en: 'Jagua Henna', sq: 'këna Jagua' },
    tagline: {
      en: 'Black to dark blue — lasts 7 to 21 days',
      sq: 'E zezë në blu të errët — zgjat 7 deri në 21 ditë',
    },
    description: {
      en: 'A natural alternative to traditional henna, made from the jagua fruit. Leaves a bold black to dark-blue stain that resembles a real tattoo.',
      sq: 'Një alternativë natyrale ndaj kënasë tradicionale, e bërë nga fruti i jagua-s. Lë një ngjyrë të zezë në blu të errët që duket si tatuazh i vërtetë.',
    },
    longDescription: {
      en: 'Jagua is extracted from the Genipa americana fruit and produces the darkest natural skin stain available. Colour deepens over 48 hours to a rich black-blue and lasts 7 to 21 days. Perfect for anyone who loves the look of a black-ink tattoo without the permanence.',
      sq: 'Jagua nxirret nga fruti Genipa americana dhe prodhon ngjyrën natyrale më të errët mbi lëkurë. Ngjyra thellohet brenda 48 orëve në një blu-zi të pasur dhe zgjat 7 deri në 21 ditë. E përsosur për këdo që dëshiron pamjen e një tatuazhi me bojë të zezë, pa qenë i përhershëm.',
    },
    metaTitle: {
      en: 'Jagua Henna Tattoo in Tirana | Black-Blue Temporary Tattoo',
      sq: 'Tatuazh me këna Jagua në Tiranë | Tatuazh i Përkohshëm Blu-Zi',
    },
    metaDescription: {
      en: 'Jagua henna tattoos in Tirana — bold black to blue temporary tattoos that last 7–21 days. Custom designs by certified artist Fjorentina Hoxha. From 15€.',
      sq: 'Tatuazhe me këna jagua në Tiranë — të zeza në blu, të përkohshme, që zgjasin 7–21 ditë. Dizajne me porosi nga artistja e certifikuar Fjorentina Hoxha. Nga 15€.',
    },
    h1: {
      en: 'Jagua Henna Tattoos in Tirana — Black-Blue Designs That Look Real',
      sq: 'Tatuazhe me këna Jagua në Tiranë — Dizajne Blu-Zi Që Duken të Vërteta',
    },
    intro: {
      en: 'Jagua henna is the closest thing to a real black-ink tattoo without the needle, the pain, or the permanence. Pressed from the green Genipa americana fruit and turned into a smooth gel, jagua stains the skin a deep black-blue that develops over 48 hours and lasts 1–3 weeks. It is loved in Tirana for engagement parties, hen-dos, festivals and beach holidays — anywhere a real tattoo would feel like too much commitment. Every piece is hand-drawn freehand by Fjorentina Hoxha, certified Henna Master, in the Garden City studio.',
      sq: 'këna jagua është gjëja më e afërt me një tatuazh të vërtetë me bojë të zezë — pa gjilpërë, pa dhimbje, pa qenë i përhershëm. E nxjerrë nga fruti i gjelbër Genipa americana dhe e kthyer në një xhel të butë, jagua e ngjyros lëkurën në një blu-zi të thellë që zhvillohet brenda 48 orëve dhe zgjat 1–3 javë. Në Tiranë ajo pëlqehet për festat e fejesës, mbrëmjet e beqarisë, festivalet dhe pushimet në plazh — kudo ku një tatuazh i vërtetë do ishte angazhim shumë i madh. Çdo dizajn vizatohet me dorë të lirë nga Fjorentina Hoxha, mjeshtre e certifikuar e kënasë, në studion e Garden City.',
    },
    occasions: {
      en: ['Engagement parties', 'Festivals', 'Beach holidays', 'Photoshoots', 'Birthdays'],
      sq: ['Festa fejese', 'Festivale', 'Pushime në plazh', 'Fotosesione', 'Ditëlindje'],
    },
    faqs: [
      {
        q: { en: 'How long does jagua henna last?', sq: 'Sa zgjat këna jagua?' },
        a: {
          en: 'Jagua develops over the first 48 hours and lasts between 7 and 21 days, depending on skin type and aftercare. Hands and feet hold the colour longest; faster-shedding areas like the inner forearm fade sooner.',
          sq: 'Jagua zhvillohet gjatë 48 orëve të para dhe zgjat 7 deri në 21 ditë, varësisht nga tipi i lëkurës dhe kujdesi pas aplikimit. Duart dhe këmbët e mbajnë ngjyrën më gjatë; zonat që ndërrojnë qelizat më shpejt, si pjesa e brendshme e parakrahut, zbehen më shpejt.',
        },
      },
      {
        q: { en: 'Is jagua safe for sensitive skin?', sq: 'A është jagua e sigurt për lëkurën e ndjeshme?' },
        a: {
          en: 'Yes — true jagua is 100% natural fruit gel and skin-safe. We never use synthetic black "henna" (which contains PPD and can cause severe reactions). For very sensitive skin we recommend a small patch test 24 hours before the appointment.',
          sq: 'Po — jagua e vërtetë është 100% xhel natyral fruti dhe e sigurt për lëkurën. Nuk përdorim kurrë "këna të zezë" sintetike (që përmban PPD dhe mund të shkaktojë reaksione të rënda). Për lëkurë shumë të ndjeshme rekomandojmë një test të vogël 24 orë para takimit.',
        },
      },
      {
        q: { en: 'Can I get jagua henna for my wedding in Tirana?', sq: 'A mund të bëj këna jagua për dasmën time në Tiranë?' },
        a: {
          en: 'Absolutely. Jagua bridal designs are increasingly popular in Albanian weddings as a modern alternative to brown bridal mehndi. We recommend booking 48–72 hours before the event so the colour reaches its peak depth on the wedding day.',
          sq: 'Patjetër. Dizajnet jagua për nuse po bëhen gjithnjë e më të kërkuara në dasmat shqiptare si alternativë moderne ndaj kënasë kafe tradicionale. Rekomandojmë rezervimin 48–72 orë para eventit, që ngjyra të arrijë thellësinë maksimale ditën e dasmës.',
        },
      },
      {
        q: { en: 'How much does a jagua tattoo cost?', sq: 'Sa kushton një tatuazh me jagua?' },
        a: {
          en: 'Small designs start at 15€, medium pieces 25€, large or sleeve work 40–45€. Final price depends on size, detail and placement. Contact us for a custom quote.',
          sq: 'Dizajnet e vogla fillojnë nga 15€, ato të mesme 25€, të mëdha ose punime mëngë 40–45€. Çmimi final varet nga madhësia, detajet dhe vendndodhja. Na kontaktoni për një ofertë me porosi.',
        },
      },
      {
        q: { en: 'Will it look like a real tattoo in photos?', sq: 'A do të duket si tatuazh i vërtetë në fotografi?' },
        a: {
          en: 'Yes — jagua produces a deep black-blue stain that photographs identically to fresh tattoo ink. Many clients use it for photoshoots, content creation and bridal trials before committing to a permanent tattoo.',
          sq: 'Po — jagua prodhon një ngjyrë blu-zi të thellë që në fotografi duket njësoj si bojë e freskët tatuazhi. Shumë klientë e përdorin për fotosesione, krijim përmbajtjeje dhe prova nuseje para se të vendosin për një tatuazh të përhershëm.',
        },
      },
    ],
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
    priceList: [
      { name: { en: 'Small design',  sq: 'Dizajn i vogël' },     description: { en: 'Finger, wrist or ankle piece',           sq: 'Punim në gisht, kyç ose nyje këmbe' },        price: '15€' },
      { name: { en: 'Small-medium',  sq: 'I vogël-mesatar' },    description: { en: 'Wrist with extension or small forearm',  sq: 'Kyçi me zgjatim ose parakrah i vogël' },      price: '20€' },
      { name: { en: 'Medium design', sq: 'Dizajn mesatar' },     description: { en: 'Forearm or back of hand',                sq: 'Parakrah ose pjesa e pasme e dorës' },        price: '25€' },
      { name: { en: 'Large design',  sq: 'Dizajn i madh' },      description: { en: 'Full hand or calf',                      sq: 'Dora e plotë ose pulpa e këmbës' },           price: '40€' },
      { name: { en: 'Extra-large',   sq: 'Tepër i madh' },       description: { en: 'Sleeve or bespoke piece',                sq: 'Mëngë e plotë ose punim me porosi' },         price: '45€' },
    ],
  },
  {
    slug: 'brown-henna',
    accent: 'from-henna-400 to-henna-700',
    image: '/images/naturalhenna_category.jpg',
    priceChart: '/images/natural.png',
    startingAt: '10€',
    alternativeNames: [
      'natural henna', 'mehndi', 'bridal henna Tirana', 'wedding henna Albania',
      'këna natyrale', 'këna për nuse', 'këna për dasmë', 'mehndi Tiranë',
    ],
    title: { en: 'Brown Henna', sq: 'këna Kafe' },
    tagline: {
      en: 'Organic reddish-brown — lasts 7 to 14 days',
      sq: 'Kuqërremë organike — zgjat 7 deri në 14 ditë',
    },
    description: {
      en: 'Traditional organic henna paste. Safe, skin-friendly, and the classic choice for bridal and festival designs.',
      sq: 'Pasta tradicionale organike e kënasë. E sigurt, miqësore me lëkurën dhe zgjedhja klasike për dizajne nuseje dhe festivalesh.',
    },
    longDescription: {
      en: 'Made from pure Lawsonia inermis, brown henna develops from orange to a deep reddish-brown over 24 to 48 hours and lasts 7 to 14 days. The hallmark of bridal mehndi — intricate, detailed, and timeless.',
      sq: 'E bërë nga Lawsonia inermis e pastër, këna kafe zhvillohet nga portokallia në një kuqërremë të thellë gjatë 24–48 orëve dhe zgjat 7 deri në 14 ditë. Shenja dalluese e mehndi-t të nuses — e detajuar, e ndërlikuar dhe e përjetshme.',
    },
    metaTitle: {
      en: 'Bridal Henna in Tirana | Traditional Mehndi & Brown Henna',
      sq: 'këna për Nuse në Tiranë | Mehndi Tradicional & këna Kafe',
    },
    metaDescription: {
      en: 'Traditional brown henna and bridal mehndi in Tirana, Albania. 100% organic Lawsonia paste, intricate freehand designs for weddings, festivals and parties. From 10€.',
      sq: 'këna tradicionale kafe dhe mehndi për nuse në Tiranë, Shqipëri. Pastë 100% organike nga Lawsonia, dizajne të ndërlikuara me dorë të lirë për dasma, festivale dhe festa. Nga 10€.',
    },
    h1: {
      en: 'Brown Henna & Bridal Mehndi in Tirana',
      sq: 'këna Kafe & Mehndi për Nuse në Tiranë',
    },
    intro: {
      en: 'Brown henna — known in Albanian as "këna natyrale" — is the original henna art, made from finely sifted Lawsonia inermis leaves mixed with lemon, sugar and essential oils. The paste oxidises on warm skin into a rich reddish-brown stain that deepens for 48 hours and lasts 1–2 weeks. This is the henna of bridal traditions across Albania, North Africa, India and the Middle East: intricate paisley, mandalas, florals and protective motifs hand-drawn freehand. Whether you are planning a wedding, a "natë e kënasë" (henna night), a festival or a special celebration, traditional brown henna remains the warmest and most photogenic choice.',
      sq: 'këna kafe — e njohur në shqip si "këna natyrale" — është arti origjinal i kënasë, i bërë nga gjethet e holluara të Lawsonia inermis, të përziera me limon, sheqer dhe vajra esencialë. Pasta oksidohet mbi lëkurën e ngrohtë dhe lë një ngjyrë të pasur kuqërremë që thellohet për 48 orë dhe zgjat 1–2 javë. Kjo është kënaja e traditave të nuseve në Shqipëri, Afrikën e Veriut, Indi dhe Lindjen e Mesme: paisley të ndërlikuar, mandala, lule dhe motive mbrojtëse të vizatuara me dorë të lirë. Qoftë për një dasmë, për "natën e kënasë", për një festival apo një festë të veçantë, këna tradicionale kafe mbetet zgjedhja më e ngrohtë dhe më fotogjenike.',
    },
    occasions: {
      en: ['Weddings', 'Henna nights (natë e kënasë)', 'Engagements', 'Festivals', 'Bridal showers'],
      sq: ['Dasma', 'Nata e kënasë', 'Fejesa', 'Festivale', 'Festa para dasmës'],
    },
    faqs: [
      {
        q: { en: 'How long does brown henna last?', sq: 'Sa zgjat këna kafe?' },
        a: {
          en: 'A well-applied brown henna design lasts 7 to 14 days. Colour peaks 48 hours after the paste is removed and gradually fades as the stained skin cells exfoliate. Hands and feet hold colour longest.',
          sq: 'Një dizajn kënaje kafe i aplikuar mirë zgjat 7 deri në 14 ditë. Ngjyra arrin maksimumin 48 orë pas heqjes së pastës dhe zbehet gradualisht ndërsa qelizat e lëkurës eksfolizohen. Duart dhe këmbët e mbajnë ngjyrën më gjatë.',
        },
      },
      {
        q: { en: 'Is your henna paste 100% natural?', sq: 'A është 100% natyrale pasta juaj e kënasë?' },
        a: {
          en: 'Yes. We mix every batch fresh from pure Lawsonia inermis powder, lemon juice, sugar and essential oils — no chemicals, no PPD, no "black henna". Safe for pregnancy, sensitive skin and children over 6.',
          sq: 'Po. Çdo sasi e përgatisim të freskët nga pluhuri i pastër i Lawsonia inermis, lëngu i limonit, sheqeri dhe vajra esencialë — pa kimikate, pa PPD, pa "këna të zezë". E sigurt gjatë shtatzënisë, për lëkurë të ndjeshme dhe për fëmijë mbi 6 vjeç.',
        },
      },
      {
        q: { en: 'Can you do bridal henna in Tirana?', sq: 'A bëni këna për nuse në Tiranë?' },
        a: {
          en: 'Bridal mehndi (këna për nuse) is one of our specialties. Bridal sessions cover both hands plus forearms (35€) or full bridal hands and feet (40€). Book 1–2 weeks in advance for popular dates. Travel to your venue is available across Albania.',
          sq: 'Mehndi për nuse (këna për nuse) është një nga specialitetet tona. Seancat për nuse mbulojnë të dyja duart plus parakrahët (35€) ose paketën e plotë me duar dhe këmbë (40€). Rezervoni 1–2 javë para datave të kërkuara. Udhëtojmë te vendi i juaj në të gjithë Shqipërinë.',
        },
      },
      {
        q: { en: 'How long does the appointment take?', sq: 'Sa kohë zgjat takimi?' },
        a: {
          en: 'A small motif takes 15–20 minutes; a full bridal set with hands and feet takes 2–3 hours. We block enough time in the calendar to never rush the work.',
          sq: 'Një motiv i vogël zgjat 15–20 minuta; një paketë e plotë nuseje me duar dhe këmbë zgjat 2–3 orë. Lëmë gjithmonë kohë të mjaftueshme në kalendar që puna të mos nxitohet kurrë.',
        },
      },
      {
        q: { en: 'How do I make my henna stain darker?', sq: 'Si ta bëj ngjyrën e kënasë më të errët?' },
        a: {
          en: 'Leave the paste on as long as possible (4–6 hours minimum, overnight is best), keep skin warm, avoid water for 12 hours after removal, and apply a thin layer of natural oil before showering for the next few days.',
          sq: 'Mbajeni pastën sa më gjatë (minimumi 4–6 orë, gjithë natën më mirë), mbajeni lëkurën të ngrohtë, shmangni ujin për 12 orë pas heqjes dhe aplikoni një shtresë të hollë vaji natyral para çdo dushi në ditët e para.',
        },
      },
      {
        q: { en: 'Do you travel for weddings outside Tirana?', sq: 'A udhëtoni për dasma jashtë Tiranës?' },
        a: {
          en: 'Yes — we travel for bridal sessions to Durrës, Vlorë, Shkodër, Korçë and across Albania. Travel costs are added based on distance and discussed before booking.',
          sq: 'Po — udhëtojmë për seanca nuseje në Durrës, Vlorë, Shkodër, Korçë dhe në të gjithë Shqipërinë. Kostot e udhëtimit shtohen sipas distancës dhe diskutohen para rezervimit.',
        },
      },
    ],
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
    priceList: [
      { name: { en: 'Small design',   sq: 'Dizajn i vogël' },     description: { en: 'Single motif, wrist or ankle',     sq: 'Motiv i vetëm, kyç ose nyje këmbe' },          price: '10€' },
      { name: { en: 'Medium design',  sq: 'Dizajn mesatar' },     description: { en: 'Forearm or back of hand',          sq: 'Parakrah ose pjesa e pasme e dorës' },         price: '15€' },
      { name: { en: 'Large design',   sq: 'Dizajn i madh' },      description: { en: 'Full hand or calf',                sq: 'Dora e plotë ose pulpa e këmbës' },            price: '25€' },
      { name: { en: 'Bridal hands',   sq: 'Duart e nuses' },      description: { en: 'Hands + forearm, both sides',      sq: 'Duart + parakrahët, të dyja anët' },           price: '35€' },
      { name: { en: 'Bridal package', sq: 'Paketa e nuses' },     description: { en: 'Hands + feet, full bridal motif',  sq: 'Duart + këmbët, motiv i plotë nuseje' },       price: '40€' },
    ],
  },
  {
    slug: 'white-henna',
    accent: 'from-stone-100 to-stone-300',
    image: '/images/white_category.jpg',
    priceChart: '/images/whiteglitter.png',
    startingAt: '10€',
    alternativeNames: [
      'white mehndi', 'lace henna', 'bridal white henna', 'event henna Tirana',
      'këna e bardhë', 'këna e bardhë për nuse', 'tatuazh i bardhë',
    ],
    title: { en: 'White Henna', sq: 'këna e Bardhë' },
    tagline: {
      en: 'Elegant lace — bridal, photograph-ready',
      sq: 'Dantellë elegante — për nuse, gati për fotografi',
    },
    description: {
      en: 'A body-safe white adhesive paste that sits on the skin like lace. Stunning against bronzed skin and beloved for weddings.',
      sq: 'Pastë e bardhë ngjitëse, e sigurt për trupin, që rri mbi lëkurë si dantellë. Mahnitëse mbi lëkurën e bronxhuar dhe e adhuruar për dasma.',
    },
    longDescription: {
      en: 'White henna is not a stain — it is a raised, pearly design that lasts 1 to 3 days, making it ideal for weddings, photoshoots and events. Pairs beautifully with gemstones and glitter accents.',
      sq: 'këna e bardhë nuk është ngjyrë që depërton — është një dizajn i ngritur, perlëzar, që zgjat 1 deri në 3 ditë, ideal për dasma, fotosesione dhe evente. Shoqërohet bukur me gurë dhe theksa me xixëllima.',
    },
    metaTitle: {
      en: 'White Henna Tattoos in Tirana | Bridal & Event Designs',
      sq: 'Tatuazhe me këna të Bardhë në Tiranë | Dizajne për Nuse & Evente',
    },
    metaDescription: {
      en: 'White henna in Tirana — pearly lace-like body art for brides, photoshoots and events. Hand-drawn freehand by certified artist Fjorentina Hoxha. From 10€.',
      sq: 'këna e bardhë në Tiranë — art trupor perlëzar, si dantellë, për nuse, fotosesione dhe evente. Vizatuar me dorë të lirë nga artistja e certifikuar Fjorentina Hoxha. Nga 10€.',
    },
    h1: {
      en: 'White Henna in Tirana — Lace-Like Bridal Body Art',
      sq: 'këna e Bardhë në Tiranë — Art Trupor për Nuse, si Dantellë',
    },
    intro: {
      en: 'White henna — "këna e bardhë" — is not a dye but a body-safe adhesive paste tinted with cosmetic-grade pigments. It sits raised on the skin like delicate lace, photographs beautifully against tanned or bronzed skin, and pairs effortlessly with crystal accents and pearl details. While it lasts only 1–3 days, it is unbeatable for the wedding day, the engagement shoot, the post-ceremony party — anywhere photographs are the point. Ideal for brides who want something striking the camera will love, but that washes off before the honeymoon.',
      sq: 'këna e bardhë nuk është ngjyrë gjurmëlënëse, por një pastë ngjitëse e sigurt për trupin, e ngjyrosur me pigmente kozmetike. Rri e ngritur mbi lëkurë si dantellë e hollë, del bukur në fotografi mbi lëkurën e bronxhuar ose më të errët dhe shoqërohet me lehtësi me kristale dhe detaje me perla. Edhe pse zgjat vetëm 1–3 ditë, është e pakrahasueshme për ditën e dasmës, sesionin e fotove të fejesës apo festën pas ceremonisë — kudo ku fotografitë janë në qendër. Ideale për nuset që duan diçka mbresëlënëse që kamera ta dojë, por që lahet para muajit të mjaltit.',
    },
    occasions: {
      en: ['Wedding day', 'Engagement shoots', 'Bridal showers', 'Photoshoots', 'Henna nights'],
      sq: ['Dita e dasmës', 'Fotot e fejesës', 'Festa para dasmës', 'Fotosesione', 'Nata e kënasë'],
    },
    faqs: [
      {
        q: { en: 'How long does white henna last?', sq: 'Sa zgjat këna e bardhë?' },
        a: {
          en: 'White henna lasts 1 to 3 days. It is a temporary adhesive design rather than a stain — perfect when you want a stunning look for a specific event without long-term commitment.',
          sq: 'këna e bardhë zgjat 1 deri në 3 ditë. Është një dizajn ngjitës i përkohshëm, jo ngjyrë gjurmëlënëse — e përsosur kur dëshironi një pamje mahnitëse për një event të caktuar pa angazhim afatgjatë.',
        },
      },
      {
        q: { en: 'Does it really photograph well?', sq: 'A del vërtet bukur në fotografi?' },
        a: {
          en: 'Yes — white henna is loved by wedding photographers because the raised, pearly texture catches light and pops in close-ups. It looks especially striking on darker or bronzed skin tones.',
          sq: 'Po — këna e bardhë adhurohet nga fotografët e dasmave, sepse tekstura e ngritur dhe perlëzar kap dritën dhe del shumë bukur në plane të afërta. Duket veçanërisht mbresëlënëse mbi lëkurë më të errët apo të bronxhuar.',
        },
      },
      {
        q: { en: 'Can I add gemstones or glitter?', sq: 'A mund të shtoj gurë ose xixëllima?' },
        a: {
          en: 'Absolutely. Crystal accents and cosmetic-grade glitter are part of our bridal white henna package (35€). They are applied while the paste is still tacky and stay on as long as the design.',
          sq: 'Patjetër. Theksat me kristale dhe xixëllimat kozmetike janë pjesë e paketës sonë të kënasë së bardhë për nuse (35€). Vendosen ndërsa pasta është ende e njomë dhe qëndrojnë sa zgjat vetë dizajni.',
        },
      },
      {
        q: { en: 'Is white henna safe?', sq: 'A është e sigurt këna e bardhë?' },
        a: {
          en: 'Yes. We use only body-safe cosmetic adhesive paste with FDA-approved pigments. It washes off cleanly with warm water and a gentle scrub.',
          sq: 'Po. Përdorim vetëm pastë ngjitëse kozmetike të sigurt për trupin, me pigmente të miratuara nga FDA. Lahet pastër me ujë të ngrohtë dhe një fërkim të butë.',
        },
      },
      {
        q: { en: 'Can I shower with white henna?', sq: 'A mund të bëj dush me këna të bardhë?' },
        a: {
          en: 'A short cool shower is fine — but avoid scrubbing the design and keep it out of direct hot water to extend its life. Most clients get 2–3 days from a single application.',
          sq: 'Një dush i shkurtër me ujë të freskët është në rregull — por shmangni fërkimin e dizajnit dhe mos e ekspozoni në ujë të nxehtë direkt që ta zgjasni jetën. Shumica e klienteve marrin 2–3 ditë nga një aplikim.',
        },
      },
    ],
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
    priceList: [
      { name: { en: 'Small design',         sq: 'Dizajn i vogël' },        description: { en: 'Finger or wrist accent',          sq: 'Theks në gisht ose në kyç' },           price: '10€' },
      { name: { en: 'Medium design',        sq: 'Dizajn mesatar' },        description: { en: 'Forearm or shoulder',             sq: 'Parakrah ose sup' },                    price: '15€' },
      { name: { en: 'Large design',         sq: 'Dizajn i madh' },         description: { en: 'Full hand or back',               sq: 'Dora e plotë ose pjesa e shpinës' },    price: '20€' },
      { name: { en: 'Bridal piece',         sq: 'Punim nuseje' },          description: { en: 'Extended bridal design',          sq: 'Dizajn i zgjeruar nuseje' },            price: '30€' },
      { name: { en: 'With gems & glitter',  sq: 'Me gurë & xixëllima' },   description: { en: 'Full design with gem accents',    sq: 'Dizajn i plotë me theksa gurësh' },     price: '35€' },
    ],
  },
  {
    slug: 'glitter-henna',
    accent: 'from-pink-400 via-fuchsia-500 to-amber-400',
    image: '/images/glitter_category.JPG',
    priceChart: '/images/whiteglitter.png',
    startingAt: '10€',
    alternativeNames: [
      'glitter tattoo', 'sparkle henna', 'party henna Tirana', 'festival henna',
      'këna me xixëllima', 'këna shkëlqyese', 'tatuazh me xixëllima',
    ],
    title: { en: 'Glitter Henna', sq: 'këna me Xixëllima' },
    tagline: {
      en: 'Sparkle that lasts the whole night',
      sq: 'Shkëlqim që zgjat tërë natën',
    },
    description: {
      en: 'Cosmetic-grade glitter layered over henna or on its own. A crowd favourite at parties, festivals and birthdays.',
      sq: 'Xixëllima kozmetike të vendosura mbi këna ose në vetvete. Të preferuarat e të gjithëve në festa, festivale dhe ditëlindje.',
    },
    longDescription: {
      en: 'Glitter henna adds shimmer to classic or white henna designs, or stands alone as a dazzling temporary tattoo. Skin-safe, waterproof on light contact, and photographs beautifully under stage and event lighting.',
      sq: 'këna me xixëllima i shton shkëlqim dizajneve klasike ose të kënasë së bardhë, ose qëndron e vetme si një tatuazh i përkohshëm verbues. E sigurt për lëkurën, rezistente ndaj kontaktit të lehtë me ujin dhe del shumë bukur në fotografi nën dritat e skenës dhe të eventeve.',
    },
    metaTitle: {
      en: 'Glitter Henna in Tirana | Sparkle Tattoos for Parties & Events',
      sq: 'këna me Xixëllima në Tiranë | Tatuazhe Shkëlqyese për Festa & Evente',
    },
    metaDescription: {
      en: 'Glitter henna tattoos in Tirana — cosmetic-grade sparkle for parties, festivals, birthdays and bridal events. Skin-safe, photo-ready. From 10€.',
      sq: 'Tatuazhe me këna me xixëllima në Tiranë — shkëlqim kozmetik për festa, festivale, ditëlindje dhe evente nuseje. Të sigurta për lëkurën, gati për foto. Nga 10€.',
    },
    h1: {
      en: 'Glitter Henna in Tirana — Sparkle Tattoos for Every Celebration',
      sq: 'këna me Xixëllima në Tiranë — Tatuazhe Shkëlqyese për Çdo Festë',
    },
    intro: {
      en: 'Glitter henna ("këna me xixëllima") is the showstopper. Layered over white henna for a 3D shimmer or standing alone for an all-glitter motif, it catches every light and holds up through hours of dancing. We use only cosmetic-grade, skin-safe glitter in dozens of colours — gold, rose-gold, silver, holographic, pastel, neon. Perfect for birthdays, festivals, hen-dos, kids parties and bridal moments where you want to be the most photographed person in the room.',
      sq: 'këna me xixëllima është ajo që të lë pa fjalë. E vendosur mbi kanën e bardhë për një shkëlqim 3D ose e vetme si motiv tërësisht me xixëllima, ajo kap çdo dritë dhe rezistron orë të tëra vallëzimi. Përdorim vetëm xixëllima kozmetike, të sigurta për lëkurën, në dhjetëra ngjyra — ari, ari rozë, argjendi, holografike, pastel dhe neon. E përsosur për ditëlindje, festivale, mbrëmje beqarie, festa fëmijësh dhe momente nuseje, kur do të jeni personi më i fotografuar i mbrëmjes.',
    },
    occasions: {
      en: ['Birthdays', 'Festivals', 'Hen parties', "Kids' parties", 'Bridal showers'],
      sq: ['Ditëlindje', 'Festivale', 'Mbrëmje beqarie', 'Festa fëmijësh', 'Festa para dasmës'],
    },
    faqs: [
      {
        q: { en: 'How long does glitter henna last?', sq: 'Sa zgjat këna me xixëllima?' },
        a: {
          en: 'Glitter henna lasts 2 to 5 days depending on placement and how often you wash. Areas that rub against clothing fade faster — we recommend forearms, calves, shoulders and chest.',
          sq: 'këna me xixëllima zgjat 2 deri në 5 ditë, varësisht nga vendndodhja dhe sa shpesh laheni. Zonat që fërkohen me rrobat zbehen më shpejt — rekomandojmë parakrahët, pulpat, supet dhe kraharorin.',
        },
      },
      {
        q: { en: 'Is the glitter safe for skin?', sq: 'A janë të sigurta xixëllimat për lëkurën?' },
        a: {
          en: 'Yes. We use only cosmetic-grade glitter approved for body use, applied with body-safe adhesive paste. Safe for adults and children over 6.',
          sq: 'Po. Përdorim vetëm xixëllima kozmetike të miratuara për përdorim mbi trup, të aplikuara me pastë ngjitëse të sigurt. Të sigurta për të rriturit dhe fëmijët mbi 6 vjeç.',
        },
      },
      {
        q: { en: 'Can I combine glitter with brown or jagua henna?', sq: "A mund t'i kombinoj xixëllimat me kanën kafe ose jagua?" },
        a: {
          en: 'Yes — glitter accents added on top of natural henna or jagua designs are beautiful for bridal and festival looks. Glitter is added once the base design is dry; we discuss the combination during your booking.',
          sq: 'Po — theksat me xixëllima të vendosura mbi dizajne të kënasë natyrale ose jagua dalin shumë bukur për pamje nuseje dhe festivalesh. Xixëllimat shtohen pasi dizajni bazë të jetë tharë; kombinimin e diskutojmë gjatë rezervimit.',
        },
      },
      {
        q: { en: 'Will it survive a pool or the beach?', sq: "A do t'i mbijetojë pishinës ose plazhit?" },
        a: {
          en: 'Light contact with water is fine but extended pool or sea time will lift the glitter. For festivals and beach holidays, plan to refresh after a swim.',
          sq: "Kontakti i lehtë me ujin nuk është problem, por qëndrimi i gjatë në pishinë ose në det do t'i ngrejë xixëllimat. Për festivale dhe pushime në plazh, planifikoni një rifreskim pas notit.",
        },
      },
      {
        q: { en: 'Can you do glitter henna for a kids party?', sq: 'A bëni këna me xixëllima për festa fëmijësh?' },
        a: {
          en: 'Yes — glitter henna stations are very popular for kids birthday parties in Tirana. We bring everything to your venue. Per-child pricing starts from 10€ for group bookings.',
          sq: 'Po — stacionet me këna xixëllimash janë shumë të kërkuara për ditëlindjet e fëmijëve në Tiranë. Sjellim gjithçka tek vendi i juaj. Çmimi për fëmijë fillon nga 10€ për rezervime në grup.',
        },
      },
    ],
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
    priceList: [
      { name: { en: 'Small glitter tattoo',  sq: 'Tatuazh i vogël me xixëllima' }, description: { en: 'Single motif',             sq: 'Motiv i vetëm' },                       price: '10€' },
      { name: { en: 'Medium glitter design', sq: 'Dizajn mesatar me xixëllima' },  description: { en: 'Forearm or shoulder',      sq: 'Parakrah ose sup' },                    price: '15€' },
      { name: { en: 'Large glitter piece',   sq: 'Punim i madh me xixëllima' },    description: { en: 'Full hand or back',        sq: 'Dora e plotë ose shpina' },             price: '20€' },
      { name: { en: 'Glitter bridal',        sq: 'Xixëllima për nuse' },           description: { en: 'Extended festival design', sq: 'Dizajn i zgjeruar festivali' },         price: '30€' },
      { name: { en: 'Premium glitter set',   sq: 'Set premium me xixëllima' },     description: { en: 'Full design with accents', sq: 'Dizajn i plotë me theksa' },            price: '35€' },
    ],
  },
  {
    slug: 'colorful-henna',
    accent: 'from-rose-400 via-violet-500 to-cyan-400',
    image: '/images/neon_category.jpg',
    startingAt: '15€',
    alternativeNames: [
      'neon henna', 'UV henna', 'colourful henna', 'rainbow henna', 'festival henna Tirana',
      'këna me ngjyra', 'këna neon', 'tatuazh me ngjyra',
    ],
    title: { en: 'Colorful Henna', sq: 'këna me Ngjyra' },
    tagline: {
      en: 'Neon & colour — every shade you can imagine',
      sq: 'Neon & ngjyra — çdo nuancë që mund të imagjinosh',
    },
    description: {
      en: 'Non-natural, body-safe coloured paste in every shade. Playful, bold, and perfect for festivals, events and kids.',
      sq: 'Pastë jo natyrale me ngjyra, e sigurt për trupin, në çdo nuancë. Argëtuese, e guximshme dhe e përsosur për festivale, evente dhe fëmijë.',
    },
    longDescription: {
      en: 'Coloured henna uses cosmetic body paint in a henna-style paste: reds, blues, greens, golds, neons and pastels. Fun, vivid, and completely temporary — washes off within a few days. Also available as UV neon henna for parties and events.',
      sq: 'këna me ngjyra përdor bojë trupore kozmetike në një pastë në stilin e kënasë: të kuqe, blu, jeshile, ari, neon dhe pastel. Argëtuese, e gjallë dhe plotësisht e përkohshme — lahet brenda pak ditësh. E disponueshme edhe si këna UV neon për festa dhe evente.',
    },
    metaTitle: {
      en: 'Colorful & Neon Henna in Tirana | UV Tattoos for Festivals',
      sq: 'këna me Ngjyra & Neon në Tiranë | Tatuazhe UV për Festivale',
    },
    metaDescription: {
      en: 'Colourful and UV-neon henna tattoos in Tirana, Albania. Vivid body art for festivals, parties, kids events and stage shows. From 15€.',
      sq: 'Tatuazhe me këna me ngjyra dhe UV-neon në Tiranë, Shqipëri. Art trupor i gjallë për festivale, festa, evente fëmijësh dhe shfaqje skenike. Nga 15€.',
    },
    h1: {
      en: 'Colorful & Neon Henna Tattoos in Tirana',
      sq: 'Tatuazhe me këna me Ngjyra & Neon në Tiranë',
    },
    intro: {
      en: 'Colourful henna ("këna me ngjyra") swaps tradition for full creative freedom — vivid reds, royal blues, emerald greens, sunset oranges, soft pastels, metallic golds and UV-reactive neons that glow under blacklight. Drawn with body-safe cosmetic paste in henna-style detail, it is the go-to for festivals, music events, kids birthdays, theme parties and stage performances. Single-colour pieces or full multicolour mandalas — every shade is possible.',
      sq: 'këna me ngjyra ("këna me ngjyra") e zëvendëson traditën me liri të plotë krijuese — të kuqe të gjalla, blu mbretërore, jeshile smeraldi, portokalli perëndimi, pastele të buta, ar metalik dhe neon UV-reaktive që ndriçojnë nën dritën e zezë. E vizatuar me pastë kozmetike të sigurt për trupin, në detaje të stilit të kënasë, është zgjedhja kryesore për festivale, evente muzikore, ditëlindje fëmijësh, festa tematike dhe shfaqje skenike. Punime me një ngjyrë ose mandala të plota me shumë ngjyra — çdo nuancë është e mundur.',
    },
    occasions: {
      en: ['Festivals', 'Music events', "Kids' parties", 'Stage performances', 'Themed parties'],
      sq: ['Festivale', 'Evente muzikore', 'Festa fëmijësh', 'Shfaqje skenike', 'Festa tematike'],
    },
    faqs: [
      {
        q: { en: 'How long does colourful henna last?', sq: 'Sa zgjat këna me ngjyra?' },
        a: {
          en: 'Coloured henna designs last 2 to 4 days. They fade gradually as you wash; aftercare is the same as glitter — keep dry for the first hour and avoid scrubbing.',
          sq: 'Dizajnet me këna me ngjyra zgjasin 2 deri në 4 ditë. Zbehen gradualisht ndërsa laheni; kujdesi pas aplikimit është i njëjtë me xixëllimat — mbajeni të thatë gjatë orës së parë dhe shmangni fërkimin.',
        },
      },
      {
        q: { en: 'Does the UV neon henna actually glow?', sq: 'A ndriçon vërtet këna neon UV?' },
        a: {
          en: 'Yes — under UV/blacklight (common at clubs, festivals and themed parties) the neon paste glows vividly. In daylight it appears as a soft pastel.',
          sq: 'Po — nën dritë UV/të zezë (e zakonshme në klube, festivale dhe festa tematike) pasta neon ndriçon shumë qartë. Në dritën e ditës duket si pastel i butë.',
        },
      },
      {
        q: { en: 'Can you mix colours in one design?', sq: "A mund t'i përzieni ngjyrat në një dizajn?" },
        a: {
          en: 'Multi-colour designs are one of the most-requested looks. We use up to 4–5 colours in a single piece for festival and stage work.',
          sq: 'Dizajnet me shumë ngjyra janë ndër pamjet më të kërkuara. Përdorim deri në 4–5 ngjyra në një punim të vetëm për festivale dhe shfaqje skenike.',
        },
      },
      {
        q: { en: 'Is it safe for kids?', sq: 'A është e sigurt për fëmijët?' },
        a: {
          en: 'Yes — we use only cosmetic-grade, hypoallergenic paste. Kids parties are very popular. Group bookings get a per-child rate from 10€.',
          sq: 'Po — përdorim vetëm pastë kozmetike, hipoalergjike. Festat e fëmijëve janë shumë të kërkuara. Rezervimet në grup kanë çmim për fëmijë nga 10€.',
        },
      },
      {
        q: { en: 'Can I get UV henna for a club night?', sq: 'A mund të bëj këna UV për një natë në klub?' },
        a: {
          en: 'Absolutely — UV henna is one of the most popular requests for nights out, hen parties and rave-style events in Tirana. Designs glow strongest in the first 24 hours.',
          sq: 'Patjetër — këna UV është një nga kërkesat më të zakonshme për dalje nate, mbrëmje beqarie dhe evente në stilin rave në Tiranë. Dizajnet ndriçojnë më fort gjatë 24 orëve të para.',
        },
      },
    ],
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
    priceList: [
      { name: { en: 'Small colour design',  sq: 'Dizajn i vogël me ngjyra' },  description: { en: 'Finger, wrist or cheek',      sq: 'Gisht, kyç ose faqe' },                  price: '15€' },
      { name: { en: 'Medium colour design', sq: 'Dizajn mesatar me ngjyra' },  description: { en: 'Forearm or back of hand',     sq: 'Parakrah ose pjesa e pasme e dorës' },   price: '25€' },
      { name: { en: 'Large / multi-colour', sq: 'I madh / shumëngjyrësh' },    description: { en: 'Full hand, back or sleeve',   sq: 'Dora e plotë, shpina ose mëngë' },       price: '35€' },
      { name: { en: 'Kids party package',   sq: 'Paketa për festa fëmijësh' }, description: { en: 'Per child — group bookings', sq: 'Për fëmijë — rezervime në grup' },       price: 'from 10€' },
    ],
  },
];

function localize(c: LocalizedCategory, lang: Lang): Category {
  return {
    slug: c.slug,
    accent: c.accent,
    image: c.image,
    heroImage: c.heroImage,
    priceChart: c.priceChart,
    gallery: c.gallery,
    startingAt: c.startingAt,
    alternativeNames: c.alternativeNames,
    title: c.title[lang],
    tagline: c.tagline[lang],
    description: c.description[lang],
    longDescription: c.longDescription[lang],
    metaTitle: c.metaTitle?.[lang],
    metaDescription: c.metaDescription?.[lang],
    h1: c.h1?.[lang],
    intro: c.intro?.[lang],
    occasions: c.occasions?.[lang],
    faqs: c.faqs?.map((f) => ({ q: f.q[lang], a: f.a[lang] })),
    priceList: c.priceList.map((p) => ({
      name: p.name[lang],
      description: p.description?.[lang],
      price: p.price,
    })),
  };
}

export function getCategories(lang: Lang): Category[] {
  return localizedCategories.map((c) => localize(c, lang));
}

export function getCategory(slug: string, lang: Lang): Category | undefined {
  const found = localizedCategories.find((c) => c.slug === slug);
  return found ? localize(found, lang) : undefined;
}

export const categories: Category[] = getCategories('en');
