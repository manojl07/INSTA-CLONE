import { Link } from "react-router-dom";
import { ChevronDown, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import { useEffect, useRef, useState } from "react";
import {ROUTES} from '../constants/routes'

import SearchBar from "../components/search/SearchBar";

const Navbar = ({ onOpenModal }) => {
  const { user } = useAuth();
  const { logout, isLoggingOut } = useLogout();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("mousedown", close);

    return () =>
      window.removeEventListener("mousedown", close);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">

        {/* LEFT */}

        <Link
          to={ROUTES.HOME}
          className="text-2xl font-extrabold tracking-tight text-white"
        >
          Orbit
        </Link>

        {/* CENTER */}

        <div className="flex-1 flex justify-center px-12">
          <div className="w-full max-w-md">
            <SearchBar />
          </div>
        </div>

        {/* RIGHT */}

        <div
          ref={dropdownRef}
          className="flex items-center gap-4 relative"
        >

          {/* CREATE BUTTON */}

          <motion.button
            onClick={onOpenModal}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            transition={{
              duration: 0.15,
            }}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500" >
            <Plus size={18} />
            New Post
          </motion.button>

          {/* PROFILE */}

          <motion.button
            whileTap={{
              scale: 0.95,
            }}
            onClick={() =>
              setOpen((prev) => !prev)
            }
            className="flex items-center gap-2 rounded-full transition" >
            <img
              src={user?.profileImg}
              alt={user?.username}
              className="h-11 w-11 rounded-full border-2 border-zinc-700 object-cover transition hover:border-blue-500" />

            <ChevronDown
              size={16}
              className={`text-zinc-400 transition duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </motion.button>

          <AnimatePresence>

            {open && (

              <motion.div
                initial={{
                  opacity: 0,
                  y: -8,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.18,
                }}
                className="absolute right-0 top-16 w-56 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">

                {/* USER */}

                <div className="border-b border-zinc-800 p-4">

                  <p className="font-semibold text-white">
                    {user?.username}
                  </p>

                  <p className="mt-1 text-xs text-zinc-400">
                    @{user?.username}
                  </p>

                </div>

                <Link
                  to={ROUTES.PROFILE}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-white transition hover:bg-zinc-800" >
                  Profile
                </Link>

                <button
                  disabled={isLoggingOut}
                  onClick={() => logout()}
                  className="w-full px-4 py-3 text-lef text-red-500 transition hover:bg-zinc-800" >
                  {isLoggingOut
                    ? "Logging out..."
                    : "Logout"}
                </button>

              </motion.div>

            )}

          </AnimatePresence>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;