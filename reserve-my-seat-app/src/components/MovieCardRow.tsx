import { MovieCard } from "./MovieCard";

export interface PosterCard {
  title: string;
  rating: string;
  language: string;
  image: string;
  date: string;
  location: string;
  priceOnwards: number;
}

interface CardRowProps {
  title: string;
  items: Partial<PosterCard>[];
  type: "movie" | "event";
}

export const MovieCardRow = ({
  title,
  items,
  type = "movie",
}: CardRowProps) => {
  return (
    <section className="py-8 px-4 bg-[#0f1114]">
      <div className="flex justify-between items-center mb-2 max-w-7xl mx-auto">
        <p className="text-2xl text-gray-200 font-bold">{title}</p>
        <button className="text-red-500 text-sm font-medium hover:underline cursor-pointer">
          See All &gt;
        </button>
      </div>

      {/* Horizontal Scroll Wrapper */}
      <div className="flex gap-1 overflow-x-auto no-scrollbar pb-8 max-w-7xl mx-auto">
        {items.map((item, idx) => (
          <MovieCard key={idx} data={item} type={type} />
        ))}
      </div>
    </section>
  );
};
