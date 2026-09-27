import { useEffect, useRef, useState } from "react";
import QuantityControl from "./QuantityControl";

const ProductModal = ({ product, onClose, onAdd }) => {
  const [quantity, setQuantity] = useState(1);
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  useEffect(() => {
    if (!product) return undefined;

    setQuantity(1);
    previouslyFocusedElement.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();

      if (event.key === "Tab") {
        const focusableElements = dialogRef.current?.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements?.length) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
      previouslyFocusedElement.current?.focus?.();
    };
  }, [product, onClose]);

  if (!product) return null;

  const titleId = `product-modal-${product.code.replace(/[^a-z0-9]/gi, "-")}`;

  return (
    <div
      className="product-modal"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="product-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="product-modal__close"
          onClick={onClose}
          aria-label="Close product details"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="product-modal__image-wrap">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-modal__content">
          <span className="product-code">{product.code}</span>
          <h2 id={titleId}>{product.name}</h2>
          <p>{product.category}</p>

          <div className="product-modal__actions">
            <QuantityControl
              quantity={quantity}
              onChange={setQuantity}
              label={`quantity for ${product.name}`}
            />
            <button
              type="button"
              className="catalogue-action-button"
              onClick={() => onAdd(product, quantity)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

