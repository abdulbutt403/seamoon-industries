import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  normalizePositiveInteger,
  normalizeProductImage,
} from "../utils/catalogue";

export const CART_STORAGE_KEY = "seamoon_cart";

const CartContext = createContext(null);

const normalizeCartItem = (item) => {
  if (!item || typeof item !== "object") return null;

  const code = typeof item.code === "string" ? item.code.trim() : "";
  const name = typeof item.name === "string" ? item.name.trim() : "";
  const image = normalizeProductImage(item.image);

  if (!code || !name || !image) return null;

  return {
    code,
    name,
    image,
    quantity: normalizePositiveInteger(item.quantity),
  };
};

export const sanitizeCart = (value) => {
  if (!Array.isArray(value)) return [];

  return value.reduce((items, item) => {
    const normalizedItem = normalizeCartItem(item);
    if (!normalizedItem) return items;

    const existingItem = items.find(
      ({ code }) => code === normalizedItem.code
    );

    if (existingItem) {
      existingItem.quantity += normalizedItem.quantity;
    } else {
      items.push(normalizedItem);
    }

    return items;
  }, []);
};

const readStoredCart = () => {
  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? sanitizeCart(JSON.parse(storedCart)) : [];
  } catch {
    try {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // Storage can be unavailable in privacy-restricted browser contexts.
    }
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setItems(readStoredCart());
    setIsReady(true);

    const syncCart = (event) => {
      if (event.key !== CART_STORAGE_KEY) return;

      try {
        setItems(event.newValue ? sanitizeCart(JSON.parse(event.newValue)) : []);
      } catch {
        setItems([]);
      }
    };

    window.addEventListener("storage", syncCart);
    return () => window.removeEventListener("storage", syncCart);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Keep the in-memory cart usable when persistent storage is unavailable.
    }
  }, [isReady, items]);

  const addItem = useCallback((product, quantity = 1) => {
    const normalizedItem = normalizeCartItem({
      ...product,
      quantity: normalizePositiveInteger(quantity),
    });

    if (!normalizedItem) return;

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        ({ code }) => code === normalizedItem.code
      );

      if (!existingItem) return [...currentItems, normalizedItem];

      return currentItems.map((item) =>
        item.code === normalizedItem.code
          ? { ...item, quantity: item.quantity + normalizedItem.quantity }
          : item
      );
    });
  }, []);

  const setItemQuantity = useCallback((code, quantity) => {
    const normalizedQuantity = normalizePositiveInteger(quantity);
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.code === code ? { ...item, quantity: normalizedQuantity } : item
      )
    );
  }, []);

  const removeItem = useCallback((code) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.code !== code)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalQuantity = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      isReady,
      totalQuantity,
      addItem,
      setItemQuantity,
      removeItem,
      clearCart,
    }),
    [
      items,
      isReady,
      totalQuantity,
      addItem,
      setItemQuantity,
      removeItem,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
};

