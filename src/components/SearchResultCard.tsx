import { Restaurant } from "@/types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

const SearchResultCard = ({ restaurant }: Props) => {
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="app-panel app-panel-hover group grid gap-5 overflow-hidden p-4 lg:grid-cols-[2fr_3fr]"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          className="h-full w-full rounded-lg object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </AspectRatio>
      <div className="flex flex-col justify-center">
        <h3 className="mb-2 text-2xl font-bold tracking-tight text-slate-950 transition-colors duration-200 group-hover:text-orange-600">
          {restaurant.restaurantName}
        </h3>
        <div id="card-content" className="grid gap-3 md:grid-cols-2">
          <div className="flex flex-row flex-wrap text-slate-600">
            {restaurant.cuisines.map((item, index) => (
              <span className="flex" key={`${restaurant._id}-${item}`}>
                <span>{item}</span>
                {index < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 font-semibold text-orange-600">
              <Clock className="text-orange-500" />
              {restaurant.estimatedDeliveryTime} mins
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Banknote className="text-orange-500" />
              Delivery from Rs. {(restaurant.deliveryPrice / 100).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
