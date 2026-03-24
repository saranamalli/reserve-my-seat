import { Link } from "react-router-dom";
import ReserveSeatCTA from "../components/Icon";

export default function Navbar() {
  return (
    <div className="mt-2.5 z-50">
      <nav className="navbar flex items-center justify-between p-2 rounded-full border border-(--border) bg-(--bg) shadow-(--shadow) backdrop-blur-sm">
        <div className="ml-2.5">
          <ReserveSeatCTA />
        </div>

        <div className="ml-2 mr-auto flex items-center gap-2 text-sm">
          <Link to="/movies" className="nav-link">
            Movies
          </Link>
          <Link to="/live-events" className="nav-link">
            Concerts
          </Link>
        </div>

        <div className="mr-2 flex items-center gap-2 text-sm">
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/register" className="nav-link">
            Register
          </Link>
        </div>

        <div className="mr-0 flex items-center border rounded-full border-(--border)">
          <img
            src="/default-profile.jpeg"
            alt="Profile"
            className="w-12.5 h-12.5 bg-gray-400 rounded-full object-cover border overflow-hidden"
          />
          <p className="p-1.25 text-xs font-medium">Mallikarjuna Sarana</p>
        </div>
      </nav>
    </div>
  );
}
