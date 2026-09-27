import { useCallback, useEffect, useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import {
  groupProductsByCategory,
  normalizeCatalogueProduct,
  PRODUCTS_URL,
} from "../utils/catalogue";
import ProductModal from "./ProductModal";

const ProductCatalogue = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loadState, setLoadState] = useState("loading");
  const [announcement, setAnnouncement] = useState("");
  const { addItem } = useCart();

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      setLoadState("loading");

      try {
        const response = await fetch(PRODUCTS_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Product request failed with ${response.status}`);
        }

        const productData = await response.json();
        if (!Array.isArray(productData)) {
          throw new Error("Product catalogue must be an array");
        }

        const validProducts = productData
          .map(normalizeCatalogueProduct)
          .filter(Boolean);

        setProducts(validProducts);
        setLoadState("success");
      } catch (error) {
        if (error.name !== "AbortError") setLoadState("error");
      }
    };

    loadProducts();
    return () => controller.abort();
  }, []);

  const categories = useMemo(
    () => groupProductsByCategory(products),
    [products]
  );

  const closeModal = useCallback(() => setSelectedProduct(null), []);

  const addToCart = (product, quantity) => {
    addItem(product, quantity);
    setAnnouncement(
      `${quantity} ${quantity === 1 ? "item" : "items"} of ${product.code} added to your inquiry cart.`
    );
    setSelectedProduct(null);
  };

  return (
    <section className="product-catalogue" aria-labelledby="product-catalogue-title">
      <div className="catalogue-list__heading">
        <span>Product catalogue</span>
        <h2 id="product-catalogue-title">Browse Our Dental Instruments</h2>
        <p>
          Select an instrument to review it and add the required quantity to
          your inquiry cart.
        </p>
      </div>

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>

      {loadState === "loading" && (
        <div className="catalogue-status" role="status">
          Loading products…
        </div>
      )}

      {loadState === "error" && (
        <div className="catalogue-status catalogue-status--error" role="alert">
          The product catalogue could not be loaded. Please refresh the page
          or try again shortly.
        </div>
      )}

      {loadState === "success" && products.length === 0 && (
        <div className="catalogue-status">No products are currently available.</div>
      )}

      {Array.from(categories.entries()).map(([category, categoryProducts]) => {
        const categoryId = `category-${category.replace(/[^a-z0-9]/gi, "-").toLowerCase()}`;

        return (
          <section
            className="product-category"
            aria-labelledby={categoryId}
            key={category}
          >
            <div className="product-category__heading">
              <h3 id={categoryId}>{category}</h3>
              <span>{categoryProducts.length} products</span>
            </div>

            <div className="product-grid">
              {categoryProducts.map((product) => (
                <article className="product-card" key={product.code}>
                  <button
                    type="button"
                    className="product-card__button"
                    onClick={() => setSelectedProduct(product)}
                    aria-label={`View ${product.code}, ${product.name}`}
                  >
                    <span className="product-card__image-wrap">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                      />
                    </span>
                    <span className="product-card__content">
                      <span className="product-code">{product.code}</span>
                      <span className="product-card__name">{product.name}</span>
                      <span className="product-card__action">View / Add</span>
                    </span>
                  </button>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      <ProductModal
        product={selectedProduct}
        onClose={closeModal}
        onAdd={addToCart}
      />
    </section>
  );
};

export default ProductCatalogue;

