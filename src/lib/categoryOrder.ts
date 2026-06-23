export const CATEGORY_ORDER = [
  'Antique',
  'Silverware',
  'Crystalware',
  'Glassware',
  'Figurine',
  'Dinnerware',
  'China-Czec',
  'China-Mikasa',
  'China-Johnson',
  'China-Hugh',
  'China-Other',
  'Painting',
  'Electronic',
  'Housewares',
  'Appliances',
  'Furniture-items',
];

/**
 * Sort an array of category strings by the defined order.
 * Categories not in the list are appended alphabetically at the end.
 */
export function sortCategories(categories: string[]): string[] {
  return [...categories].sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a);
    const bi = CATEGORY_ORDER.indexOf(b);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return a.localeCompare(b);
  });
}

/** Extract and sort unique categories from a product list. */
export function getSortedCategories(products: { category: string }[]): string[] {
  return sortCategories(Array.from(new Set(products.map(p => p.category))));
}

/**
 * Sort products by their ID using natural order.
 * Splits IDs like "A38", "P2" into letter prefix + number,
 * sorts by prefix first then numerically by the number.
 */
export function sortProductsById<T extends { id: string }>(products: T[]): T[] {
  return [...products].sort((a, b) => {
    const parse = (id: string) => {
      const m = id.match(/^([A-Za-z\-]*)(\d+)(.*)$/);
      return m ? { prefix: m[1].toUpperCase(), num: parseInt(m[2], 10), suffix: m[3] } : null;
    };
    const pa = parse(a.id);
    const pb = parse(b.id);
    if (!pa || !pb) return a.id.localeCompare(b.id);
    if (pa.prefix !== pb.prefix) return pa.prefix.localeCompare(pb.prefix);
    return pa.num - pb.num;
  });
}
