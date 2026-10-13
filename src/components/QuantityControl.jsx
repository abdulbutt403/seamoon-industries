import { normalizePositiveInteger } from "../utils/catalogue";
import { useI18n } from "../i18n/I18nContext";

const QuantityControl = ({ quantity, onChange, label }) => {
  const currentQuantity = normalizePositiveInteger(quantity);
  const { t, formatNumber } = useI18n();

  return (
    <div className="quantity-control" aria-label={label}>
      <button
        type="button"
        onClick={() => onChange(Math.max(1, currentQuantity - 1))}
        disabled={currentQuantity <= 1}
        aria-label={`${t("quantity.decrease")} ${label}`}
      >
        âˆ’
      </button>
      <output aria-live="polite" aria-label={`${label}: ${formatNumber(currentQuantity)}`}>
        {formatNumber(currentQuantity)}
      </output>
      <button
        type="button"
        onClick={() => onChange(currentQuantity + 1)}
        aria-label={`${t("quantity.increase")} ${label}`}
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;

