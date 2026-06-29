import { Link } from "react-router-dom";

import FollowTextButton from "./FollowTextButton";

const UserRow = ({ user }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 hover:bg-zinc-900 transition">

      <Link
        to={`/profile/${user.id}`}
        className="flex items-center gap-3 flex-1"
      >
        <img
          src={user.profileImg}
          alt={user.username}
          className="w-11 h-11 rounded-full object-cover"
        />

        <div>
          <p className="font-semibold text-white">
            {user.username}
          </p>

          {user.bio && (
            <p className="text-sm text-zinc-500 line-clamp-1">
              {user.bio}
            </p>
          )}
        </div>
      </Link>

      <FollowTextButton user={user} />
    </div>
  );
};

export default UserRow;