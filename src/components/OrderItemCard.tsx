import { Order, OrderStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ORDER_STATUS } from "@/config/order-status-config";
import { useUpdateMyRestaurantOrder } from "@/api/MyRestaurantApi";
import { useEffect, useState } from "react";

type Props = {
  order: Order;
};

const OrderItemCard = ({ order }: Props) => {
  const { updateRestaurantStatus, isLoading } = useUpdateMyRestaurantOrder();
  const [status, setStatus] = useState<OrderStatus>(order.status);

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  const handleStatusChange = async (newStatus: OrderStatus) => {
    await updateRestaurantStatus({
      orderId: order._id as string,
      status: newStatus,
    });
    setStatus(newStatus);
  };

  const getTime = () => {
    const orderDateTime = new Date(order.createdAt);

    const hours = orderDateTime.getHours();
    const minutes = orderDateTime.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  return (
    <Card className="app-panel border-orange-100">
      <CardHeader>
        <CardTitle className="grid gap-4 text-base font-semibold text-slate-900 md:grid-cols-4">
          <div>
            <span className="text-xs uppercase text-slate-500">Customer</span>
            <span className="block font-bold">
              {order.deliveryDetails.name}
            </span>
          </div>
          <div>
            <span className="text-xs uppercase text-slate-500">Address</span>
            <span className="block font-normal">
              {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
            </span>
          </div>
          <div>
            <span className="text-xs uppercase text-slate-500">Time</span>
            <span className="block font-normal">{getTime()}</span>
          </div>
          <div>
            <span className="text-xs uppercase text-slate-500">Total</span>
            <span className="block font-bold text-orange-600">
              Rs. {(order.totalAmount / 100).toFixed(2)}
            </span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          {order.cartItems.map((cartItem) => (
            <span className="text-slate-700" key={cartItem.menuItemId}>
              <Badge
                variant="outline"
                className="mr-2 border-orange-200 bg-orange-50 text-orange-700"
              >
                {cartItem.quantity}
              </Badge>
              {cartItem.name}
            </span>
          ))}
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="status" className="font-semibold text-slate-700">
            What is the status of this order?
          </Label>
          <Select
            value={status}
            disabled={isLoading}
            onValueChange={(value) => handleStatusChange(value as OrderStatus)}
          >
            <SelectTrigger id="status" className="app-input">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent position="popper" className="border-orange-100">
              {ORDER_STATUS.map((status) => (
                <SelectItem value={status.value} key={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderItemCard;
