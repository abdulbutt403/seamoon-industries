import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import {
  categoryToSlug,
  groupProductsByCategory,
  normalizeCatalogueProduct,
  PRODUCTS_URL,
} from "../utils/catalogue";
import ProductModal from "./ProductModal";

const ProductCatalogue = () => {
  const { categorySlug } = useParams();
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

  const selectedCategory = useMemo(
    () =>
      Array.from(categories.entries()).find(
        ([category]) => categoryToSlug(category) === categorySlug
      ),
    [categories, categorySlug]
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
        <span>{categorySlug ? "Dental products" : "Product catalogue"}</span>
        <h2 id="product-catalogue-title">
          {selectedCategory
            ? selectedCategory[0]
            : categorySlug
              ? "Category Not Found"
              : "Browse by Category"}
        </h2>
        <p>
          {categorySlug
            ? "Select an instrument to review it and add the required quantity to your inquiry cart."
            : "Choose a category to explore the instruments available in that range."}
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

      {loadState === "success" && !categorySlug && (
        <div className="category-grid">
          {Array.from(categories.entries()).map(([category, categoryProducts]) => (
            <article className="category-card" key={category}>
              <Link
                className="category-card__link"
                to={`/dental-instruments/${categoryToSlug(category)}`}
              >
                <span className="category-card__image-wrap">
                  <img
                    src={categoryProducts[0].image}
                    alt=""
                    loading="lazy"
                  />
                </span>
                <span className="category-card__content">
                  <span className="category-card__count">
                    {categoryProducts.length} {categoryProducts.length === 1 ? "product" : "products"}
                  </span>
                  <h3>{category}</h3>
                  <span className="category-card__action">Explore category <span aria-hidden="true">→</span></span>
                </span>
              </Link>
            </article>
          ))}
        </div>
      )}

      {loadState === "success" && categorySlug && !selectedCategory && (
        <div className="catalogue-status catalogue-status--error">
          <p>This dental category could not be found.</p>
          <Link className="catalogue-back-link" to="/dental-instruments">
            View all dental categories
          </Link>
        </div>
      )}

      {loadState === "success" && selectedCategory && (
        <section className="product-category" aria-label={selectedCategory[0]}>
          <div className="product-category__heading">
            <Link className="catalogue-back-link" to="/dental-instruments">
              <span aria-hidden="true">←</span> All categories
            </Link>
            <span>{selectedCategory[1].length} products</span>
          </div>

          <div className="product-grid">
            {selectedCategory[1].map((product) => (
              <article className="product-card" key={product.code}>
                <button
                  type="button"
                  className="product-card__button"
                  onClick={() => setSelectedProduct(product)}
                  aria-label={`View ${product.code}, ${product.name}`}
                >
                  <span className="product-card__image-wrap">
                    <img src={product.image} alt={product.name} loading="lazy" />
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
      )}

      <ProductModal
        product={selectedProduct}
        onClose={closeModal}
        onAdd={addToCart}
      />
    </section>
  );
};

export default ProductCatalogue;

