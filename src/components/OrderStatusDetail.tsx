import { Order } from "@/types";
import { Separator } from "./ui/separator";

type Props = {
  order: Order;
};

const OrderStatusDetail = ({ order }: Props) => {
  return (
    <div className="space-y-5 text-slate-700">
      <div className="flex flex-col">
        <span className="font-bold text-slate-950">Delivering to:</span>
        <span>{order.deliveryDetails.name}</span>
        <span>
          {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-slate-950">Your Order</span>
        <ul className="space-y-1">
          {order.cartItems.map((item) => (
            <li key={item.menuItemId}>
              {item.name} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div className="flex flex-col">
        <span className="font-bold text-slate-950">Total</span>
        <span className="text-xl font-bold text-orange-600">
          Rs. {(order.totalAmount / 100).toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default OrderStatusDetail;
