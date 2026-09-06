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
    alt: '', // Decorative: the adjacent "adobo. FILIPINO LOCAL STYLE" names the brand.
  },
  portrait: {
    src: '/justine-portrait.jpg',
    alt: 'Justine smiling beside the ocean on a rocky shoreline',
    objectPosition: '50% 48%',
  },
};

export type PhotoAsset = {
  src: string;
  alt: string;
  objectPosition: string;
  fit?: 'cover' | 'contain';
};

export type StepPhoto = PhotoAsset & {
  companion?: PhotoAsset; // Optional second bottle in the same milestone.
  supplied?: boolean; // Supplied by Justine; does not imply photographer ownership.
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
    src: '/photos/chicken-prep.jpg',
    alt: 'Raw chicken pieces on a wooden cutting board',
    objectPosition: '50% 50%',
    subject: 'Chicken prep',
    author: 'Image supplied by Justine',
    license: 'Original source credit not provided',
    supplied: true,
    reference: true,
  },
  ginger: {
    src: '/photos/fresh-ginger.jpg',
    alt: 'Fresh ginger root on a pale stone surface',
    objectPosition: '50% 50%',
    subject: 'Fresh ginger',
    author: 'Image supplied by Justine',
    license: 'Original source credit not provided',
    supplied: true,
    reference: true,
  },
  'two-shoyu': {
    src: '/photos/aloha-shoyu.jpg',
    alt: 'Aloha Original Blend Soy Sauce bottle',
    objectPosition: '50% 50%',
    // Both bottles render side by side; these are separate original photo files.
    companion: {
      src: '/photos/silver-swan.webp',
      alt: 'Silver Swan Special Soy Sauce bottle',
      objectPosition: '50% 50%',
    },
    subject: 'Aloha Original + Silver Swan Special',
    author: 'Images supplied by Justine',
    license: 'Original source credits not provided',
    supplied: true,
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
    src: '/photos/shirakiku-oyster.webp',
    alt: 'Shirakiku Oyster Flavored Sauce bottle',
    objectPosition: '50% 50%',
    fit: 'contain',
    subject: 'Shirakiku oyster sauce',
    author: 'Image supplied by Justine',
    license: 'Original source credit not provided',
    supplied: true,
    reference: true,
  },
  // Justine's actual finished batch, converted from IMG_7341.HEIC for the web.
  serve: {
    src: '/photos/justine-finished-adobo.jpg',
    alt: 'Justine’s finished chicken adobo in a black pan with a serving spoon',
    objectPosition: '50% 58%',
    subject: 'My finished chicken adobo',
    author: 'Justine Afaga',
    license: 'All rights reserved',
    supplied: true,
    reference: false,
  },
};
