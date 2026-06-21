import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const Navbar = ({ onOpenModal }) => {
  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-zinc-800">
      <div className="max-w-6xl mx-auto h-16 px-6 grid grid-cols-3 items-center">

        {/* Left */}
        <div className="flex justify-start">
          <Link
            to="/"
            className="text-white text-xl font-bold"
          >
            Instagram Clone
          </Link>
        </div>

        {/* Center */}
        <div className="flex justify-center">
          <button
            onClick={onOpenModal}
            className="
              text-white
              hover:text-blue-500
              transition
            "
          >
            <Plus size={28} />
          </button>
        </div>

        {/* Right */}
        <div className="flex justify-end">
          <Link
            to="/profile"
            className="text-white hover:text-blue-500 transition"
          >
            Profile
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;