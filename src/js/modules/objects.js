// Object for cart summary
export const cartSummaryObject = {
  counter: 0,
  subtotal: 0,
  discounts: 0,
  vat: 0,
  shippingCost: 0,
  total: 0
};


// Object for cart Items
export const cartItemsObject = {};


// Shipping Object
export const shippingObject = {
  stork: {
    fixed: 250, variable: 4,
    min: 1, max: 12,
    text: 'stork'
  },
  dove: {
    fixed: 150, variable: 3,
    min: 8, max: 16,
    text: 'duva'
  },
  hare: {
    fixed: 75, variable: 2,
    min: 14, max: 28,
    text: 'hare'
  },
  snail: {
    fixed: 25, variable: 1,
    min: 42, max: 82,
    text: 'snigel'
  }
}


// Date translation
export const dateTranslationObject = {
  day: {
    0: 'Söndag',
    1: 'Måndag',
    2: 'Tisdag',
    3: 'Onsdag',
    4: 'Torsdag',
    5: 'Fredag',
    6: 'Lördag'
  },
  month: {
    0: 'Janiari',
    1: 'Februari',
    2: 'Mars',
    3: 'April',
    4: 'Maj',
    5: 'Juni',
    6: 'Juli',
    7: 'Augusti',
    8: 'Septober',
    9: 'Oktember',
    10: 'November',
    11: 'December'
  }
}


// Object with information of each product
export const productsObject = {
  0: {
    id: 0,
    breedInfo: {
      breed: 'Labrador retriever',
      origin: 'Storbritanien',
      type: ['jakthund', 'sällskapshund'],
      byline: 'Social och stark apportör som är duktig på det mesta'
    },
    properties: {
      popularity: 5,
      qualities: {
        activity: 3,
        furCare: 1,
        size: 4,
      },
      weight: {
        male: 7,
        female: 5
      }
    },
    priceInfo: {
      price: 18000
    },
    description: {
      generally: {
        title: 'Allmänt',
        text: [
          'Labrador retriever är en jakthund som arbetar efter skott och används för att apportera fågel och småvilt. Rasen meriteras på jaktprov och utställning. Egenskaperna som behövs för att bli en duglig apportör, bland annat samarbetsvilja, följsamhet och arbetslust, gör att rasen kan användas till nästan allt annat också. Många meriterar sin hund på viltspår och använder den som eftersökshund.',
          'Labrador retriever används också som ledar-, service- och narkotikahund och inte minst som familjehund. Även om rasen inte är en brukshund är det många som tränar och tävlar inom bruksgrenarna och i lydnad.'
        ]
      }
    },
    image: {
      url: 'img/puppies/labrador-retriever',
      alt: 'En leverbrun Labrador-valp retriever på en gräsmatta i utställningsmiljö',
    }
  },

  1: {
    id: 1,
    breedInfo: {
      breed: 'Tysk Shäferhund',
      origin: 'Tyskland',
      type: ['vallhund', 'brukshund', 'tjänstehund'],
      byline: 'Samarbetsvillig, livlig och uppmärksam jobbkompis'
    },
    properties: {
      popularity: 4.8,
      qualities: {
        activity: 4,
        furCare: 3,
        size: 4
      },
      weight: {
        male: 9,
        female: 6
      }
    },
    priceInfo: {
      price: 20000
    },
    description: {
      generally: {
        title: 'Allmänt',
        text: [
          'Tysk schäferhund har genom sin mångsidighet och sina bruksegenskaper etablerat sig som en mycket duglig tjänstehund inom en rad olika områden i vårt moderna samhälle. Den är också mycket eftertraktad som tävlingshund och familjehund. Det är en av världens vanligaste hundraser.',
          'Det finns två pälstyper normalhårig och långhårig.'
        ]
      }
    },
    image: {
      url: 'img/puppies/german-shepherd',
      alt: 'En Tysk shäferhund-valp på en gräsmatta i utställningsmiljö',
    }
  },

  2: {
    id: 2,
    breedInfo: {
      breed: 'Golden retriever',
      origin: 'Storbritanien',
      type: ['jakthund', 'sällskapshund'],
      byline: 'Vänlig och aktiv med stor passion för vatten',
    },
    properties: {
      popularity: 4.6,
      qualities: {
        activity: 3,
        furCare: 2,
        size: 4
      },
      weight: {
        male: 7,
        female: 5
      }
    },
    priceInfo: {
      price: 16000
    },
    description: {
      generally: {
        title: 'Allmänt',
        text: [
          'Golden retrieverns ursprung som apporterande fågelhund gör den till en lämplig arbetande hundras. Idag är den en allroundhund som lämpar sig väl både som jakthund eller sällskapshund i ett aktivt hem. Rasens egenskaper gör att den är uppskattad i många sammanhang, till exempel som brukshund eller familjehund. En golden retriever ska vara samarbetsvillig, följsam, lyhörd och vänlig, med utpräglad apporterings- och arbetslust.'
        ]
      }
    },
    image: {
      url: 'img/puppies/golden-retriever',
      alt: 'En Golden retriever-valp på en gräsmatta i utställningsmiljö',
    }
  },

  3: {
    id: 3,
    breedInfo: {
      breed: 'Fransk bulldog',
      origin: 'Frankrike',
      type: ['sällskapshund'],
      byline: 'Aktiv och trevlig med stor personlighet',
    },
    properties: {
      popularity: 4.4,
      qualities: {
        activity: 2,
        furCare: 2,
        size: 2
      },
      weight: {
        male: 4,
        female: 2
      }
    },
    priceInfo: {
      price: 27500
    },
    description: {
      generally: {
        title: 'Allmänt',
        text: [
          'Fransk bulldogg  är en utpräglad sällskapshund. Oftas är hunden född med en väldigt kort svans'
        ]
      }
    },
    image: {
      url: 'img/puppies/french-bulldog',
      alt: 'En mörkgrå Frank bulldog-valp på en gräsmatta i utställningsmiljö',
    }
  },

  3: {
    id: 3,
    breedInfo: {
      breed: 'Fransk bulldog',
      origin: 'Frankrike',
      type: ['sällskapshund'],
      byline: 'Aktiv och trevlig med stor personlighet',
    },
    properties: {
      popularity: 4.4,
      qualities: {
        activity: 2,
        furCare: 2,
        size: 2
      },
      weight: {
        male: 4,
        female: 2
      }
    },
    priceInfo: {
      price: 27500
    },
    description: {
      generally: {
        title: 'Allmänt',
        text: [
          'Fransk bulldogg  är en utpräglad sällskapshund. Oftas är hunden född med en väldigt kort svans'
        ]
      }
    },
    image: {
      url: 'img/puppies/french-bulldog',
      alt: 'En mörkgrå Frank bulldog-valp på en gräsmatta i utställningsmiljö',
    }
  },

  4: {
    id: 4,
    breedInfo: {
      breed: 'Cihuahua',
      origin: 'Mexiko',
      type: ['sällskapshund'],
      byline: 'Liten och sällskaplig hund som kan ta ton',
    },
    properties: {
      popularity: 4.2,
      qualities: {
        activity: 2,
        furCare: 2,
        size: 1,
      },
      weight: {
        male: 1,
        female: 0.5,
      },
    },
    priceInfo: {
      price: 25000,
    },
    description: {
      generally: {
        title: 'Allmänt',
        text: [
          'Rasen är en renodlad sällskapshund och världens minsta hundras. Det finns två pälsvarianter: lång- och korthårig.',
        ],
      },
    },
    image: {
      url: 'img/puppies/chihuahua',
      alt: 'En gulbrun Chihuahua-valp på en gräsmatta i utställningsmiljö',
    },
  },

  5: {
    id: 5,
    breedInfo: {
      breed: 'Cocker spaniel',
      origin: 'Storbritanien',
      type: ['jakthund', 'sällskapshund'],
      byline: 'Livlig och tillgiven med ursprung som jakthund',
    },
    properties: {
      popularity: 4,
      qualities: {
        activity: 3,
        furCare: 4,
        size: 2,
      },
      weight: {
        male: 5,
        female: 3,
      },
    },
    priceInfo: {
      price: 19000,
    },
    description: {
      generally: {
        title: 'Allmänt',
        text: [
          'Rasen fungerar utmärkt som en sportig och aktiv sällskapshund. Den jobbar gärna tillsammans med sin ägare, vilket är ett arv från spanieljaktens speciella villkor som kräver ett nära samarbete mellan förare och hund. En cocker spaniel är läraktig, vänlig, livlig, lekfull och ibland också egensinnig. Rasen har ett stort behov av närhet och kroppskontakt. Förutom som jakthund kan rasen användas till hundsporter som lydnad, agility och viltspår. Vissa uppfödare inriktar sitt avelsarbete främst på rasens jaktegenskaper.',
        ],
      },
    },
    image: {
      url: 'img/puppies/cocker-spaniel',
      alt: 'En gyllenbrun Cocker spaniel-valp på en gräsmatta i utställningsmiljö',
    },
  },

  6: {
    id: 6,
    breedInfo: {
      breed: 'Tax',
      origin: 'Tyskland',
      type: ['grythund', 'jakthund', 'sällskapshund'],
      byline: 'Vänlig, envis och uthållig trots sina korta ben',
    },
    properties: {
      popularity: 3.8,
      qualities: {
        activity: 4,
        furCare: 4,
        size: 2,
      },
      weight: {
        male: 4,
        female: 2,
      },
    },
    priceInfo: {
      price: 17000,
    },
    description: {
      generally: {
        title: 'Allmänt',
        text: [
          'Tax är en mångsidig jakthund. I samband med ökningen av rådjursstammen i Sverige under 1940-talet uppstod behovet av små, långsamdrivande hundar och taxen utvecklades till en populär rådjursspecialist. Även om intresset för grytjakt i Sverige minskat betydligt får vi inte glömma att många av rasens särdrag, och formatet, framavlats för att få en användbar grythund.',
          'De flesta taxar är framförallt trevliga familjemedlemmar och det är en av världens mest omtyckta och spridda hundras.',
        ],
      },
    },
    image: {
      url: 'img/puppies/daschshund',
      alt: 'En gstart brun tax-valp på en gräsmatta i utställningsmiljö',
    },
  },

  7: {
    id: 7,
    breedInfo: {
      breed: 'Shetland sheepdog',
      origin: 'Storbritanien',
      type: ['sällskapshund'],
      byline: 'Lättlärd, tillgiven och aktiv',
    },
    properties: {
      popularity: 3.6,
      qualities: {
        activity: 3,
        furCare: 3,
        size: 3,
      },
      weight: {
        male: 4,
        female: 2,
      },
    },
    priceInfo: {
      price: 21000,
    },
    description: {
      generally: {
        title: 'Allmänt',
        text: [
          'Shetland sheepdog, oftast kallad sheltie, är en omtycket och mångsidig hundras som passar såväl barnfamiljen som den äldre personen. I många länder återfinns den på topplistorna över de mest populära hundraserna. Med sitt vackra yttre, vänliga temperament och behändiga storlek är det lätt att förstå varför.',
          'Rasen är framgångsrik i hundsporter som utställning, lydnad, freestyle och rallylydnad. Men det är framför allt som agilityhund som rasen ligger i topp internationellt. Det finns också ett antal duktiga individer som utbildats till servicehundar.',
        ],
      },
    },
    image: {
      url: 'img/puppies/shetland-sheepdog',
      alt: 'En Sheltie-valp på en gräsmatta i utställningsmiljö',
    },
  },

  8: {
    id: 8,
    breedInfo: {
      breed: 'Cavalier king charles spaniel',
      origin: 'Storbritanien',
      type: ['sällskapshund'],
      byline: 'Tillgiven och käck med lång silkig päls',
    },
    properties: {
      popularity: 3.4,
      qualities: {
        activity: 2,
        furCare: 3,
        size: 2,
      },
      weight: {
        male: 3,
        female: 2,
      },
    },
    priceInfo: {
      price: 29000,
    },
    description: {
      generally: {
        title: 'Allmänt',
        text: [
          'Rasen lever väl upp till de förväntningar man kan ha på en sällskapshund. Den är i allmänhet orädd, social med både människor och andra hundar, lekfull och lätthanterlig. Den är sportig och passar utmärkt som sällskapshund och för utställning, agility, lydnad och andra roliga hundsporter.',
        ],
      },
    },
    image: {
      url: 'img/puppies/cavalier-king-charles-spaniel',
      alt: 'En ljust brun och vit Cavalier king charles spaniel-valp på en gräsmatta i utställningsmiljö',
    },
  },

  9: {
    id: 9,
    breedInfo: {
      breed: 'Staffordshire bullterier',
      origin: 'Storbritanien',
      type: ['sällskapshund'],
      byline: 'Glad, energisk, socialt litet kraftpaket',
    },
    properties: {
      popularity: 3.2,
      qualities: {
        activity: 3,
        furCare: 1,
        size: 3,
      },
      weight: {
        male: 6,
        female: 4,
      },
    },
    priceInfo: {
      price: 26000,
    },
    description: {
      generally: {
        title: 'Allmänt',
        text: [
          'Staffordshire bullterrier är en utpräglad sällskapshund som gillar de flesta hundsporterna. Många tränar och tävlar framgångsrikt i agility, lydnad, rallylydnad, nosework, viltspår och bruks. Det är också en populär hundras på utställningar.',
        ],
      },
    },
    image: {
      url: 'img/puppies/staffordshire-bull-terrier',
      alt: 'En svart och brun Staffordshire bull terier-valp på en gräsmatta i utställningsmiljö',
    },
  },

  10: {
    id: 10,
    breedInfo: {
      breed: 'Pudel, stor (Kungspudel)',
      origin: 'Frankrike',
      type: ['sällskapshund'],
      byline: 'Livlig och snabbtänkt med stolt resning, en av fyra storlekar',
    },
    properties: {
      popularity: 3,
      qualities: {
        activity: 3,
        furCare: 4,
        size: 4,
      },
      weight: {
        male: 8,
        female: 5,
      },
    },
    priceInfo: {
      price: 35000,
    },
    description: {
      generally: {
        title: 'Allmänt',
        text: [
          'En pudel är i första hand en glad och sportig familjehund. Den trivs med familjelivet och vill hänga med överallt samt vara där det händer saker. Man har alltid roligt med sin pudel. Det är en lekfull hundras som uppskattar en variation av aktiviteter; där både knopp och kropp får sitt. Även om rasen inte kräver hård motion regelbundet, trivs den allra bäst av att dagligen få röra på sig och att aktiveras mentalt.',
        ],
      },
    },
    image: {
      url: 'img/puppies/king-poodle',
      alt: 'En mörkbrun Kungspudel-valp på en gräsmatta i utställningsmiljö',
    },
  },

  11: {
    id: 11,
    breedInfo: {
      breed: 'Border collie',
      origin: 'Storbritanien',
      type: ['vallhund'],
      byline: 'Reaktionssnabb vallhund med stor arbetslust',
    },
    properties: {
      popularity: 2.8,
      qualities: {
        activity: 5,
        furCare: 2,
        size: 3,
      },
      weight: {
        male: 5,
        female: 3,
      },
    },
    priceInfo: {
      price: 30000,
    },
    description: {
      generally: {
        title: 'Allmänt',
        text: [
          'Border collie är i första hand en vallhund och har skapats genom strängt urval på önskade vallanlag, Det är en mycket arbetsvillig hundras som behöver ha mentalt stimulerande arbetsuppgifter i livet för att må bra. Som enbart sällskapshund kan den därför bli en mycket krävande hund.',
        ],
      },
    },
    image: {
      url: 'img/puppies/border-collie',
      alt: 'En brun och vit border collie-valp på en gräsmatta i utställningsmiljö',
    },
  },

  12: {
    id: 12,
    breedInfo: {
      breed: 'Australian shepherd',
      origin: 'Australien',
      type: ['vallhund', 'brukshund'],
      byline: 'Mångsidig och lyhörd – ibland med stubbsvans',
    },
    properties: {
      popularity: 2.6,
      qualities: {
        activity: 4,
        furCare: 3,
        size: 4,
      },
      weight: {
        male: 6,
        female: 4,
      },
    },
    priceInfo: {
      price: 30000,
    },
    description: {
      generally: {
        title: 'Allmänt',
        text: [
          'Australian shepherd är en intelligent arbetshund med vall- och bruksegenskaper. Den är lättlärd, lyhörd, reagerar snabbt och vill arbeta i team med sin förare. Den lämpar sig därför för flera aktiviteter och då gärna inom bruks eller vallning. Rasen är en trogen kompis och som har energi nog för långa arbetspass.',
          'Bakgrunden som vall- och vakthund innebär ofta andra egenskaper än om det är en ren sällskaps- och familjehund du söker. Förutsättningen för att en australian shepherd ska passa är att man kan ge hunden den mängd aktivitet och arbete som rasen kräver.',
        ],
      },
    },
    image: {
      url: 'img/puppies/australian-shepherd',
      alt: 'En grå, brun, svart och vit Australian shepherd-valp på en gräsmatta i utställningsmiljö',
    },
  },

  13: {
    id: 13,
    breedInfo: {
      breed: 'Jack russel terrier',
      origin: 'Storbritanien',
      type: ['grythund', 'sällskapshund'],
      byline: 'Stort mod och självförtroende i liten förpackning',
    },
    properties: {
      popularity: 2.4,
      qualities: {
        activity: 4,
        furCare: 3,
        size: 2,
      },
      weight: {
        male: 3,
        female: 2,
      },
    },
    priceInfo: {
      price: 14000,
    },
    description: {
      generally: {
        title: 'Allmänt',
        text: [
          'Jack russell terrier är en sällskapshund men också en duglig jaktterrier, lämpad för grytjakt. Det är en positiv hund, förväntansfull och glad möter den de flesta utmaningar. Man ska vara medveten om att jaktinstinkten finns där, även om man inte tänkt använda hunden till jakt. Jaktinstinkten utgör en motor hos hunden, och den motorn kan användas till så mycket annat, till exempel hundsporter som agility, spår och eftersök.',
        ],
      },
    },
    image: {
      url: 'img/puppies/jack-russel-terrier',
      alt: 'En brun och vit Jack russel terrier-valp på en gräsmatta i utställningsmiljö',
    },
  },

  14: {
    id: 14,
    breedInfo: {
      breed: 'Rottweiler',
      origin: 'Tyskland',
      type: ['brukshund', 'sällskapshund'],
      byline: 'Pampig, alert och mångsidig brukshund',
    },
    properties: {
      popularity: 2.2,
      qualities: {
        activity: 4,
        furCare: 1,
        size: 4,
      },
      weight: {
        male: 12,
        female: 8,
      },
    },
    priceInfo: {
      price: 26000,
    },
    description: {
      generally: {
        title: 'Allmänt',
        text: [
          'Idag är rottweiler en uppskattad sällskaps-, tjänste- och brukshund som passar för ett aktivt liv med sin familj. Spår och lydnad är omtyckta aktiviteter för de flesta rottweiler, och många är uppskattade patrullhundar inom hemvärnet. Även friluftsliv så som vandring, drag, skidor och cykling passar väl för en rottweiler.',
        ],
      },
    },
    image: {
      url: 'img/puppies/rottweiler',
      alt: 'En Rottweiler-valp på en gräsmatta i utställningsmiljö',
    },
  },

  15: {
    id: 15,
    breedInfo: {
      breed: 'Siberian huskey',
      origin: 'USA',
      type: ['slädhund'],
      byline: 'Livlig och verbal slädhund med stor flockinstinkt',
    },
    properties: {
      popularity: 2.0,
      qualities: {
        activity: 5,
        furCare: 2,
        size: 4,
      },
      weight: {
        male: 6,
        female: 4,
      },
    },
    priceInfo: {
      price: 24000,
    },
    description: {
      generally: {
        title: 'Allmänt',
        text: ['Siberian husky används i dag som slädhund för nöjes skull, tävling eller i turistverksamhet. Tillgodoser man hundens krav på motion och flockgemenskap får man uppleva en sund, aktiv hund med hög arbetsmoral. Det är en hund som älskar att jobba och trivs inte enbart som sällskapshund.'],
      },
    },
    image: {
      url: 'img/puppies/siberian-huskey',
      alt: 'En Grå och vit Siberian huskey-valp på en gräsmatta i utställningsmiljö',
    },
  },

  16: {
    id: 16,
    breedInfo: {
      breed: 'Welsh corgi prembroke',
      origin: 'Storbritanien',
      type: ['vallhund', 'sällskapshund'],
      byline: 'Energisk kortbent kompis som gillar aktivitet',
    },
    properties: {
      popularity: 1.8,
      qualities: {
        activity: 3,
        furCare: 1,
        size: 2,
      },
      weight: {
        male: 5,
        female: 3,
      },
    },
    priceInfo: {
      price: 28500,
    },
    description: {
      generally: {
        title: 'Allmänt',
        text: ['Welsh corgi pembroke är i dag främst en sällskapshund. Med en konsevent uppfostran, framförallt under det första året, så får du en lättsam och positiv kompis under många år framåt. Den deltar gärna i olika hundsporterna såsom lydnad, agility, spår och viltspår med flera.'],
      },
    },
    image: {
      url: 'img/puppies/welsh-corgi',
      alt: 'En brun och vit Welsh corgi-valp på en gräsmatta i utställningsmiljö',
    },
  },

  17: {
    id: 17,
    breedInfo: {
      breed: 'Dalmatiner',
      origin: 'Kroatien',
      type: ['sällskapshund'],
      byline: 'Läckig skönhet med en del vaktinstinkt',
    },
    properties: {
      popularity: 1.6,
      qualities: {
        activity: 4,
        furCare: 1,
        size: 4,
      },
      weight: {
        male: 8,
        female: 5,
      },
    },
    priceInfo: {
      price: 17500,
    },
    description: {
      generally: {
        title: 'Allmänt',
        text: ['Rasen är lättlärd och mångsidig men är ingen arbetande bruksras. Många tränar sina hundar i lydnad, agility och viltspår.'],
      },
    },
    image: {
      url: 'img/puppies/dalmatian',
      alt: 'En Dalmatiner-valp på en gräsmatta i utställningsmiljö',
    },
  },

  18: {
    id: 18,
    breedInfo: {
      breed: 'Alaskan malamute',
      origin: 'USA',
      type: ['sällskapshund'],
      byline: 'Vänlig men krävande och älskar friluftsliv',
    },
    properties: {
      popularity: 1.4,
      qualities: {
        activity: 5,
        furCare: 2,
        size: 4,
      },
      weight: {
        male: 10,
        female: 8,
      },
    },
    priceInfo: {
      price: 26500,
    },
    description: {
      generally: {
        title: 'Allmänt',
        text: ['Alaskan malamute har avlats fram för att arbeta som slädhund i polartrakter och då inte för snabba löp utan för att dra tung last. Rasen används fortfarande som draghund som den specialist den är på att dra tunga lass långa sträckor. Snö och kyla är inget som hindrar en alaskan malamute. Den gillar att jobba med fysiskt aktivitet, och hänger gärna med på löpturer, simning och fjällvandring.'],
      },
    },
    image: {
      url: 'img/puppies/alaskan-malamute',
      alt: 'En Alaskan malamute-valp på en gräsmatta i utställningsmiljö',
    },
  },

  19: {
    id: 19,
    breedInfo: {
      breed: 'Australian kelpie',
      origin: 'Australien',
      type: ['vallhund', 'brukshund'],
      byline: 'Energisk, mångsidig och älskar att träna',
    },
    properties: {
      popularity: 1.2,
      qualities: {
        activity: 4,
        furCare: 2,
        size: 3,
      },
      weight: {
        male: 5,
        female: 3,
      },
    },
    priceInfo: {
      price: 24500,
    },
    description: {
      generally: {
        title: 'Allmänt',
        text: [
          'Australian kelpie har en naturlig instinkt och fallenhet för att valla får, både på öppen ostängslad mark och i inhägnade fållor. Genom sin storlek och kapacitet har kelpie visat sig vara en utmärkt allroundhund. Den har inte bara nått framgångar som vallhund utan lämpar sig också mycket bra till hundsporterna bruks, agility och lydnad. Den passar även som tjänstehund inom såväl bevakning som räddning.',
          'Rasen är mycket arbetsvillig och trivs bäst när den får någon uppgift att lösa.'
        ],
      },
    },
    image: {
      url: 'img/puppies/australian-kelpie',
      alt: 'En brun Australian kelpie-valp på en gräsmatta i utställningsmiljö',
    },
  }
};