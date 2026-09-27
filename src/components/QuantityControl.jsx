import { normalizePositiveInteger } from "../utils/catalogue";

const QuantityControl = ({ quantity, onChange, label }) => {
  const currentQuantity = normalizePositiveInteger(quantity);

  return (
    <div className="quantity-control" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(Math.max(1, currentQuantity - 1))}
        disabled={currentQuantity <= 1}
        aria-label={`Decrease ${label}`}
      >
        −
      </button>
      <output aria-live="polite" aria-label={`${label}: ${currentQuantity}`}>
        {currentQuantity}
      </output>
      <button
        type="button"
        onClick={() => onChange(currentQuantity + 1)}
        aria-label={`Increase ${label}`}
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;

