import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useMutation, useQueryClient} from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { logoutUser } from '../api/auth.api'
import {useAuth} from './useAuth'

const useLogout = () => {

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {setUser} = useAuth();

  const mutation = useMutation({
    mutationFn: logoutUser,
    
    onSuccess: async () => {
      queryClient.clear();

      setUser(null);

      toast.success("Logged out successfully")

      navigate('/login', {replace: true})
    },

    onError: () => {
      toast.error("Logout failed")
    }
  })

  return {
    logout: mutation.mutate,
    isLoggingOut: mutation.isPending,
  }

}

export default useLogout;