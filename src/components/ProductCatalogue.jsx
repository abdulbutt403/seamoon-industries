import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import SectionEyebrow from "./SectionEyebrow";
import {
  categoryToSlug,
  groupProductsByCategory,
  normalizeCatalogueProduct,
  PRODUCTS_URL,
} from "../utils/catalogue";
import ProductModal from "./ProductModal";
import { useI18n } from "../i18n/I18nContext";

const categoryKey = (category) => `category.${category.toLowerCase().replace(/\(([^)]*)\)/g, " $1").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;

const ProductCatalogue = () => {
  const { categorySlug } = useParams();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loadState, setLoadState] = useState("loading");
  const [announcement, setAnnouncement] = useState("");
  const { addItem } = useCart();
  const { t, formatNumber } = useI18n();
  const translateCategory = (category) => t(categoryKey(category));
  const translateProductName = (product) => {
    const key = `product.${product.code}.name`;
    const translated = t(key);
    if (translated !== key) return translated;
    const figure = /^Figure (.+)$/.exec(product.name);
    return figure ? `${t("catalogue.figure")} ${figure[1]}` : product.name;
  };

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
      t("catalogue.added").replace("{count}", formatNumber(quantity)).replace("{items}", t(quantity === 1 ? "catalogue.item" : "catalogue.items")).replace("{code}", product.code)
    );
    setSelectedProduct(null);
  };

  return (
    <section className="product-catalogue" aria-labelledby="product-catalogue-title">
      <div className="catalogue-list__heading">
        <SectionEyebrow>{categorySlug ? t("catalogue.dentalProducts") : t("catalogue.products")}</SectionEyebrow>
        <h2 id="product-catalogue-title">
          {selectedCategory
            ? translateCategory(selectedCategory[0])
            : categorySlug
              ? t("catalogue.categoryNotFound")
              : t("catalogue.browseCategories")}
        </h2>
        <p>
          {categorySlug
            ? t("catalogue.selectInstrument")
            : t("catalogue.chooseCategory")}
        </p>
      </div>

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>

      {loadState === "loading" && (
        <div className="catalogue-status" role="status">
          {t("catalogue.loading")}
        </div>
      )}

      {loadState === "error" && (
        <div className="catalogue-status catalogue-status--error" role="alert">
          {t("catalogue.failed")}
        </div>
      )}

      {loadState === "success" && products.length === 0 && (
        <div className="catalogue-status">{t("catalogue.none")}</div>
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
                    {formatNumber(categoryProducts.length)} {t(categoryProducts.length === 1 ? "catalogue.product" : "catalogue.productsPlural")}
                  </span>
                  <h3>{translateCategory(category)}</h3>
                  <span className="category-card__action">{t("catalogue.exploreCategory")} <span aria-hidden="true">→</span></span>
                </span>
              </Link>
            </article>
          ))}
        </div>
      )}

      {loadState === "success" && categorySlug && !selectedCategory && (
        <div className="catalogue-status catalogue-status--error">
          <p>{t("catalogue.missingCategory")}</p>
          <Link className="catalogue-back-link" to="/dental-instruments">
            {t("catalogue.allDentalCategories")}
          </Link>
        </div>
      )}

      {loadState === "success" && selectedCategory && (
        <section className="product-category" aria-label={translateCategory(selectedCategory[0])}>
          <div className="product-category__heading">
            <Link className="catalogue-back-link" to="/dental-instruments">
              <span aria-hidden="true">←</span> {t("catalogue.allCategories")}
            </Link>
            <span>{formatNumber(selectedCategory[1].length)} {t("catalogue.productsPlural")}</span>
          </div>

          <div className="product-grid">
            {selectedCategory[1].map((product) => (
              <article className="product-card" key={product.code}>
                <button
                  type="button"
                  className="product-card__button"
                  onClick={() => setSelectedProduct(product)}
                  aria-label={`${t("catalogue.viewAdd")} ${product.code}, ${translateProductName(product)}`}
                >
                  <span className="product-card__image-wrap">
                    <img src={product.image} alt={translateProductName(product)} loading="lazy" />
                  </span>
                  <span className="product-card__content">
                    <span className="product-code">{product.code}</span>
                    <span className="product-card__name">{translateProductName(product)}</span>
                    <span className="product-card__action">{t("catalogue.viewAdd")}</span>
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
        translateCategory={translateCategory}
        translateProductName={translateProductName}
      />
    </section>
  );
};

export default ProductCatalogue;

