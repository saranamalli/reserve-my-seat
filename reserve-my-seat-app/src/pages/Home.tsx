import MovieBanner from "../components/MovieBanner";
import { MovieCardRow, type PosterCard } from "../components/MovieCardRow";
import getUserLocationCoords from "../utils/get-location-coords";
import { getPlace } from "../utils/getPlace";

const Home = () => {
  getUserLocationCoords();
  getPlace();

  const banners = [
    "/varanasi-banner.jpg",
    "/bg_dhurandhar.jpg",
    "/RRR_Banner.jpg",
    "/salaar-banner.jpg",
    "/sapta-sagara-banner.jpg",
  ];

  const movies: Partial<PosterCard>[] = [
    {
      title: "Dhurandhar 2",
      rating: "A",
      language: "Hindi",
      image: "/dhurandhar.jpg",
      priceOnwards: 300,
    },
    {
      title: "RRR",
      rating: "UA7+",
      language: "Telugu",
      image: "/RRR_Poster.jpg",
      priceOnwards: 250,
    },
    {
      title: "Pushpa: The Rule",
      rating: "A",
      language: "Telugu",
      image: "/pushpa2-poster.jpg",
      priceOnwards: 250,
    },
    {
      title: "Eega",
      rating: "UA7+",
      language: "Telugu",
      image: "/eega-poster.jpg",
      priceOnwards: 200,
    },
    {
      title: "Robo",
      rating: "UA7+",
      language: "Tamil",
      image: "/robo-poster.webp",
      priceOnwards: 200,
    },
    {
      title: "Sapta Sagaralu Dhaati",
      rating: "UA7+",
      language: "Kannada",
      image: "/sapta-sagara-poster.webp",
      priceOnwards: 150,
    },
  ];
  return (
    <>
      <MovieBanner images={banners} />
      <MovieCardRow
        title="Trending Movies Near You!!"
        items={movies}
        type="movie"
      />
    </>
  );
};

export default Home;
