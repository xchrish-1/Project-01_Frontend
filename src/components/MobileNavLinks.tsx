import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import { getCartCountLabel } from "@/lib/cart";

const MobileNavLinks = () => {
  const { logout } = useAuth0();
  const cartCountLabel = getCartCountLabel();

  return (
    <>
      <Link
        to="/order-status"
        className="flex items-center rounded-md bg-white px-3 py-2 font-bold transition-colors duration-200 hover:bg-orange-50 hover:text-orange-600"
      >
        Order Status
      </Link>
      <Link
        to="/cart"
        className="flex items-center gap-2 rounded-md bg-white px-3 py-2 font-bold transition-colors duration-200 hover:bg-orange-50 hover:text-orange-600"
      >
        <span className="flex h-7 min-w-7 items-center justify-center rounded-md border-2 border-slate-800 bg-white px-1 text-sm font-bold leading-none text-slate-900">
          {cartCountLabel}
        </span>
        Cart
      </Link>
      <Link
        to="/manage-restaurant"
        className="flex items-center rounded-md bg-white px-3 py-2 font-bold transition-colors duration-200 hover:bg-orange-50 hover:text-orange-600"
      >
        My Restaurant
      </Link>
      <Link
        to="/user-profile"
        className="flex items-center rounded-md bg-white px-3 py-2 font-bold transition-colors duration-200 hover:bg-orange-50 hover:text-orange-600"
      >
        User Profile
      </Link>
      <Button
        onClick={() => logout()}
        className="app-primary-button flex items-center px-3 font-bold"
      >
        Log Out
      </Button>
    </>
  );
};

export default MobileNavLinks;
