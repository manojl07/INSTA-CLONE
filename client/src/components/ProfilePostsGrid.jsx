import React from 'react'

const ProfilePostsGrid = ({ posts }) => {

  if (!posts.length) {
    return (
      <div className='text-center text-zinc-500 py-20'>No Posts Yet</div>
    )
  }
  return (
    <div className='max-w-2xl mx-auto grid grid-cols-3 gap-1 '>

      {posts.map((post) => (
        <div key={post.id || post._id} className="group relative aspect-square overflow-hidden cursor-pointer">
          <img src={post.imageUrl} alt="" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />

          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center" >

            <span className="text-white font-semibold">
              ❤️ {post.likesCount}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProfilePostsGrid;