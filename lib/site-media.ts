/**
 * EDIT IMAGES HERE
 * Put replacement files in public/ and use paths beginning with / (not public/).
 * These local files are reused everywhere so one change updates the whole site.
 * objectPosition chooses the visible area in a circular crop: "50% 50%" is centered.
 * Portrait zoom and frame size are in app/globals.css under EDIT STYLE 12.
 */
export const siteMedia = {
  brand: {
    src: '/adobo-logo.png',
    alt: '', // Decorative: the adjacent "adobo. ON ISLAND TIME" text names the brand.
  },
  portrait: {
    src: '/justine-portrait.jpg',
    alt: 'Justine smiling beside the ocean on a rocky shoreline',
    objectPosition: '50% 48%',
  },
};

export type StepPhoto = {
  src: string;
  alt: string;
  objectPosition: string;
  subject: string;
  author: string;
  sourceUrl?: string;
  license: string;
  licenseUrl?: string;
  reference: boolean;
};

// EDIT STEP PHOTOS — keys must match the stable IDs in lib/recipe.ts.
// One entry controls both the timeline circle and expanded step photo.
// The serve photo also appears in the food intro. Keep attribution for these files.
// For your own photos: set reference to false, name yourself as author, and update
// the license (e.g. All rights reserved); sourceUrl/licenseUrl can be omitted.
export const stepPhotos: Record<string, StepPhoto> = {
  drumsticks: {
    src: '/photos/drumsticks.jpg',
    alt: 'Raw chicken drumsticks, reference photograph',
    objectPosition: '50% 50%',
    subject: 'Raw drumsticks',
    author: 'Tamorlan / Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Muslos_de_Pollo.jpg',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    reference: true,
  },
  ginger: {
    src: '/photos/ginger.jpg',
    alt: 'Fresh ginger root, reference photograph',
    objectPosition: '50% 50%',
    subject: 'Fresh ginger',
    author: 'Tiia Monto / Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Ginger_2.jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    reference: true,
  },
  'two-shoyu': {
    src: '/photos/two-shoyu.jpg',
    alt: 'A bowl of soy sauce, reference photograph; brand unspecified',
    objectPosition: '50% 50%',
    subject: 'Soy sauce',
    author: 'Bodhi Peace / Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Bowl_of_soy_sauce.jpg',
    license: 'CC BY-SA 4.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    reference: true,
  },
  'five-minute-turns': {
    src: '/photos/five-minute-turns.jpg',
    alt: 'Chicken adobo in sauce, reference photograph',
    objectPosition: '50% 50%',
    subject: 'Chicken adobo in sauce',
    author: '\u00a9 BrokenSphere / Wikimedia Commons',
    sourceUrl:
      'https://commons.wikimedia.org/wiki/File:Homemade_chicken_adobo_2.JPG',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    reference: true,
  },
  'oyster-finish': {
    src: '/photos/oyster-finish.jpg',
    alt: 'Oyster sauce pouring into a spoon, reference photograph',
    objectPosition: '50% 50%',
    subject: 'Oyster sauce',
    author: 'Gossipguy / Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:OysterSauce2.jpg',
    license: 'CC BY-SA 3.0',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    reference: true,
  },
  serve: {
    src: '/photos/serve.jpg',
    alt: 'Finished chicken adobo, reference photograph of a different recipe',
    objectPosition: '50% 50%',
    subject: 'Finished adobo',
    author: 'dbgg1979 / Wikimedia Commons',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Chicken_adobo.jpg',
    license: 'CC BY 2.0',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/',
    reference: true,
  },
};
