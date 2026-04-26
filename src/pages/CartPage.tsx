import emptyCartImage from "@/assets/empty_cart.png";
import { Button } from "@/components/ui/button";
import { getStoredCarts } from "@/lib/cart";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const carts = getStoredCarts();
  const cartItems = carts.flatMap((cart) =>
    cart.items.map((item) => ({
      ...item,
      restaurantId: cart.restaurantId,
    }))
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="app-panel mx-auto flex max-w-2xl flex-col items-center gap-5 p-8 text-center md:p-12">
        <img
          src={emptyCartImage}
          alt="Empty cart"
          className="max-h-72 w-full object-contain"
        />
        <h1 className="text-3xl font-bold text-slate-950">Your cart is empty</h1>
        <p className="text-lg font-semibold text-slate-600">
          Kindly add items to proceed
        </p>
        <Button className="app-primary-button" onClick={() => navigate("/")}>
          Go to home page
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-6">
      <div className="app-panel p-6 md:p-8">
        <h1 className="text-3xl font-bold text-slate-950">Your Cart</h1>
        <p className="text-slate-500">
          Review your selected items and continue from the restaurant page.
        </p>
      </div>

      {carts.map((cart) => (
        <div className="app-panel overflow-hidden" key={cart.restaurantId}>
          <div className="border-b border-orange-100 bg-orange-50/80 px-6 py-4">
            <Link
              to={`/detail/${cart.restaurantId}`}
              className="font-bold text-orange-600 transition-colors duration-200 hover:text-orange-700"
            >
              Continue checkout
            </Link>
          </div>
          <div className="divide-y divide-orange-100">
            {cart.items.map((item) => (
              <div
                className="flex flex-col gap-2 px-6 py-4 md:flex-row md:items-center md:justify-between"
                key={item._id}
              >
                <div>
                  <p className="font-bold text-slate-950">{item.name}</p>
                  <p className="text-sm text-slate-500">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <p className="font-bold text-orange-600">
                  Rs. {((item.price * item.quantity) / 100).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="app-panel flex items-center justify-between p-6">
        <span className="text-xl font-bold text-slate-950">Cart total</span>
        <span className="text-2xl font-bold text-orange-600">
          Rs. {(cartTotal / 100).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CartPage;
