import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import MovieDetails from "./pages/MovieDetails";
import Payment from "./pages/Payment";
import SeatSelection from "./pages/SeatSelection";
import TheatreSelection from "./pages/TheatreSelection";
import Layout from "./features/Layout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/theatre/:movieId" element={<TheatreSelection />} />
          <Route path="/seats/:showId" element={<SeatSelection />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
