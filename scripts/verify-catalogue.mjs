import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { createServer } from "vite";

const projectRoot = process.cwd();
const productsPath = path.join(projectRoot, "public", "assets", "products.json");
const products = JSON.parse(await readFile(productsPath, "utf8"));

if (!Array.isArray(products) || products.length === 0) {
  throw new Error("products.json must contain at least one product.");
}

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const catalogue = await server.ssrLoadModule("/src/utils/catalogue.js");
  const cart = await server.ssrLoadModule("/src/context/CartContext.jsx");
  const inquiry = await server.ssrLoadModule("/src/utils/inquiry.js");
  const normalizedProducts = [];

  for (const sourceProduct of products) {
    const product = catalogue.normalizeCatalogueProduct(sourceProduct);
    if (!product) throw new Error(`Invalid product: ${sourceProduct.code || "unknown"}`);
    normalizedProducts.push(product);

    const publicPath = path.join(
      projectRoot,
      "public",
      product.image.replace(/^\//, "")
    );
    await access(publicPath);
  }

  if (
    catalogue.normalizePositiveInteger(0) !== 1 ||
    catalogue.normalizePositiveInteger(2.9) !== 2
  ) {
    throw new Error("Positive-integer quantity normalization failed.");
  }

  const mergedItems = cart.sanitizeCart([
    {
      code: normalizedProducts[0].code,
      name: normalizedProducts[0].name,
      image: normalizedProducts[0].image,
      quantity: 2,
    },
    {
      code: normalizedProducts[0].code,
      name: normalizedProducts[0].name,
      image: normalizedProducts[0].image,
      quantity: 3,
    },
    { broken: true },
  ]);

  if (mergedItems.length !== 1 || mergedItems[0].quantity !== 5) {
    throw new Error("Duplicate cart merging or invalid-item filtering failed.");
  }

  const secondItem = {
    code: normalizedProducts[1].code,
    name: normalizedProducts[1].name,
    image: normalizedProducts[1].image,
    quantity: 4,
  };
  const emailProducts = inquiry.formatInquiryProducts([
    ...mergedItems,
    secondItem,
  ]);

  for (const item of [...mergedItems, secondItem]) {
    if (
      !emailProducts.includes(item.code) ||
      !emailProducts.includes(item.name) ||
      !emailProducts.includes(`Quantity: ${item.quantity}`)
    ) {
      throw new Error(`Inquiry output is missing ${item.code}.`);
    }
  }

  console.log(
    `Verified ${products.length} products and images, quantity safety, duplicate cart merging, invalid-item handling, and complete inquiry formatting.`
  );
} finally {
  await server.close();
}

