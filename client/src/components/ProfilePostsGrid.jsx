import React from 'react'

const ProfilePostsGrid = ({ posts }) => {

  if(!posts.length){
    return (
      <div className='text-center text-zinc-500 py-20'>No Posts Yet</div>
    )
  }
  return (
    <div className='grid grid-cols-3 gap-1'>

      {posts.map((post) => (
        <div key={post.id || post._id} className='aspect-square overflow-hidden' >

          <img src={post.imageUrl} alt="" className='w-full h-full object-cover hover:scale-105 transition duration-300' />
        </div>
      ))}
    </div>
  )
}

export default ProfilePostsGrid;