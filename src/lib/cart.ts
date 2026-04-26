export type StoredCartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

export type StoredCart = {
  restaurantId: string;
  items: StoredCartItem[];
};

export const getStoredCarts = (): StoredCart[] => {
  if (typeof window === "undefined") {
    return [];
  }

  return Object.keys(sessionStorage)
    .filter((key) => key.startsWith("cartItems-"))
    .map((key) => {
      const restaurantId = key.replace("cartItems-", "");
      const storedValue = sessionStorage.getItem(key);

      try {
        const items = storedValue ? JSON.parse(storedValue) : [];
        return { restaurantId, items };
      } catch {
        return { restaurantId, items: [] };
      }
    })
    .filter((cart) => cart.items.length > 0);
};

export const getCartItemCount = () =>
  getStoredCarts().reduce(
    (count, cart) =>
      count +
      cart.items.reduce((itemCount, item) => itemCount + item.quantity, 0),
    0
  );

export const getCartCountLabel = () => {
  const count = getCartItemCount();
  return count > 10 ? ".." : count.toString();
};
