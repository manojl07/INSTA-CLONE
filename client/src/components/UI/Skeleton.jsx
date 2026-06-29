const Skeleton = ({ className = "" }) => {
  return (
    <div
      className={`
        animate-pulse
        rounded-md
        bg-zinc-800/80
        ${className}
      `}
    />
  );
};

export default Skeleton;