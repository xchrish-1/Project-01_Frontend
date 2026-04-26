import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
  const getTotalCost = () => {
    const totalInPaise = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const totalWithDelivery = totalInPaise + restaurant.deliveryPrice;

    return (totalWithDelivery / 100).toFixed(2);
  };

  return (
    <>
      <CardHeader className="bg-orange-50/80">
        <CardTitle className="flex justify-between gap-4 text-2xl font-bold tracking-tight text-slate-950">
          <span>Your Order</span>
          <span className="text-orange-600">Rs. {getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5 p-6">
        {cartItems.map((item) => (
          <div className="flex justify-between gap-4" key={item._id}>
            <span className="text-slate-700">
              <Badge
                variant="outline"
                className="mr-2 border-orange-200 bg-orange-50 text-orange-700"
              >
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="flex items-center gap-2 font-semibold text-slate-900">
              <Trash
                className="cursor-pointer text-red-500 transition-colors duration-200 hover:text-red-600"
                size={20}
                onClick={() => removeFromCart(item)}
              />
              Rs. {((item.price * item.quantity) / 100).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between font-semibold text-slate-700">
          <span>Delivery</span>
          <span>Rs. {(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;
