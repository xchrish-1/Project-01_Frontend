import { MenuItem } from "../types";
import { AspectRatio } from "./ui/aspect-ratio";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menuItem: MenuItem;
  addToCart: () => void;
};

const MenuItem = ({ menuItem, addToCart }: Props) => {
  return (
    <Card
      className="app-panel app-panel-hover cursor-pointer border-orange-100"
      onClick={addToCart}
    >
      {menuItem.imageUrl && (
        <AspectRatio ratio={16 / 9}>
          <img
            src={menuItem.imageUrl}
            alt={menuItem.name}
            className="h-full w-full rounded-t-lg object-cover"
          />
        </AspectRatio>
      )}
      <CardHeader>
        <CardTitle className="text-xl text-slate-950">{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold text-orange-600">
        Rs. {(menuItem.price / 100).toFixed(2)}
      </CardContent>
    </Card>
  );
};

export default MenuItem;
