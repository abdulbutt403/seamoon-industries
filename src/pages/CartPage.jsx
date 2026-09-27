import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import QuantityControl from "../components/QuantityControl";
import SEO from "../components/SEO";
import { useCart } from "../context/CartContext";
import styles from "../style";
import { formatInquiryProducts } from "../utils/inquiry";

const EMAILJS_SERVICE_ID = "service_8ensi6d";
const EMAILJS_TEMPLATE_ID = "template_amuimg8";
const EMAILJS_PUBLIC_KEY = "fJLRfqjjUtF0NCowJ";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const CartPage = () => {
  const {
    items,
    isReady,
    setItemQuantity,
    removeItem,
    clearCart,
  } = useCart();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submission, setSubmission] = useState({ status: "idle", message: "" });
  const submissionLock = useRef(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
    setErrors((currentErrors) => ({ ...currentErrors, [name]: "" }));
    if (submission.status !== "idle") {
      setSubmission({ status: "idle", message: "" });
    }
  };

  const submitInquiry = async (event) => {
    event.preventDefault();
    if (submissionLock.current) return;

    const nextErrors = {};
    const customerName = form.name.trim();
    const customerEmail = form.email.trim();

    if (!customerName) nextErrors.name = "Please enter your name.";
    if (!customerEmail) {
      nextErrors.email = "Please enter your email address.";
    } else if (!isValidEmail(customerEmail)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (items.length === 0) {
      nextErrors.cart = "Add at least one product before sending an inquiry.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSubmission({ status: "error", message: "Please correct the highlighted fields." });
      return;
    }

    submissionLock.current = true;
    setSubmission({ status: "loading", message: "Sending your inquiry…" });

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
        message: "Your product inquiry was sent successfully. We will contact you shortly.",
      });
    } catch {
      setSubmission({
        status: "error",
        message: "We could not send your inquiry. Your cart has been kept so you can try again.",
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
            <span>Product inquiry</span>
            <h1>Your Inquiry Cart</h1>
            <p>
              Review the instruments and quantities below, then send your
              requirements directly to the Seamoon Industries team.
            </p>
          </header>

          {submission.message && (
            <div
              className={`inquiry-notice inquiry-notice--${submission.status}`}
              role={submission.status === "error" ? "alert" : "status"}
            >
              {submission.message}
            </div>
          )}

          {!isReady ? (
            <div className="cart-empty" role="status">
              Loading your inquiry cart…
            </div>
          ) : items.length === 0 ? (
            <section className="cart-empty" aria-labelledby="empty-cart-title">
              <h2 id="empty-cart-title">
                {submission.status === "success"
                  ? "Your inquiry cart is now empty"
                  : "Your inquiry cart is empty"}
              </h2>
              <p>Add dental instruments to begin a product inquiry.</p>
              <Link to="/dental-instruments" className="catalogue-action-button">
                Browse Dental Instruments
              </Link>
            </section>
          ) : (
            <div className="cart-layout">
              <section className="cart-products" aria-labelledby="cart-products-title">
                <div className="cart-section-heading">
                  <h2 id="cart-products-title">Selected Products</h2>
                  <span>{items.length} product types</span>
                </div>

                <div className="cart-items">
                  {items.map((item) => (
                    <article className="cart-item" key={item.code}>
                      <div className="cart-item__image-wrap">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="cart-item__content">
                        <span className="product-code">{item.code}</span>
                        <h3>{item.name}</h3>
                        <div className="cart-item__actions">
                          <QuantityControl
                            quantity={item.quantity}
                            onChange={(quantity) =>
                              setItemQuantity(item.code, quantity)
                            }
                            label={`quantity for ${item.name}`}
                          />
                          <button
                            type="button"
                            className="cart-remove-button"
                            onClick={() => removeItem(item.code)}
                            aria-label={`Remove ${item.code}, ${item.name}`}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="inquiry-panel" aria-labelledby="inquiry-form-title">
                <h2 id="inquiry-form-title">Send Inquiry</h2>
                <p>
                  This form sends a product inquiry only. No payment is
                  collected.
                </p>

                {errors.cart && <p className="form-error">{errors.cart}</p>}

                <form className="inquiry-form" onSubmit={submitInquiry} noValidate>
                  <div className="inquiry-field">
                    <label htmlFor="inquiry-name">Name</label>
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
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div className="inquiry-field">
                    <label htmlFor="inquiry-email">Email</label>
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
                        {errors.email}
                      </span>
                    )}
                  </div>

                  <div className="inquiry-field">
                    <label htmlFor="inquiry-message">
                      Additional Requirements
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
                    {isSending ? "Sending Inquiry…" : "Send Inquiry"}
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

