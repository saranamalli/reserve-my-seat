import { Link } from "react-router-dom";
import ReserveSeatCTA from "../components/Icon";

export default function Navbar() {
  return (
    <div className="mt-[10px] z-50">
      <nav className="navbar flex p-[10px] items-center gap-6 rounded-full border border-white/20 bg-slate-950/75 shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-sm">
        <div className="ml-[10px]">
          <ReserveSeatCTA />
        </div>

        <div className="ml-[5%] mr-auto flex items-center gap-4 text-sm">
          <Link to="/" className="nav-link">
            Work
          </Link>
          <Link to="/about" className="nav-link ml-[1em]">
            About
          </Link>
          <Link to="/play" className="nav-link ml-[1em]">
            Playground
          </Link>
          <Link to="/resources" className="nav-link ml-[1em]  ">
            Resource
          </Link>
        </div>

        <div className="mr-[0] rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white flex items-center">
          <img
            src="/default-profile.jpeg"
            alt="Profile"
            className="h-[50px] rounded-full object-cover border border-white/30"
          />
          <span className="p-[5px]">ihyaet@gmail.com</span>
        </div>
      </nav>
    </div>
  );
}
