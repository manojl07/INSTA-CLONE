import useToggleFollow from "../../hooks/useToggleFollow";

const FollowTextButton = ({ user }) => {
  const {
    isFollowing,
    toggleFollow,
    isPending,
  } = useToggleFollow(user);

  return (
    <button
      onClick={toggleFollow}
      disabled={isPending}
      className={`
        text-sm
        font-semibold
        transition
        disabled:opacity-60

        ${isFollowing
          ? "text-zinc-400 hover:text-red-500"
          : "text-blue-500 hover:text-blue-400"
        }
      `}
    >
      {isPending
        ? "..."
        : isFollowing
          ? "Following"
          : "Follow"}
    </button>
  );
};

export default FollowTextButton;