import type { PosterCard } from "./MovieCardRow";

interface MovieCardProps {
  data: Partial<PosterCard>;
  type: "movie" | "event";
}

export const MovieCard = ({ data, type }: MovieCardProps) => {
  return (
    <div className="group relative flex-none w-36 mt-5 cursor-pointer transition-transform duration-300 ease-out hover:scale-115 hover:z-10  ml-5">
      {/* Image Container with Dynamic Aspect Ratio */}
      <div
        className={`overflow-hidden rounded-xl border border-gray-800 ${
          type === "event" ? "aspect-square" : "aspect-2/3"
        }`}
      >
        <img
          src={data.image}
          alt={data.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Text Metadata */}
      <div className="mt-3 space-y-1">
        <p className="font-bold text-lg leading-tight truncate text-gray-100">
          {data.title}
        </p>
        {type === "movie" ? (
          <p className="text-sm text-gray-400">
            {data.rating} | {data.language}
          </p>
        ) : (
          <div className="text-sm">
            <p className="text-orange-500 font-medium">{data.date}</p>
            <p className="text-gray-400 truncate">{data.location}</p>
            <p className="text-gray-100 font-semibold mt-1">
              ₹{data.priceOnwards} onwards
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
