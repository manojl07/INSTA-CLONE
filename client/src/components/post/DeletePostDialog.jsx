import React from 'react'

const DeletePostDialog = ({isOpen, onClose, onDelete, isDeleting}) => {

  if(!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center p-6' onClick={onclose}>

      <div onClick={(e) => e.stopPropagation()} className='w-full max-w-sm rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden'>
        
        <div className='p-8 text-center'>

          <h2 className='text-white text-xl font-semibold'>Delete Post?</h2>

          <p className='text-zinc-400 mt-3'>This action cannot be undone</p>
        </div>

        <div className='border-t border-zinc-800'>

          <button onClick={onDelete} disabled={isDeleting} className='w-full py-4 text-red-500 font-semibold hover:bg-zinc-800 transition disabled:opacity-50'>{isDeleting ? "Deleting..." : "Delete"}</button>

          <button onClick={onClose} disabled={isDeleting} className='w-full py-4 border-t border-zinc-800 text-white hover:bg-zinc-800 transition'>Cancel</button>
        </div>
      </div>

    </div>
  )
}

export default DeletePostDialog