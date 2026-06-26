import {useAuth} from '../../hooks/useAuth'
import {MoreHorizontal, X} from 'lucide-react'


const PostHeader = ({post, onClose}) => {

  const {user} = useAuth();

  return (
    <div className='flex items-center justify-between p-4 border-b border-zinc-800'>

      <div className='flex items-center gap-3'>

        <img src={post.user.profileImg} alt={post.user.username}
        className='w-10 h-10 rounded-full object-cover' />

        <p className='font-semibold text-white'>{post.user.username}</p>
      </div>

      <div className='flex items-center gap-2'>

        {user?.id === post.user.id && (
          <button className='hover:text-white text-zinc-400'>
            <MoreHorizontal size={20} />
          </button>
        )}

        <button onClick={onClose} className='hover:text-white text-zinc-400'>
          <X size={20} />
        </button>
      </div>

    </div>
  )
}

export default PostHeader;