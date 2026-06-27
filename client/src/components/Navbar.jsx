import { Link } from "react-router-dom";
import { ChevronDown, Plus } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { useEffect, useRef, useState } from "react";

const Navbar = ({ onOpenModal }) => {

  const { user } = useAuth();

  const { logout, isLoggingOut } = useLogout();

  const [open, setOpen] = useState(false)

  const dropdownRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    window.addEventListener("click", close);

    return () => {
      window.removeEventListener("click", close)
    }
  }, [])



  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-zinc-800">
      <div className="max-w-6xl mx-auto h-16 px-6 grid grid-cols-3 items-center">
        {/* Left */}

        <div>
          <Link
            to="/"
            className="text-xl font-bold text-white"
          >
            Instagram Clone
          </Link>
        </div>

        {/* Center */}

        <div className="flex justify-center">
          <button
            onClick={onOpenModal}
            className="text-white hover:text-blue-500 transition"
          >
            <Plus size={28} />
          </button>
        </div>

        {/* Right */}

        <div
          className="flex justify-end relative"
          ref={dropdownRef}
        >
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2"
          >
            <img
              src={user?.profileImg}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />

            <ChevronDown
              size={18}
              className="text-zinc-400"
            />
          </button>

          {open && (
            <div
              className="
              absolute
              right-0
              top-14
              w-48
              rounded-xl
              border
              border-zinc-800
              bg-zinc-900
              shadow-xl
              overflow-hidden
            "
            >
              <Link
                to="/profile"
                onClick={() => setOpen(false)}
                className="
                block
                px-4
                py-3
                text-white
                hover:bg-zinc-800
              "
              >
                Profile
              </Link>

              <button
                onClick={() => logout()}
                disabled={isLoggingOut}
                className="
                w-full
                text-left
                px-4
                py-3
                text-red-500
                hover:bg-zinc-800
              "
              >
                {isLoggingOut
                  ? "Logging out..."
                  : "Logout"}
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;