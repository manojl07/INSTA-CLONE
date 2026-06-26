// import CommentInput from "./CommentInput";
// import CommentList from "./CommentList";

// const CommentModal = ({ isOpen, onClose, post, }) => {


//   if (!isOpen) {
//     return null;
//   }

//   return (
//     <div
//       className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50">

//       <div className="bg-zinc-900 w-full max-w-lg rounded-2xl border border-zinc-800 shadow-2xl">

//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b border-zinc-800" >
//           <h2 className="text-white  text-xl font-bold">Comments</h2>

//           <button onClick={onClose} className="text-zinc-400 hover:text-white text-xl transition" > ✕ </button>
//         </div>

//         {/* Comments */}
//         <CommentList
//           postId={post.id}
//           queryKey={["comments", post.id]}
//         />

//         {/* Comment Input */}
//         <CommentInput
//           postId={post.id}
//           queryKey={["comments", post.id]}
//         />
//       </div>
//     </div>
//   );
// };

// export default CommentModal;