import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";
import { getCartCountLabel } from "@/lib/cart";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  const cartCountLabel = getCartCountLabel();

  return (
    <span className="flex items-center gap-6">
      {isAuthenticated ? (
        <>
          <Link
            to="/order-status"
            className="font-bold text-slate-700 transition-colors duration-200 hover:text-orange-600"
          >
            Order Status
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-2 font-bold text-slate-700 transition-colors duration-200 hover:text-orange-600"
          >
            <span className="flex h-7 min-w-7 items-center justify-center rounded-md border-2 border-slate-800 bg-white px-1 text-sm font-bold leading-none text-slate-900">
              {cartCountLabel}
            </span>
            Cart
          </Link>
          <UsernameMenu />
        </>
      ) : (
        <Button
          variant="ghost"
          className="font-bold text-slate-700 transition-colors duration-200 hover:bg-orange-50 hover:text-orange-600"
          onClick={async () => await loginWithRedirect()}
        >
          Log In
        </Button>
      )}
    </span>
  );
};

export default MainNav;
