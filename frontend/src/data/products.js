const plantNames = [
  ['Snake Plant', 'Indoor Plants'],
  ['Golden Pothos', 'Indoor Plants'],
  ['Monstera Deliciosa', 'Indoor Plants'],
  ['Peace Lily', 'Indoor Plants'],
  ['ZZ Plant', 'Indoor Plants'],

  ['Jade Plant', 'Succulents'],
  ['Aloe Vera', 'Succulents'],
  ['Echeveria', 'Succulents'],
  ['Haworthia', 'Succulents'],
  ['String of Pearls', 'Succulents'],

  ['Anthurium', 'Flowering Plants'],
  ['African Violet', 'Flowering Plants'],
  ['Orchid', 'Flowering Plants'],
  ['Kalanchoe', 'Flowering Plants'],
  ['Begonia', 'Flowering Plants'],

  ['Spider Plant', 'Air-Purifying Plants'],
  ['Areca Palm', 'Air-Purifying Plants'],
  ['Rubber Plant', 'Air-Purifying Plants'],
  ['Dracaena', 'Air-Purifying Plants'],
  ['Boston Fern', 'Air-Purifying Plants']
];

const seeds = [
  'Basil Seeds',
  'Coriander Seeds',
  'Mint Seeds',
  'Tomato Seeds',
  'Chili Seeds',
  'Sunflower Seeds',
  'Marigold Seeds',
  'Petunia Seeds',
  'Cucumber Seeds',
  'Spinach Seeds'
];

const pots = [
  'Terracotta Pot',
  'White Ceramic Pot',
  'Black Ceramic Pot',
  'Ribbed Cement Pot',
  'Minimal Concrete Pot',
  'Hanging Pot',
  'Self-Watering Pot',
  'Bamboo Pot',
  'Glazed Clay Pot',
  'Round Nursery Pot'
];

const planters = [
  'Tall Floor Planter',
  'White Cylinder Planter',
  'Rattan Planter',
  'Macrame Planter',
  'Modern Stone Planter',
  'Wooden Planter Box',
  'Hanging Basket Planter',
  'Geometric Planter',
  'Matte Green Planter',
  'Large Balcony Planter'
];


/* =========================================================
   IMAGE HELPERS
========================================================= */

const wiki = (file) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}`;


/*
   IMPORTANT:
   Your previous img() function returned the SAME image
   regardless of the query.

   This function now gives different Unsplash images
   for different purposes.
*/

const img = (query, id) => {
  const images = {

    plants:
      'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?auto=format&fit=crop&w=900&q=85',

    watering:
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=85',

    indoor:
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=900&q=85',

    pots:
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=85',

    care:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=85'
  };

  if (query.includes('watering')) {
    return images.watering;
  }

  if (
    query.includes('pot') ||
    query.includes('ceramic')
  ) {
    return images.pots;
  }

  if (
    query.includes('care') ||
    query.includes('houseplant')
  ) {
    return images.care;
  }

  if (query.includes('indoor')) {
    return images.indoor;
  }

  return images.plants;
};


/* =========================================================
   SEED IMAGES
========================================================= */

/*
   These are SEED photos, not mature plant photos.

   Wikimedia Commons has verified seed photographs for
   several of these products.
*/

const seedImages = [

  // Basil
  'https://commons.wikimedia.org/wiki/Special:FilePath/Basil%20seeds.jpg',

  // Coriander
  'https://commons.wikimedia.org/wiki/Special:FilePath/Coriander%20Seeds.jpg',

  // Mint
  'https://commons.wikimedia.org/wiki/Special:FilePath/Mint%20seeds.jpg',

  // Tomato
  'https://commons.wikimedia.org/wiki/Special:FilePath/Tomato%20seeds.jpg',

  // Chili
  'https://commons.wikimedia.org/wiki/Special:FilePath/Chili%20pepper%20seeds.jpg',

  // Sunflower
  'https://commons.wikimedia.org/wiki/Special:FilePath/Sunflower%20seeds.jpg',

  // Marigold
  'https://commons.wikimedia.org/wiki/Special:FilePath/Marigold%20seeds.jpg',

  // Petunia
  'https://commons.wikimedia.org/wiki/Special:FilePath/Petunia%20seeds.jpg',

  // Cucumber
  'https://commons.wikimedia.org/wiki/Special:FilePath/Cucumber%20seeds.jpg',

  // Spinach
  'https://commons.wikimedia.org/wiki/Special:FilePath/Spinach%20seeds.jpg'
];


/* =========================================================
   POT IMAGES
========================================================= */

const potFiles = [
  'Plant pot*image.jpg',
  'Plant pot*.jpg',
  'Flower pot*.jpg',
  'Flower pot* pink.jpg',
  'Flower pot plastic.jpg',
  'Plant Pot - চെടിച്ചട്ടി 01.jpg',
  'BLW Plant Pot.jpg',
  'Plant pot (51794465560).jpg',
  'Flower Pot MET DP250018.jpg',
  'Flower Pot MET DP251432.jpg'
];


/* =========================================================
   PLANTER IMAGES
========================================================= */

const planterFiles = [
  'Flower Pot MET DP251433.jpg',
  'Flower Pot MET DP250017.jpg',
  'Flower Pot MET 148993.jpg',
  'Flower pot in Pyongyang.jpg',
  'Flower Pot,22 Nov 2025.jpg',
  'Plant pot and bowl by Lucie Rie, V&A London.jpg',
  'Plant pot (51794465560).jpg',
  'Plant pot*.jpg',
  'Flower pot plastic.jpg',
  'Plant pot*image.jpg'
];


const commonsImg = (file) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}`;


/* =========================================================
   PLANT IMAGES
========================================================= */

const plantImageFiles = [

  'Sansevieria trifasciata.jpg',

  'Epipremnum aureum.jpg',

  'Monstera deliciosa.jpg',

  'Spathiphyllum wallisii.jpg',

  'Zamioculcas zamiifolia.jpg',

  'Crassula ovata.jpg',

  'Aloe vera.jpg',

  'Echeveria elegans.jpg',

  'Haworthia cooperi.jpg',

  'Senecio rowleyanus.jpg',

  'Anthurium andraeanum.jpg',

  'Saintpaulia ionantha.jpg',

  'Phalaenopsis orchid.jpg',

  'Kalanchoe blossfeldiana.jpg',

  'Begonia.jpg',

  'Chlorophytum comosum.jpg',

  'Dypsis lutescens.jpg',

  'Ficus elastica.jpg',

  'Dracaena marginata.jpg',

  'Nephrolepis exaltata.jpg'
];


/* =========================================================
   PLANT CARE
========================================================= */

const care = {

  light:
    'Place in bright, indirect light unless the plant naturally prefers lower light. Avoid sudden harsh midday sun because it can scorch tender leaves.',

  watering:
    'Check the soil before watering and water thoroughly when the top layer is dry. Always let excess water drain and never leave the pot sitting in water.',

  soil:
    'Use a loose, airy and well-draining potting mix suited to the plant type. A container with drainage holes helps prevent root problems.',

  temperature:
    'Keep the plant in a stable warm environment away from cold drafts, heaters and strong air-conditioning. Moderate humidity is helpful for tropical plants.',

  fertilizer:
    'Feed with a balanced diluted fertilizer during active growth. Avoid heavy feeding when the plant is stressed, newly repotted or dormant.',

  repotting:
    'Repot when roots become crowded or water runs through the pot unusually quickly. Choose a container only slightly larger than the current one.',

  pests:
    'Inspect leaves and stems regularly for mites, scale, mealybugs or other pests. Isolate affected plants and use a plant-safe treatment according to its label.'
};


/* =========================================================
   PLANT CARE GENERATOR
========================================================= */

const plantCare = (name) => ({

  light: care.light,

  watering: care.watering,

  soil: care.soil,

  temperature: care.temperature,

  fertilizer: care.fertilizer,

  repotting: care.repotting,

  pests: care.pests,

  summary:
    `${name} needs consistent care rather than constant attention. ` +
    `Give it the light level described above and rotate the pot occasionally ` +
    `so growth stays even. Check the soil with your finger before every watering ` +
    `instead of following a fixed calendar. Good drainage is essential because ` +
    `constantly wet roots can cause serious problems. Wipe dusty leaves gently ` +
    `so the plant can photosynthesize efficiently. Feed lightly during active ` +
    `growth and reduce feeding when growth slows. Watch for yellowing, drooping, ` +
    `pests or sudden leaf changes and adjust one care factor at a time.`
});


/* =========================================================
   PRODUCTS
========================================================= */

export const PRODUCTS = [

  /* =========================
     PLANTS
  ========================= */

  ...plantNames.map(([name, sub], i) => ({

    id: `plant${i + 1}`,

    type: 'plant',

    name,

    category: 'Plants',

    subcategory: sub,

    price: 450 + i * 35,

    oldPrice: 600 + i * 45,

    image: wiki(plantImageFiles[i]),

    description:
      `A healthy ${name} for homes, offices and plant lovers in Bangladesh.`,

    care: plantCare(name)

  })),


  /* =========================
     SEEDS
  ========================= */

  ...seeds.map((name, i) => ({

    id: `seed${i + 1}`,

    type: 'seed',

    name,

    category: 'Seeds',

    price: 80 + i * 15,

    oldPrice: 110 + i * 20,

    /*
       IMPORTANT:
       Use seedImages instead of img().
       This prevents all seeds from showing
       the same plant photograph.
    */

    image: seedImages[i],

    description:
      `Fresh ${name.toLowerCase()} for your home garden.`

  })),


  /* =========================
     POTS
  ========================= */

  ...pots.map((name, i) => ({

    id: `pot${i + 1}`,

    type: 'pot',

    name,

    category: 'Pots & Planters',

    subcategory: 'Pots',

    price: 250 + i * 30,

    oldPrice: 320 + i * 35,

    image: commonsImg(potFiles[i]),

    description:
      `A practical ${name.toLowerCase()} for indoor and balcony plants.`

  })),


  /* =========================
     PLANTERS
  ========================= */

  ...planters.map((name, i) => ({

    id: `planter${i + 1}`,

    type: 'planter',

    name,

    category: 'Pots & Planters',

    subcategory: 'Planters',

    price: 450 + i * 45,

    oldPrice: 550 + i * 55,

    image: commonsImg(planterFiles[i]),

    description:
      `A stylish ${name.toLowerCase()} designed to complement your plants.`

  }))

];


/* =========================================================
   PLANT SUBCATEGORIES
========================================================= */

export const PLANT_SUBCATEGORIES = [
  'All Plants',
  'Indoor Plants',
  'Succulents',
  'Flowering Plants',
  'Air-Purifying Plants'
];


/* =========================================================
   BLOGS
========================================================= */

export const BLOGS = [

  {
    id: 'b1',

    title:
      'How Often Should You Water Indoor Plants?',

    text:
      'A simple soil-first watering routine that helps prevent both dry roots and overwatering.',

    image:
      img('watering-houseplant', 501)
  },

  {
    id: 'b2',

    title:
      '5 Easy Plants for Beginners',

    text:
      'Low-fuss plants that are forgiving and perfect for your first indoor collection.',

    image:
      img('indoor-houseplants', 502)
  },

  {
    id: 'b3',

    title:
      'How to Choose the Right Pot',

    text:
      'Drainage, size and material all matter when choosing a healthy home for your plant.',

    image:
      img('ceramic-flower-pots', 503)
  },

  {
    id: 'b4',

    title:
      'Common Plant-Care Mistakes',

    text:
      'Avoid the most common mistakes with light, water, soil and feeding.',

    image:
      img('plant-care-houseplant', 504)
  }

];