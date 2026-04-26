import { Restaurant } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dot } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

const RestaurantInfo = ({ restaurant }: Props) => {
  return (
    <Card className="app-panel border-orange-100">
      <CardHeader>
        <CardTitle className="text-3xl font-bold tracking-tight text-slate-950">
          {restaurant.restaurantName}
        </CardTitle>
        <CardDescription className="text-slate-600">
          {restaurant.city}, {restaurant.country}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap text-slate-700">
        {restaurant.cuisines.map((item, index) => (
          <span className="flex" key={`${restaurant._id}-${item}`}>
            <span>{item}</span>
            {index < restaurant.cuisines.length - 1 && <Dot />}
          </span>
        ))}
      </CardContent>
    </Card>
  );
};

export default RestaurantInfo;
