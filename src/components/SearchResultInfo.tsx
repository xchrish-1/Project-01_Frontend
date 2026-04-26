import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

const SearchResultInfo = ({ total, city }: Props) => {
  return (
    <div className="flex flex-col justify-between gap-3 text-xl font-bold text-slate-900 lg:flex-row lg:items-center">
      <span>
        {total} Restaurants found in {city}
        <Link
          to="/"
          className="ml-2 cursor-pointer text-sm font-semibold text-orange-600 transition-colors duration-200 hover:text-orange-700"
        >
          Change Location
        </Link>
      </span>
    </div>
  );
};

export default SearchResultInfo;
