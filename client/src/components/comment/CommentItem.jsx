import ButtonSpinner from "../UI/ButtonSpinner";
import useProfileNavigation from "../../hooks/useProfileNavigation";


const CommentItem = ({ comment, currentUserId, onDelete, deleting, onNavigate }) => {

  const goToProfile = useProfileNavigation();

  return (
    <div className="flex items-start gap-2 py-2">

      <img
        src={comment.user.profileImg}
        alt=""
        onClick={() => {
          onNavigate?.();       
          goToProfile(comment.user.id);
        }}
        className="w-8 h-8 rounded-full object-cover cursor-pointer shrink-0" />

      <div className="flex-1 min-w-0">

        <p onClick={() => goToProfile(comment.user.id)} className="text-white font-semibold text [13px] leading-4 cursor-pointer hover:text-zinc-300">{comment.user.username}</p>

        <p className="text-zinc-300 text-[13px] leading-5 wrap-break-words">{comment.content}</p>

      </div>

      {comment.user.id === currentUserId && (
        <button onClick={() => onDelete(comment.id)} disabled={deleting} className="text-[11px] text-red-500 hover:text-red-400 transition">
          {deleting ? (
            <>
              <ButtonSpinner size={14} /> Deleting...
            </>
          ) : (
            "Delete"
          )}
        </button>
      )}

    </div>
  )
}

export default CommentItem