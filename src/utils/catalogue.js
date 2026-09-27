export const PRODUCTS_URL = "/assets/products.json";

export const normalizeProductImage = (image) => {
  if (typeof image !== "string") return "";

  const trimmedImage = image.trim();

  if (
    trimmedImage.startsWith("http://") ||
    trimmedImage.startsWith("https://") ||
    trimmedImage.startsWith("data:") ||
    trimmedImage.startsWith("/assets/")
  ) {
    return trimmedImage;
  }

  if (trimmedImage.startsWith("/products/")) {
    return `/assets${trimmedImage}`;
  }

  if (trimmedImage.startsWith("products/")) {
    return `/assets/${trimmedImage}`;
  }

  if (trimmedImage.startsWith("assets/")) {
    return `/${trimmedImage}`;
  }

  return trimmedImage;
};

export const normalizePositiveInteger = (value, fallback = 1) => {
  const quantity = Number(value);

  if (!Number.isFinite(quantity) || quantity < 1) return fallback;

  return Math.max(1, Math.floor(quantity));
};

export const normalizeCatalogueProduct = (product) => {
  if (!product || typeof product !== "object") return null;

  const code = typeof product.code === "string" ? product.code.trim() : "";
  const name = typeof product.name === "string" ? product.name.trim() : "";
  const category =
    typeof product.category === "string" ? product.category.trim() : "";
  const image = normalizeProductImage(product.image);

  if (!code || !name || !category || !image) return null;

  return { ...product, code, name, category, image };
};

export const groupProductsByCategory = (products) =>
  products.reduce((categories, product) => {
    const categoryProducts = categories.get(product.category) || [];
    categoryProducts.push(product);
    categories.set(product.category, categoryProducts);
    return categories;
  }, new Map());

