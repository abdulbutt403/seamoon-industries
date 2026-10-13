import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import QuantityControl from "../components/QuantityControl";
import SEO from "../components/SEO";
import SectionEyebrow from "../components/SectionEyebrow";
import { useCart } from "../context/CartContext";
import styles from "../style";
import { formatInquiryProducts } from "../utils/inquiry";
import { useI18n } from "../i18n/I18nContext";

const EMAILJS_SERVICE_ID = "service_8ensi6d";
const EMAILJS_TEMPLATE_ID = "template_amuimg8";
const EMAILJS_PUBLIC_KEY = "fJLRfqjjUtF0NCowJ";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const CartPage = () => {
  const { t, formatNumber } = useI18n();
  const itemName = (item) => {
    const key = `product.${item.code}.name`;
    const translated = t(key);
    if (translated !== key) return translated;
    const figure = /^Figure (.+)$/.exec(item.name || "");
    return figure ? `${t("catalogue.figure")} ${figure[1]}` : item.name || item.code;
  };
  const {
    items,
    isReady,
    setItemQuantity,
    removeItem,
    clearCart,
  } = useCart();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submission, setSubmission] = useState({ status: "idle", messageKey: "" });
  const submissionLock = useRef(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: "" }));
    if (submission.status !== "idle") {
      setSubmission({ status: "idle", messageKey: "" });
    }
  };

  const submitInquiry = async (event) => {
    event.preventDefault();
    if (submissionLock.current) return;

    const nextErrors = {};
    const customerName = form.name.trim();
    const customerEmail = form.email.trim();

    if (!customerName) nextErrors.name = "cart.error.nameRequired";
    if (!customerEmail) {
      nextErrors.email = "cart.error.emailRequired";
    } else if (!isValidEmail(customerEmail)) {
      nextErrors.email = "cart.error.emailInvalid";
    }
    if (items.length === 0) {
      nextErrors.cart = "cart.error.emptyCart";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSubmission({ status: "error", messageKey: "cart.error.correctFields" });
      return;
    }

    submissionLock.current = true;
    setSubmission({ status: "loading", messageKey: "cart.sending" });

    const templateVariables = {
      customer_name: customerName,
      customer_email: customerEmail,
      customer_message: form.message.trim(),
      products: formatInquiryProducts(items),
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateVariables,
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      clearCart();
      setForm({ name: "", email: "", message: "" });
      setErrors({});
      setSubmission({
        status: "success",
        messageKey: "cart.success",
      });
    } catch {
      setSubmission({
        status: "error",
        messageKey: "cart.error.sendFailed",
      });
    } finally {
      submissionLock.current = false;
    }
  };

  const isSending = submission.status === "loading";

  return (
    <>
      <SEO path="/cart" />
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={styles.boxWidth}>
          <header className="page-hero cart-page__hero">
            <SectionEyebrow>{t("cart.eyebrow")}</SectionEyebrow>
            <h1>{t("cart.title")}</h1>
            <p>
              {t("cart.description")}
            </p>
          </header>

          {submission.messageKey && (
            <div
              className={`inquiry-notice inquiry-notice--${submission.status}`}
              role={submission.status === "error" ? "alert" : "status"}
            >
              {t(submission.messageKey)}
            </div>
          )}

          {!isReady ? (
            <div className="cart-empty" role="status">
              {t("cart.loading")}
            </div>
          ) : items.length === 0 ? (
            <section className="cart-empty" aria-labelledby="empty-cart-title">
              <h2 id="empty-cart-title">
                {t(submission.status === "success" ? "cart.emptyAfterSuccess" : "cart.empty")}
              </h2>
              <p>{t("cart.addToBegin")}</p>
              <Link to="/dental-instruments" className="catalogue-action-button">
                {t("cart.browseDental")}
              </Link>
            </section>
          ) : (
            <div className="cart-layout">
              <section className="cart-products" aria-labelledby="cart-products-title">
                <div className="cart-section-heading">
                  <h2 id="cart-products-title">{t("cart.selectedProducts")}</h2>
                  <span>{formatNumber(items.length)} {t("cart.productTypes")}</span>
                </div>

                <div className="cart-items">
                  {items.map((item) => (
                    <article className="cart-item" key={item.code}>
                      <div className="cart-item__image-wrap">
                        <img src={item.image} alt={itemName(item)} />
                      </div>
                      <div className="cart-item__content">
                        <span className="product-code">{item.code}</span>
                        <h3>{itemName(item)}</h3>
                        <div className="cart-item__actions">
                          <QuantityControl
                            quantity={item.quantity}
                            onChange={(quantity) =>
                              setItemQuantity(item.code, quantity)
                            }
                            label={t("common.quantityFor").replace("{name}", itemName(item))}
                          />
                          <button
                            type="button"
                            className="cart-remove-button"
                            onClick={() => removeItem(item.code)}
                            aria-label={`${t("common.remove")} ${item.code}, ${itemName(item)}`}
                          >
                            {t("common.remove")}
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="inquiry-panel" aria-labelledby="inquiry-form-title">
                <h2 id="inquiry-form-title">{t("cart.sendInquiry")}</h2>
                <p>
                  This form sends a product inquiry only. No payment is
                  collected.
                </p>

                {errors.cart && <p className="form-error">{t(errors.cart)}</p>}

                <form className="inquiry-form" onSubmit={submitInquiry} noValidate>
                  <div className="inquiry-field">
                    <label htmlFor="inquiry-name">{t("form.name")}</label>
                    <input
                      id="inquiry-name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={updateField}
                      autoComplete="name"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "inquiry-name-error" : undefined}
                    />
                    {errors.name && (
                      <span id="inquiry-name-error" className="form-error">
                        {t(errors.name)}
                      </span>
                    )}
                  </div>

                  <div className="inquiry-field">
                    <label htmlFor="inquiry-email">{t("form.email")}</label>
                    <input
                      id="inquiry-email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={updateField}
                      autoComplete="email"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "inquiry-email-error" : undefined}
                    />
                    {errors.email && (
                      <span id="inquiry-email-error" className="form-error">
                        {t(errors.email)}
                      </span>
                    )}
                  </div>

                  <div className="inquiry-field">
                    <label htmlFor="inquiry-message">
                      {t("form.additionalRequirements")}
                    </label>
                    <textarea
                      id="inquiry-message"
                      name="message"
                      rows="5"
                      value={form.message}
                      onChange={updateField}
                    />
                  </div>

                  <button
                    type="submit"
                    className="catalogue-action-button inquiry-submit"
                    disabled={isSending}
                  >
                    {t(isSending ? "cart.sendingButton" : "cart.sendInquiry")}
                  </button>
                </form>
              </section>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;

