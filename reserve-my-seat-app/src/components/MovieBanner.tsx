import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MovieBannerProps {
  images: string[];
}

const MovieBanner = ({ images }: MovieBannerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Reset animation lock after transition duration
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 700);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Auto-play logic
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-auto h-80 rounded-2xl overflow-hidden">
      {images.map((img, index) => (
        <div
          key={index}
          className={`flex justify-center absolute inset-0 w-auto h-80 transition-all duration-700 ease-in-out
            ${index === currentIndex ? "z-10 opacity-100" : "z-0 opacity-0"}`}
          style={
            {
              // Logic: The incoming image (currentIndex) stays on top.
              // The others are pushed right. In-place feel is achieved by
              // the z-index swap and opacity fade combined with a quick move.
            }
          }
        >
          <img
            src={img}
            alt={`Movie Banner ${index}`}
            className="w-auto h-80 rounded-2xl object-cover object-top"
          />
          {/* Gradient Overlay for better text/dot visibility */}
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 text-white hover:bg-black/60 transition-colors"
      >
        <ChevronLeft size={32} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 text-white hover:bg-black/60 transition-colors"
      >
        <ChevronRight size={32} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 transition-all duration-300 rounded-full 
              ${currentIndex === index ? "w-8 bg-white" : "w-2 bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieBanner;
